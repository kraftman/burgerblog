import Link from 'next/link';

const sidebarStyle = {
  float: 'left',
  backgroundColor: '#ffd7b5',
};

const Sidebar = (props) => (
  <div style={sidebarStyle}>
    <h1>Top Burgers:</h1>
    <ul>
      {props.topBurgers.map((burger) => (
        <li key={burger.burgerID}>
          <Link
            as={`/p/${burger.burgerID}`}
            href={`/post?id=${burger.burgerID}`}
          >
            <a>{burger.burgerName}</a>
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export default Sidebar;
