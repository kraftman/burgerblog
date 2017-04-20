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
var Panel = require('react-bootstrap/lib/Panel')

module.exports = function Burger(props){
    return (
      <Panel >  {props.config.title}</Panel>
    )
};
