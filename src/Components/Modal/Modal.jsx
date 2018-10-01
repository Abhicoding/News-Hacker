import React, {Component} from 'react'
import {Modal, ModalBackground, ModalCard, ModalCardHeader, 
  ModalCardTitle, ModalCardBody, Button, Delete,
  Field, Control, Tabs, Tab, TabLink, TabList} from 'bloomer'

import Loginform from '../Loginform/Loginform'
import Signupform from '../Signup/Signupform'

import './modal.css'

export default class Login extends Component {
  constructor () {
    super ()
    this.state = {
      tab : true,
    }
    this.toggleForm = this.toggleForm.bind(this)
    this.closeForm = this.closeForm.bind(this)

  }

  toggleForm () {
    this.setState({
      tab: !this.state.tab
    })
  }

  closeForm () {
    this.props.toggleModal()
  }

  render () {
    // console.log(this.props, 'modal props')
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
            <Delete onClick={this.closeForm}/>
          </ModalCardHeader>
          <ModalCardBody>
            <Loginform boolean={this.state.tab}/>
            <Signupform boolean={!this.state.tab}/>
            <Field isGrouped>
              <Control>
                <Button className='submit'>Submit</Button>
              </Control>
              <Control>
                <Button className='cancel' onClick={this.closeForm}>Cancel</Button>
              </Control>
            </Field>
          </ModalCardBody>
        </ModalCard>
      </Modal>
    )}
}