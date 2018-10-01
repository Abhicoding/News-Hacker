import React from 'react'
import {Field, Label, Input} from 'bloomer'

export default function Loginform ({boolean}) {
  return (
    <Field className='loginform' isHidden={!boolean}>
      <Field>
        <Label>Username</Label>
        <Input placeholder='Username' type="text" />
      </Field>
      <Field>
        <Label>Password</Label>
        <Input type="password" placeholder='Password' />
      </Field>
    </Field>
  )
}