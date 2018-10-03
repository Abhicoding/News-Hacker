import React, {Component}from 'react'
import ta from 'time-ago'
import {Link} from 'react-router-dom'

import {Media, MediaContent, MediaLeft, MediaRight, LevelItem, Icon, Content, Level, LevelLeft} from 'bloomer'
import './storybox.css'
import Axios from 'axios';

export default class Storybox extends Component {
  constructor (props) {
    super (props)
    this.state = {
      didupvote: this.props.didupvote,
      score: this.props.score
    }
    this.upvote = this.upvote.bind(this)
  }

  async upvote () {
    var {user, id, loggedin} = this.props
    var {didupvote} = this.state
    if (!loggedin || didupvote) return
    try {
      var upvote = await Axios.post('/api/story/upvote', {user, id})
      if (upvote.status !== 200) throw new Error('Failed to post upvote') 
      this.setState({
        didupvote: true,
        score: this.state.score + 1
      })
    } catch (e) {
      return e
    }
  }

  render () {
    var {id, by, time, title, descendants, url, loggedin, user} = this.props
    var {score, didupvote} = this.state
    var show = window.location.pathname === 'nhstories'
    try { 
      var link = new URL(url)
    } catch (e) {
      link = ''
    }
    return (<Media>
      <MediaLeft>
      </MediaLeft>
      <MediaContent>
          <Content>
              <p>
                <Link to={link ? `${link}`:`${id}`}>
                  <span className='title'>{`${title} `}</span>
                </Link>
                <a href={link.href}>
                  <span className='urlname'>{link ? `(${link.hostname})`: ""}</span>
                </a>
              </p>
          </Content>
          <Level isMobile>
              <LevelLeft>
              <LevelItem>
                { loggedin 
                  ? <a><Icon isSize="medium" 
                    className={`${didupvote || user===by ? 'fas': 'far'} fa-thumbs-up fa-2x`}
                    onClick={this.upvote}/></a>
                  : null}
                  </LevelItem>
                <LevelItem className='score'><strong>{score}</strong></LevelItem>
                <LevelItem className='by' href='#'>
                  <p>by<strong>{` ${by}`}</strong></p>
                </LevelItem>
                <LevelItem className='descendants' issize='small'>
                  <Link to={!show ? `/story/${id}`: `#`}>
                    <p>{`${descendants} comments`}</p>
                  </Link>
                </LevelItem>
                <LevelItem className='timeago' href='#'>
                  <i>{ta.ago(show ? time : (Date.now()-time) )}</i>
                </LevelItem>
              </LevelLeft>
          </Level>
      </MediaContent>
      <MediaRight></MediaRight>
  </Media>)
  }
}