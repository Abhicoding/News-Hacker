import React, {Component} from 'react'

export default class Storypage extends Component{
  render () {
    //console.log(this.props.match)
    return (
      <div>{`Here's my story ${this.props.match.params.id}`}</div>
    )
  }
}