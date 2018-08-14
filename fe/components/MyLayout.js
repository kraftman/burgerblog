import Header from './Header'
import Sidebar from './Sidebar';

const layoutStyle = {
  margin: 20,
  padding: 20,
  border: '1px solid #DDD'
}

const Layout = (props) => (
  <div style={layoutStyle}>
    <Header />
    <Sidebar topBurgers={props.topBurgers} recentBurgers={props.recentBurgers}/>
    {props.children}
  </div>
)

export default Layout