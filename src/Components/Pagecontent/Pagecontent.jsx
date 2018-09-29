import React, {Component} from 'react'

import {Box} from 'bloomer'

export default class Pagecontent extends Component {
  render () {
    console.log(this.props)
    return (
      <Box>Content inside the box</Box>
  )}
}