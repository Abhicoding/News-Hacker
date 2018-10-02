import React, {Component} from 'react'
import {Container, Field, Label, Control, Input, Button} from 'bloomer'

import './createpost.css'

export default class Createpost extends Component {
  // constructor () {
  //   super()
  // }

  render () {
    return(
    <Container className='createpost'>
      <Field>
        <Label>URL</Label>
        <Control>
          <Input type="text" placeholder='Text Input' onChange/>
        </Control>
      </Field>
      <Field>
        <Label>Post Title</Label>
        <Control>
          <Input type="text" placeholder='Suggested title will appear here' />
        </Control>
      </Field>
      <Field isGrouped>
      <Control>
        <Button isColor='primary'>Submit</Button>
      </Control>
      <Control>
        <Button isLink>Cancel</Button>
      </Control>
      </Field>
    </Container>
    )
  }
}