import React, {Component} from 'react'
import './pagecontent.css'
import Storybox from '../Storybox/Storybox.jsx'
import Paginationfooter from '../Paginationfooter/Paginationfooter.jsx'
export default class Pagecontent extends Component {
  render () {
    var tab = this.props.location.pathname.slice(1)
    // console.log(tab in ['topstories', 'beststories', 'newstories'])
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
        <div className='item'>{item}</div>
        <div className='paginationfooter'>
          {item.length < 5 ?
            null: <Paginationfooter {...pageinfo}
            pageChange={this.props.pageChange} />}
        </div>
      </div>
  )}
}