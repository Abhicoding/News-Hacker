import React, {Component} from 'react'
import './pagecontent.css'
import Storybox from '../Storybox/Storybox.jsx'
import Paginationfooter from '../Paginationfooter/Paginationfooter.jsx'
import Login from '../Modal/Modal.jsx'

export default class Pagecontent extends Component {
  render () {
    
    var tab = this.props.location.pathname.slice(1)
    if (!['topstories', 'beststories', 'newstories'].includes(tab)) return null
    var data = this.props.data
    var pageinfo = {...this.props.data[`${tab}page`]}
    if (pageinfo === undefined) return null
    var stories = data[tab][pageinfo.currentpage - 1]
    if (stories === undefined) return null
    var item = stories.map(story => <Storybox key={story.id} {...story}/>)
    pageinfo.tab = tab
    
    return (
      <div className='pagecontent'>
        <Login modal={this.props.data.modal} toggleModal={this.props.toggleModal}
          onSignin={this.props.onSignin} onSignout={this.props.onSignout} />
        <div className='item'>{item}</div>
          <div className='paginationfooter'>
            {item.length < 5 ?
              null: <Paginationfooter {...pageinfo}
              pageChange={this.props.pageChange} />}
          </div>
      </div>
  )}
}