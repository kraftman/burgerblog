import Link from 'next/link';

const topBar = {
  backgroundColor: '#f70',
  padding: 10,
};
const linkStyle = {
  marginRight: 15,
};

const Header = () => (
  <div style={topBar}>
    <Link href="/">
      <a style={linkStyle}>Home</a>
    </Link>
    <Link
      as={'/best'}
      href={{ pathname: '/', query: { type: 'top', count: 10 } }}
    >
      <a style={linkStyle}>Best</a>
    </Link>
    <Link
      as={'/worst'}
      href={{ pathname: '/', query: { type: 'bottom', count: 10 } }}
    >
      <a style={linkStyle}>Worst</a>
    </Link>
    <Link href="/submit">
      <a style={linkStyle}>Submit</a>
    </Link>
  </div>
);

export default Header;
