var Navbar = ReactBootstrap.Navbar,
Nav = ReactBootstrap.Nav,
NavItem = ReactBootstrap.NavItem,
DropdownButton = ReactBootstrap.DropdownButton,
MenuItem = ReactBootstrap.MenuItem,
NavDropdown = ReactBootstrap.NavDropdown;

const navbarInstance = (
  React.createElement(Navbar, {inverse: true, collapseOnSelect: true}, 
    React.createElement(Navbar.Header, null, 
      React.createElement(Navbar.Brand, null, 
        React.createElement("a", {href: "#"}, "BESTBURGERBLOG")
      ), 
      React.createElement(Navbar.Toggle, null)
    ), 
    React.createElement(Navbar.Collapse, null, 
      React.createElement(Nav, null, 
        React.createElement(NavItem, {eventKey: 1, href: "#"}, "HOME"), 
        React.createElement(NavItem, {eventKey: 2, href: "#"}, "BEST"), 
        React.createElement(NavItem, {eventKey: 2, href: "#"}, "WORST"), 
        React.createElement(NavItem, {eventKey: 2, href: "#"}, "ALL"), 
        React.createElement(NavItem, {eventKey: 2, href: "#"}, "BEST")
      ), 
      React.createElement(Nav, {pullRight: true}, 
        React.createElement(NavItem, {eventKey: 1, href: "#"}, "Link Right"), 
        React.createElement(NavItem, {eventKey: 2, href: "#"}, "Link Right")
      )
    )
  )
);

ReactDOM.render(navbarInstance, document.getElementById('targetDiv'));
