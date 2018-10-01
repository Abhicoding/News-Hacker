import React from 'react'
import {Field, Label, Input} from 'bloomer'

export default function Signupform ({boolean}) {
  return (
  <Field className='signupform' isHidden={!boolean}>
    <Field>
        <Label>Username</Label>
        <Input placeholder='Username' type="text" />
      </Field>
      <Field>
        <Label>Password</Label>
        <Input type="password" placeholder='Password' />
      </Field>
      <Field>
        <Label>Confirm Password</Label>
        <Input type="password" placeholder='Password' />
      </Field>
  </Field>
  )
}