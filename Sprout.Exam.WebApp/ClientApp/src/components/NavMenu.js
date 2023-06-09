import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { LoginMenu } from './api-authorization/LoginMenu';
import authService from './api-authorization/AuthorizeService';

import './NavMenu.css';

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true,
      authenticated: false,
    };
  }

  componentDidMount() {
    authService.isAuthenticated().then(res => {
      this.setState({
        authenticated: res,
      });
    })
  }

  async toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render () {
    return (
      <header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
          <Container>
            <NavbarBrand tag={Link} to="/employees/index">Sprout Exam Web App</NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
              <ul className="navbar-nav flex-grow">
                {
                  this.state.authenticated ? (
                    <NavItem>
                      <NavLink tag={Link} className="text-dark" to="/employees/index">Employees</NavLink>
                    </NavItem>
                  ) : null
                }
                <LoginMenu>
                </LoginMenu>
              </ul>
            </Collapse>
          </Container>
        </Navbar>
      </header>
    );
  }
}
