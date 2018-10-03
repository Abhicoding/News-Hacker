import React, {Component} from 'react'
import {Field, Label, Input, Button, Control, Help} from 'bloomer'

export default class Loginform extends Component {
  constructor () {
    super ()
    this.state = {
      username : '',
      password: ''
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
      username : '',
      password1 : '',
      password2: ''
    })
  }

  userControl (e) {
    this.setState({
      username: e.target.value})
  }

  passControl (e) {
    this.setState({
      password: e.target.value})
  }

  onClose () {
    this.resetForm()
    this.props.closeForm()
  }

  onSubmit () {
    var {username, password} = this.state
    return this.props.validateForm({username, password}, 'login')
  }

  render () {
    var boolean = this.props.tab
    var {tab, field, message} = this.props.help
    var showUserHelp = tab === 'login' && field === 'username'
    var showPassHelp = field === 'password'
    return (
      <Field className='loginform' isHidden={!boolean}>
        <Field>
          <Label>Username</Label>
          <Input placeholder='Username' type="text"
          autoComplete='on' onChange={e => this.userControl(e)} 
          value={this.state.username}/>
          <Help isColor='danger' isHidden={!showUserHelp}>{message}</Help>
        </Field>
        <Field>
          <Label>Password</Label>
          <Input type="password" placeholder='Password'
            autoComplete='on' onChange={e => this.passControl(e)} 
            value={this.state.password}/>
            <Help isColor='danger' isHidden={!showPassHelp}>{message}</Help>
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