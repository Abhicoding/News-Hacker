import React, {Component} from 'react'
import './pagecontent.css'
import Storybox from '../Storybox/Storybox.jsx'
import Paginationfooter from '../Paginationfooter/Paginationfooter.jsx'
export default class Pagecontent extends Component {
  render () {
    var tab = this.props.location.pathname.slice(1)
    var data = this.props.data
    var pageinfo = this.props.data[`${tab}page`]
    if (data.show === undefined) return null
    var item = data.show.map(story => <Storybox key={story.id} {...story}/>)
    pageinfo.tabName = tab
    return (
      <div className='pagecontent'>
        {item}
        <div className='paginationfooter'>
          {item.length < 5 ?
            null: <Paginationfooter {...pageinfo}
            pageChange={this.props.pageChange} />}
        </div>
      </div>
  )}
}