import React, {Component} from 'react'
import {Link} from 'react-router-dom'

import {Navbar, NavbarBrand, NavbarBurger, 
  NavbarStart, NavbarEnd, NavbarItem, NavbarMenu, NavbarLink, 
  NavbarDivider, NavbarDropdown, Icon} from 'bloomer'
import './header.css'


export default class Header extends Component {
  constructor() {
    super()
    this.state = {
      isActive: false
    }
    this.onClickNav = this.onClickNav.bind(this)
    this.updateStories = this.updateStories.bind(this)
  }

  componentWillMount () {
    if (this.props.location.pathname === '/') {
      this.props.history.push('/topstories')
      this.props.getStoryIds(this.props.location.pathname)
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

  render () {
    return (
    <div>
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
            <Link to='newstories' onClick={this.updateStories}>New</Link>
          </NavbarItem>
          <NavbarItem title='Top'>
            <Link to='topstories' onClick={this.updateStories}>Top</Link>
          </NavbarItem>
          <NavbarItem title='Best'>
            <Link to='beststories' onClick={this.updateStories}>Best</Link>
          </NavbarItem>
          <NavbarItem hasDropdown isHoverable>
            <NavbarLink href='#/documentation'>Documentation</NavbarLink>
            <NavbarDropdown>
              <NavbarItem href='#/'>One A</NavbarItem>
              <NavbarItem href='#/'>Two B</NavbarItem>
              <NavbarDivider />
              <NavbarItem href='#/'>Two A</NavbarItem>
            </NavbarDropdown>
          </NavbarItem>
        </NavbarStart>
        <NavbarEnd>
          <NavbarItem href="https://github.com/AlgusDark/bloomer" isHidden='touch'>
            <Icon className='fa fa-github' />
          </NavbarItem>
        </NavbarEnd>
      </NavbarMenu>
    </Navbar>
    </div>
    )}
}