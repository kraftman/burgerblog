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
    <Link href="/best">
      <a style={linkStyle}>Best</a>
    </Link>
    <Link href="/worst">
      <a style={linkStyle}>Worst</a>
    </Link>
    <Link href="/submit">
      <a style={linkStyle}>Submit</a>
    </Link>
  </div>
);

export default Header;
