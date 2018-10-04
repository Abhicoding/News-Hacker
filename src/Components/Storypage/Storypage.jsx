import React, {Component} from 'react'
import axios from 'axios'
import {BarLoader} from 'react-spinners'

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
      kids : [],
      loading1: false,
      loading2: false
    }
    this.getStory = this.getStory.bind(this)
    this.getChildren = this.getChildren.bind(this)
  }
  componentDidMount () {
    this.intializer()
  }

  async intializer () {
    this.setState({loading1: true, loading2: true})
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
        ...result.data,
      },
      loading1: false
    })
    if (!result.data.descendants) return this.setState({loading2: false})
    var kids = await this.getChildren(result.data.kids)
    this.setState({
      kids,
      loading2: false
    })
  }
  async getChildren (arr) {
    var arrProm = arr.map(id => axios.get(`/api/ext/item/${id}`))
    var dataArr = await Promise.all(arrProm.map(p => p.catch(e => e)))
    return dataArr.map(x => x.data)
  }

  render () {
    var {loading1, loading2} = this.state
    var item = this.state.kids
      .filter(y => y.by !== undefined && y.text)
      .map(x => <Comment key={x.id} getChildren = {this.getChildren} {...x} />)
    return (
      <div className='storypage'>
        <Login modal={this.props.data.modal} 
        toggleModal={this.props.toggleModal}
          onSignin={this.props.onSignin} />
        {!loading1
          ? <Storybox  {...this.state.user} />
          : <BarLoader color={"#0E4749"} widthUnit={'1'} 
            loading={loading1}/>}
        {loading2 
          ? <BarLoader color={"#79B791"} widthUnit={'1'} 
          loading={loading2}/>
          : item}
      </div>
    )
  }
}