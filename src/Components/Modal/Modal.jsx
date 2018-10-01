import React, {Component} from 'react'
import {Modal, ModalBackground, ModalCard, ModalCardHeader, 
  ModalCardFooter, ModalCardTitle, ModalCardBody, Button, Delete} from 'bloomer'
import './modal.css'

export default class Login extends Component {
  render () {
    console.log(this.props.modal)
    return ( 
    <Modal className='login' isActive ={this.props.modal}>
      <ModalBackground />
      <ModalCard>
          <ModalCardHeader>
              <ModalCardTitle>ModalCard Title</ModalCardTitle>
              <Delete />
          </ModalCardHeader>
          <ModalCardBody>
              This is a Login form
          </ModalCardBody>
          <ModalCardFooter>
              <Button isColor='success'>Submit</Button>
              <Button isColor='danger'>Cancel</Button>
          </ModalCardFooter>
      </ModalCard>
    </Modal>
    )}
}