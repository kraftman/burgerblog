import Link from 'next/link'

const linkStyle = {
  marginRight: 15
}

const Header = () => (
    <div>
        <Link href="/">
          <a style={linkStyle}>Home</a>
        </Link>
        <Link href="/about">
          <a style={linkStyle}>About</a>
        </Link>
        <Link href="/best">
          <a style={linkStyle}>Best</a>
        </Link>
        <Link href="/worst">
          <a style={linkStyle}>Worst</a>
        </Link>
        <Link href="/worst">
          <a style={linkStyle}>All</a>
        </Link>
    </div>
)

export default Header