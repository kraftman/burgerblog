import Link from 'next/link';

import css from '../sass/sitestyle.scss';

const Sidebar = (props) => (
  <div className={css.left}>
    <h1>Top Burgers:</h1>
    <ul>
      {props.topBurgers.map((burger) => (
        <li key={burger.burgerID}>
          <Link
            as={`/b/${burger.burgerID}`}
            href={`/burger?id=${burger.burgerID}`}
          >
            <a>{burger.burgerName}</a>
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export default Sidebar;
