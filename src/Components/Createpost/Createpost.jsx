import React, {Component} from 'react'
import {Container, Field, Label, Control, Input, Button, LevelItem, Level, Help} from 'bloomer'
import axios from 'axios'

import './createpost.css'

export default class Createpost extends Component {
  constructor () {
    super()
    this.state = {
      url : '',
      title: '',
      loading1: false,
      loading2: false,
      message: ''
    }

    this.setTitle = this.setTitle.bind(this)
    this.getTitle = this.getTitle.bind(this)
    this.postStory = this.postStory.bind(this)
    this.toggleloading1 = this.toggleloading1.bind(this)
    this.toggleloading2 = this.toggleloading2.bind(this)
    this.handleRedirect = this.handleRedirect.bind(this)
    this.setMessage = this.setMessage.bind(this)
    this.resetMessage = this.resetMessage.bind(this)
  }

  componentWillReceiveProps () {
    if (!this.props.data.loggedin) return
    this.intializer()
  }

  async intializer () {
    var user = (await this.props.auth()).data
    if (user) {
      this.props.onSignin(true, user)
    } else {
      this.props.changeUserStatus()
      this.props.history.push('/newstories')
    }
  }

  setMessage (message) {
    this.setState({
      message
    }, _ => setTimeout(() => this.resetMessage(), 60000))
  }

  resetMessage () {
    this.setState({
      message: ''
    })
  }

  setTitle (e) {
    this.setState({
      url: e.target.value
    })
  }

  toggleloading1 () {
    return this.setState({loading1 : !this.state.loading1})
  }

  toggleloading2 () {
    return this.setState({loading2 : !this.state.loading2})
  }

  async getTitle () {
    this.toggleloading1()
    try {
      var res = await axios.post('/api/ext/title', {url: this.state.url})
    } catch (e) {
      this.toggleloading1()
      this.setMessage('Failed to get title. Try your own.')
      return e
    }    
    this.toggleloading1()
    if (res.status === 200) {
      this.setState({
        title: res.data
      }) 
    }
  }

  async postStory () {
    this.toggleloading2()
    var {title, url} = this.state
    var story = {
      title,
      url,
      time: Date.now(),
      descendants: 0
    }

    try {
      var res = await axios.post('/api/story/poststory', story)
      if (!res.status === 201) throw new Error('Failed to post. Try again later.')
      this.toggleloading2()
      this.handleRedirect('/nhstories')
    } catch (e) {
      this.setMessage('Failed to post. Try again later.')
      this.toggleloading2()
      return e
    }
  }

  handleRedirect (path) {
    this.props.history.push(path)
  }

  render () {
    var {message} = this.state
    return(
    <Container className='createpost'>
      <Field>
      <Label>URL</Label>
        <Level>
          <LevelItem>
            <Input type="text" placeholder='Text Input' 
              onChange={(e) => this.setTitle(e)} value={this.state.url}/>
          </LevelItem>
        </Level>
      </Field>
      <Field>
        <Control>
          <Button isColor='primary' onClick={this.getTitle} 
            isLoading={this.state.loading1}>Get title</Button>
        </Control>
      </Field>
      <Help isColor='danger' isHidden={!Boolean(message)}>{message}</Help>
      <Field>
        <Label>Post Title</Label>
        <Control>
          <Input type="text" placeholder='Suggested title will appear here' 
            defaultValue={this.state.title}/>
        </Control>
      </Field>
      <Field isGrouped>
      <Control>
        <Button isColor='primary' isLoading={this.state.loading2} 
          onClick={this.postStory}>Submit</Button>
      </Control>
      <Control>
        <Button onClick={this.props.history.goBack}>Cancel</Button>
      </Control>
      </Field>
    </Container>
    )
  }
}