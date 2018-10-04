import React, {Component} from 'react'
import axios from 'axios'

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
    this.intializer()
  }

  async intializer () {
    var user = (await this.props.auth()).data
    if (user) {
      this.props.onSignin(true, user)
    } else {
      this.props.changeUserStatus()
    }
    this.getStory(this.props.match.params.id)
  }

  async getStory (id) {
    var result = await axios.get(`/api/ext/item/${id}`)
    this.setState({
      user: {
        ...result.data
      }
    })
    if (!result.data.descendants) return
    var kids = await this.getChildren(result.data.kids)
    this.setState({
      kids
    })
  }
  async getChildren (arr) {
    var arrProm = arr.map(id => axios.get(`/api/ext/item/${id}`))
    var dataArr = await Promise.all(arrProm.map(p => p.catch(e => e)))
    return dataArr.map(x => x.data)
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
        <Storybox className='storypagetitle'  {...this.state.user} />
        {item}
      </div>
    )
  }
}