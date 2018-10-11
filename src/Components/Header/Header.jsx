import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { Navbar, NavbarBrand, NavbarBurger,
  NavbarStart, NavbarEnd, NavbarItem, NavbarMenu, Button, Icon } from 'bloomer'
import './header.css'

export default class Header extends Component {
  constructor () {
    super()
    this.state = {
      isActive: false
    }
    this.onClickNav = this.onClickNav.bind(this)
    this.updateStories = this.updateStories.bind(this)
    this.handleModal = this.handleModal.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
  }

  componentWillMount () {
    if (this.props.location.pathname === '/') {
      this.props.history.push('/topstories')
    }
  }

  onClickNav () {
    this.setState({
      isActive: !this.state.isActive
    })
  }

  updateStories () {
    this.props.getStoryIds(this.props.location.pathname)
  }

  handleTabSwitch (tab) {
    this.props.tabswitch(tab)
  }

  handleModal () {
    this.props.toggleModal()
  }

  handleLogout () {
    this.props.onSignout()
  }

  render () {
    return (
      <div className='header'>
        <Navbar>
          <NavbarBrand className='navbar-brand'>
            <NavbarItem isHidden='mobile'>
            News-Hacker
            </NavbarItem>
            <NavbarItem isHidden='tablet'>
            NH
            </NavbarItem>
            <NavbarBurger isActive={this.state.isActive}
              onClick={this.onClickNav} />
        </NavbarBrand>
        <NavbarMenu isActive={this.state.isActive} onClick={this.onClickNav}>
            <NavbarStart>
              <NavbarItem title='New'>
                <Link to='/newstories' onClick={() => this.handleTabSwitch('newstories')}>New</Link>
              </NavbarItem>
              <NavbarItem title='Top'>
                <Link to='/topstories' onClick={() => this.handleTabSwitch('topstories')}>Top</Link>
              </NavbarItem>
              <NavbarItem title='Best'>
                <Link to='/beststories' onClick={() => this.handleTabSwitch('beststories')}>Best</Link>
              </NavbarItem>
              <NavbarItem title='NHStories'>
                <Link to='/nhstories' onClick={() => this.handleTabSwitch('nhstories')}>NH Stories</Link>
              </NavbarItem>
            </NavbarStart>
            <NavbarEnd>
              {this.props.data.loggedin
                ? <NavbarItem className='user'>{`Hi, ${this.props.data.user}`}</NavbarItem>
                : null}
              {!this.props.data.loggedin
                ? (<NavbarItem className='github' target='_blank' href='https://github.com/Abhicoding/News-Hacker' isHidden='touch'>
              <Icon className='fab fa-github' />
                </NavbarItem>)
                : null}
              {this.props.data.loggedin
                ? <NavbarItem className='newpost'>
                  <Button className='newpost-button'
                    onClick={() => this.props.history.push('/createpost')}>
                Create Post
                  </Button>
                </NavbarItem>
                : null}
              <NavbarItem className='login'>
                {!this.props.data.loggedin
                  ? <Button className='login-button'
                    onClick={this.handleModal} >Login</Button>
                  : <Button className='logout-button'
                    onClick={this.handleLogout} >Logout</Button>}
              </NavbarItem>
            </NavbarEnd>
          </NavbarMenu>
        </Navbar>
      </div>
    )
 }
}
