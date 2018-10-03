import React, {Component} from 'react'
import {Modal, ModalBackground, ModalCard, ModalCardHeader, 
  ModalCardTitle, ModalCardBody, Button, Delete,
  Field, Control, Tabs, Tab, TabLink, TabList} from 'bloomer'

import axios from 'axios'

import Loginform from '../Loginform/Loginform'
import Signupform from '../Signup/Signupform'

import './modal.css'

export default class Login extends Component {
  constructor () {
    super ()
    this.state = {
      tab : true,
      help: {
        tab: '',
        field: '',
        message: ''
      }
    }
    this.toggleForm = this.toggleForm.bind(this)
    this.closeForm = this.closeForm.bind(this)
    this.submitForm = this.submitForm.bind(this)
    this.sethelper = this.sethelper.bind(this)
    this.validateForm = this.validateForm.bind(this)
    this.resethelper = this.resethelper.bind(this)
  }

  toggleForm () {
    this.setState({
      tab: !this.state.tab
    })
  }

  sethelper (obj) {
    console.log('HELPER CALLED', obj)
    this.setState({
      help: {...obj}
    }, _ => setTimeout(() => this.resethelper(), 60000))
  }
  
  resethelper () {
    this.setState({
      help: {
        tab: '',
        field: '',
        message: ''
      }
    })
  }

  validateForm (formdata, formtype) {
    if (formdata.username.length < 6) {
      return this.sethelper({
        tab: formtype,
        field: 'username',
        message: 'username too small'
      })
    }
    if (formdata.password.length < 6) {
      return this.sethelper({
        tab: formtype,
        field: 'password1',
        message: 'password too small'
      })
    }
    return this.submitForm(formdata, formtype)
  }

  async submitForm (formdata, formtype) {
    var url = `/api/user/${formtype}`
    try {
      var res = await axios.post(url, formdata)
      this.props.onSignin(true, formdata.username)
      this.closeForm()
    } catch (e) {
      return this.sethelper({
        tab: formtype,
        field: 'username',
        message: e.message
      })
    }
  }

  closeForm () {
    this.setState({
      help: {
        tab: '',
        field: '',
        message: ''
      }
    })
    this.props.toggleModal()
  }

  render () {
    return ( 
    <Modal className='login' isActive ={this.props.modal}>
      <ModalBackground />
        <ModalCard>
          <ModalCardHeader>
            <ModalCardTitle>
              <Tabs>
                <TabList>
                  <Tab isActive={this.state.tab}>
                    <TabLink onClick={this.toggleForm}>
                      <span>Login</span>
                    </TabLink>
                  </Tab>
                  <Tab isActive={!this.state.tab}>
                    <TabLink onClick={this.toggleForm}>
                      <span>Sign-up</span>
                    </TabLink>
                  </Tab>
                </TabList>
              </Tabs>
            </ModalCardTitle>              
          </ModalCardHeader>
          <ModalCardBody>
            <Loginform {...this.state} validateForm={this.validateForm} 
              closeForm={this.closeForm} />
            <Signupform {...this.state} validateForm={this.validateForm} 
              closeForm={this.closeForm} sethelper={this.sethelper}/>
          </ModalCardBody>
        </ModalCard>
      </Modal>
    )}
}