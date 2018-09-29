import React, {Component} from 'react'
import {Navbar, NavbarBrand, NavbarBurger, NavbarStart, NavbarEnd, NavbarItem, NavbarMenu, NavbarLink, NavbarDivider, NavbarDropdown, Icon} from 'bloomer'

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
      <Navbar style={{ border: 'solid 1px #00D1B2', margin: '0' }}>
        <NavbarBrand>
          <NavbarItem isHidden='mobile' isSize='large'>
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
              <NavbarItem href='#/'>New</NavbarItem>
              <NavbarItem href='#/'>Top</NavbarItem>
              <NavbarItem href='#/'>Best</NavbarItem>
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