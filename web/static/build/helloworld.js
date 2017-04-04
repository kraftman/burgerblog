var Navbar = ReactBootstrap.Navbar,
Nav = ReactBootstrap.Nav,
NavItem = ReactBootstrap.NavItem,
DropdownButton = ReactBootstrap.DropdownButton,
MenuItem = ReactBootstrap.MenuItem,
NavDropdown = ReactBootstrap.NavDropdown;

const navbarInstance = (
  React.createElement(Navbar, null, 
    React.createElement(Navbar.Header, null, 
      React.createElement(Navbar.Brand, null, 
        React.createElement("a", {href: "#"}, "React-Bootstrap")
      )
    ), 
    React.createElement(Nav, null, 
      React.createElement(NavItem, {eventKey: 1, href: "#"}, "Link"), 
      React.createElement(NavItem, {eventKey: 2, href: "#"}, "Link"), 
      React.createElement(NavDropdown, {eventKey: 3, title: "Dropdown", id: "basic-nav-dropdown"}, 
        React.createElement(MenuItem, {eventKey: 3.1}, "Action"), 
        React.createElement(MenuItem, {eventKey: 3.2}, "Another action"), 
        React.createElement(MenuItem, {eventKey: 3.3}, "Something else here"), 
        React.createElement(MenuItem, {divider: true}), 
        React.createElement(MenuItem, {eventKey: 3.4}, "Separated link")
      )
    )
  )
);

ReactDOM.render(navbarInstance, document.getElementById('targetDiv'));
