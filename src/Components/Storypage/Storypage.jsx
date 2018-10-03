import React, {Component} from 'react'

import Storybox from '../Storybox/Storybox';
import Comment from '../Comment/Comment'
import Login from '../Modal/Modal'

export default class Storypage extends Component{
  constructor () {
    super()
    this.state = {
      user: {
        by: "",
        descendants: 0,
        id: 0,
        kids: [],
        score: 0,
        time: 0,
        title: "",
        type: "",
        url: ""
      },
      kids : []
    }
  }
  componentDidMount () {
    this.getStory(this.props.match.params.id)
  }

  async getStory (id) {
    var res = await fetch(`https://hacker-news.firebaseio.com/v0/item/${this.props.match.params.id}.json?print=pretty`)
    var result = await res.json()
    this.setState({
      user: {
        ...result
      }
    })
    var kids = await this.getChildren(result.kids)
    this.setState({
      kids
    })
  }
  async getChildren (arr) {
    var arrProm = arr.map(x => fetch(`https://hacker-news.firebaseio.com/v0/item/${x}.json?print=pretty`))
    var promiseArr = await Promise.all(arrProm.map(p => p.catch(e => e)))
    return await Promise.all(promiseArr.map(x => x.json()))
  }

  render () {
    if (!this.state.user.time) return null
    var item = this.state.kids
      .filter(y => y.by !== undefined && y.text)
      .map(x => <Comment key={x.id} getChildren = {this.getChildren} {...x} />)
    return (
      <div className='storypage'>
        <Login modal={this.props.data.modal} toggleModal={this.props.toggleModal}
          onSignin={this.props.onSignin} />
        <Storybox className='storypagetitle'  {...this.state.user}/>
        {item}
      </div>
    )
  }
}