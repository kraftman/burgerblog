// var Navbar = ReactBootstrap.Navbar,
// Nav = ReactBootstrap.Nav,
// NavItem = ReactBootstrap.NavItem,
// DropdownButton = ReactBootstrap.DropdownButton,
// MenuItem = ReactBootstrap.MenuItem,
// NavDropdown = ReactBootstrap.NavDropdown;

var React = require('react');
var Navbar = require('react-bootstrap/lib/Navbar')
var Nav = require('react-bootstrap/lib/Nav')
var DropdownButton = require('react-bootstrap/lib/DropdownButton')
var MenuItem = require('react-bootstrap/lib/MenuItem')
var NavDropdown = require('react-bootstrap/lib/NavDropdown')
var NavItem = require('react-bootstrap/lib/NavItem')

module.exports = function Test(){
    return (
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">BESTBURGERBLOG</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1} href="#">HOME</NavItem>
            <NavItem eventKey={2} href="#">BEST</NavItem>
            <NavItem eventKey={2} href="#">WORST</NavItem>
            <NavItem eventKey={2} href="#">ALL</NavItem>
            <NavItem eventKey={2} href="#">BEST</NavItem>
          </Nav>
          <Nav pullRight>
            <NavItem eventKey={1} href="#">Login</NavItem>
            <NavItem eventKey={2} href="#">Logout</NavItem>
            <NavItem eventKey={2} href="#">Submit</NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
};
