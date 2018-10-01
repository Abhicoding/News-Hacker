import React, {Component} from 'react'
import ta from 'time-ago'

import {Media, MediaContent, MediaLeft, LevelItem, Content, Level, LevelLeft} from 'bloomer'
import './comment.css'

export default class Comment extends Component {
  constructor () {
    super ()
    this.state = {
      kids : []
    }
  }
  componentWillMount () {
    if (this.props.kids) {
      this.resolvekids()
    }
  }

  async resolvekids () {
    var kids = await this.props.getChildren(this.props.kids)
    this.setState({
      kids: [...kids]
    })
  }

  render () {
    var {by, time, text, kids} = this.props
    var item
    if (kids) {
      item = this.state.kids.filter(y => y.by !== undefined && y.text)
      .map(x => <Comment key={x.id} getChildren = {this.props.getChildren} {...x} />)
    }
    return (<Media>
      <MediaLeft>
      </MediaLeft>
      <MediaContent>
          <Level isMobile>
              <LevelLeft>
                <LevelItem className='by' href='#'>
                  <p>by<strong>{` ${by}`}</strong></p>
                </LevelItem>
                <LevelItem className='timeago' href='#'>
                  <i>{ta.ago(new Date() - time)}</i>
                </LevelItem>
              </LevelLeft>
          </Level>
          <Content className='text'>
              <pre dangerouslySetInnerHTML={{__html: text}} />
          </Content>
        {item}
      </MediaContent>
    </Media>)
  }
}