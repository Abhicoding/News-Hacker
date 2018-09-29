import React, {Component} from 'react'
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

  }
  onClickNav () {
    this.setState({
      isActive: !this.state.isActive
    })
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
            onClick={() => this.onClickNav} />
      </NavbarBrand>
      <NavbarMenu isActive={this.state.isActive} onClick={this.onClickNav}>
        <NavbarStart>
          <NavbarItem href='#/' title='New'>New</NavbarItem>
          <NavbarItem href='#/' title='Top'>Top</NavbarItem>
          <NavbarItem href='#/' title='Best'>Best</NavbarItem>
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