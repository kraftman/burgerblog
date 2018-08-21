import Header from './Header';
import Sidebar from './Sidebar';
import css from '../sass/sitestyle.scss';

const Layout = (props) => (
  <div className={css['center-page']}>
    <Header />
    <Sidebar
      topBurgers={props.topBurgers}
      recentBurgers={props.recentBurgers}
    />
    {props.children}
  </div>
);

export default Layout;
