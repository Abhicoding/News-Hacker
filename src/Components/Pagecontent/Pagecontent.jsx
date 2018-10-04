import React, {Component} from 'react'
import {BarLoader} from 'react-spinners'

import './pagecontent.css'
import Storybox from '../Storybox/Storybox.jsx'
import Paginationfooter from '../Paginationfooter/Paginationfooter.jsx'
import Login from '../Modal/Modal.jsx'

export default class Pagecontent extends Component {
  componentDidMount () {
    if (!this.props.data.loggedin) return
    this.intializer()
  }

  async intializer () {
    var user = (await this.props.auth()).data
    if (user) {
      this.props.onSignin(true, user)
    } else {
      this.props.changeUserStatus()
    }
  }

  render () {
    if (this.props.data.loading) {
      return (<BarLoader color={"#0E4749"} widthUnit={'1'} loading={this.props.data.loading}/>)
    }
    var tab = this.props.location.pathname.slice(1)
    if (!['topstories', 'beststories', 'newstories', 'nhstories']
      .includes(tab)) return null
    var data = this.props.data
    var pageinfo = {...this.props.data[`${tab}page`]}
    if (pageinfo === undefined) return null
    var stories = data[tab][pageinfo.currentpage - 1]
    if (stories === undefined) return null
    stories =  stories.filter(k => k !== null)
    var item = stories.map(story => <Storybox key={story.id} {...story} 
      loggedin={data.loggedin} user={data.user}/>)
    pageinfo.tab = tab
    
    return (
      <div className='pagecontent'>
        <Login modal={this.props.data.modal} 
          toggleModal={this.props.toggleModal}
          onSignin={this.props.onSignin} />
        <div className='item'>{item}</div>
          <div className='paginationfooter'>
            {item.length < 5 ?
              null: <Paginationfooter {...pageinfo}
              pageChange={this.props.pageChange} />}
          </div>
      </div>
  )}
}