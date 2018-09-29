import React, {Component} from 'react'

import {Box} from 'bloomer'

export default class Pagecontent extends Component {
  constructor (props) {
    super()
    this.state = {
      show: props.data[props.location.pathname.slice(1)]
    }
  }
  render () {
    // console.log(this.state.show, 'content')
    // console.log(this.props.location.pathname.slice(1), 'content')
    return (
      <Box>Content inside the box</Box>
  )}
}