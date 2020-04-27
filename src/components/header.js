import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Collapse, Nav, Navbar, NavbarBrand, NavbarText, NavbarToggler, NavItem, NavLink } from 'reactstrap';

class Header extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <div>
        <Navbar fixed='top' light expand="sm">
          <div className="container">
            <NavbarBrand href="/">{this.props.siteTitle}</NavbarBrand>

            <NavbarToggler onClick={this.toggle}/>

            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="mr-auto" navbar>
                <NavItem>
                  <NavLink href="/tags">Tags</NavLink>
                </NavItem>

                <NavItem>
                  <NavLink href="/team">Team</NavLink>
                </NavItem>
              </Nav>
              <NavbarText>Simple Text</NavbarText>
            </Collapse>
          </div>
        </Navbar>
      </div>
    );
  }
}

Header.propTypes = {
  siteTitle: PropTypes.string
};

Header.defaultProps = {
  siteTitle: ``
};

export default Header;
