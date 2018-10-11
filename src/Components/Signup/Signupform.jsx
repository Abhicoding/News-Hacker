import React, { Component } from 'react'
import { Field, Label, Input, Control, Button, Help } from 'bloomer'

export default class Signupform extends Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      password1: '',
      password2: '',
      help: this.props.help
    }

    this.onClose = this.onClose.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.resetForm = this.resetForm.bind(this)
  }

  componentWillReceiveProps () {
    if (this.props.help.tab) return this.resetForm()
  }

  resetForm () {
    this.setState({
      username: '',
      password1: '',
      password2: ''
    })
  }

  userControl (e) {
    this.setState({
      username: e.target.value })
  }

  passControl (e) {
    if (e.target.className === 'input pass1') {
      return this.setState({
        password1: e.target.value
      })
    }
    this.setState({
      password2: e.target.value
    })
  }

  onClose () {
    this.resetForm()
    this.props.closeForm()
  }

  onSubmit () {
    var { username, password1, password2 } = this.state
    if (password1 === password2) {
      return this.props.validateForm({ username, password: password1 }, 'signup')
    }
    this.props.sethelper({
      tab: 'signup',
      field: 'password2',
      message: 'Password did not match'
    })
    this.setState({ password2: '' })
  }

  render () {
    var boolean = this.props.tab
    var { tab, field, message } = this.props.help
    var showUserHelp = (tab === 'signup' && field === 'username')
    var showPass1Help = field === 'password1'
    var showPass2Help = field === 'password2'

    return (
      <Field className='signupform' isHidden={boolean}>
        <Field>
          <Label>Username</Label>
          <Input placeholder='Username' type='text'
            onChange={e => this.userControl(e)} value={this.state.username} />
          <Help isColor='danger' isHidden={!showUserHelp}>{message}</Help>
        </Field>
        <Field>
          <Label>Password</Label>
          <Input className='pass1' type='password' placeholder='Password'
            onChange={e => this.passControl(e)} value={this.state.password1}
          />
          <Help isColor='danger'isHidden={!showPass1Help}>{message}</Help>
        </Field>
        <Field>
          <Label>Confirm Password</Label>
          <Input className='pass2' type='password' placeholder='Password'
            onChange={e => this.passControl(e)} value={this.state.password2}
          />
          <Help isColor='danger'isHidden={!showPass2Help}>{message}</Help>
        </Field>
        <Field isGrouped>
          <Control>
            <Button className='submit' onClick={this.onSubmit}>Submit</Button>
          </Control>
          <Control>
            <Button className='cancel' onClick={this.onClose}>Cancel</Button>
          </Control>
        </Field>
      </Field>
    )
  }
}
