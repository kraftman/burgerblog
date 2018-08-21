import Link from 'next/link';
import css from '../sass/sitestyle.scss';

const Header = () => (
  <div className={css.top}>
    <Link href="/">
      <a className={css['title-row']}>Home</a>
    </Link>
    <Link
      as={'/best'}
      href={{ pathname: '/', query: { type: 'top', count: 10 } }}
    >
      <a className={css['title-row']}>Best</a>
    </Link>
    <Link
      as={'/worst'}
      href={{ pathname: '/', query: { type: 'bottom', count: 10 } }}
    >
      <a className={css['title-row']}>Worst</a>
    </Link>
    <Link href="/submit">
      <a className={css['title-row']}>Submit</a>
    </Link>
  </div>
);

export default Header;
