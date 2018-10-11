import React, { Component } from 'react'
import ta from 'time-ago'
import { Link } from 'react-router-dom'
import axios from 'axios'

import { Media, MediaContent, MediaRight,
  LevelItem, Icon, Content, Level, LevelLeft } from 'bloomer'
import './storybox.css'

export default class Storybox extends Component {
  constructor (props) {
    super(props)
    this.state = {
      didupvote: this.props.didupvote,
      score: this.props.score,
      show: false
    }
    this.vote = this.vote.bind(this)
    this.upvote = this.upvote.bind(this)
    this.unupvote = this.unupvote.bind(this)
  }

  componentWillMount () {
    var arr = ['/topstories', '/beststories', '/newstories']
    this.setState({ show: arr.includes(window.location.pathname) })
  }

  vote () {
    console.log('VOTE RAN')
    var { didupvote } = this.state
    if (didupvote) return this.unupvote()
    return this.upvote()
  }

  async upvote () {
    var { id, loggedin } = this.props
    var { didupvote } = this.state
    if (!loggedin || didupvote) return
    try {
      var upvote = await axios.post('/api/story/upvote', { id })
      if (upvote.status !== 200) throw new Error('Failed to post upvote')
      this.setState({
        ...upvote.data
      })
    } catch (e) {
      return e
    }
  }

  async unupvote () {
    console.log('UNUPVOTE RAN')
    var { id, loggedin } = this.props
    var { didupvote } = this.state
    console.log(loggedin, didupvote)
    if (!loggedin || !didupvote) return
    console.log('RETURNING???')
    try {
      var unupvote = await axios.post('/api/story/unupvote', { id })
      console.log(unupvote.data, 'UNUPVOTEDATA')
      if (unupvote.status !== 200) throw new Error(`Failed to unupvote`)
      this.setState({
        ...unupvote.data
      })
    } catch (e) {
      return e
    }
  }

  render () {
    var { id, by, time, title, descendants, url, loggedin, user } = this.props
    var { score, didupvote, show } = this.state
    try {
      var link = new URL(url)
    } catch (e) {
      link = ''
    }
    return (<Media>
      <MediaContent>
        <Content className='story'>
          <p>
            {show
              ? (<Link to={`/story/${id}`}>
                <span className='title'>{`${title} `}</span>
              </Link>)
              : (<a href={link.href} target='_blank'>
                <span className='title'>{`${title} `}</span>
              </a>)}
            <a href={link.href}>
              <span className='urlname'>{
                link ? `(${link.hostname})` : ''}
              </span>
            </a>
          </p>
        </Content>
        <Level isMobile className='story-attributes'>
          <LevelLeft>
            <LevelItem className='upvote-icon' isHidden={!loggedin}>
              <a><Icon isSize='medium'
                className={`${(didupvote || user === by)
                  ? 'fas'
                  : 'far'} fa-thumbs-up fa-2x`}
                onClick={user === by ? null : this.vote} /></a>
            </LevelItem>
            <LevelItem className='score'>
              <strong>{score}</strong>
            </LevelItem>
            <LevelItem className='by' href='#'>
              <p>by<strong>{` ${by}`}</strong></p>
            </LevelItem>
            <LevelItem className='descendants' issize='small'>
              <Link to={!show ? `/story/${id}` : `#`}>
                <p>{`${descendants} comments`}</p>
              </Link>
            </LevelItem>
            <LevelItem className='timeago' href='#'>
              <i>{ta.ago(Date.now() - time)}</i>
            </LevelItem>
          </LevelLeft>
        </Level>
      </MediaContent>
      <MediaRight />
    </Media>)
  }
}
