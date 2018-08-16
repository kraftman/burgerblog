import Layout from '../components/MyLayout.js'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'

const Index = (props) => (
  <Layout {...props} >
    <h1>Recent</h1>
    <ul>
      {props.recentBurgers.map((burger) => (
          <li key={burger.burgerID}>
          <Link as={`/p/${burger.burgerID}`} href={`/post?id=${burger.burgerID}`}>
              <a>{burger.burgerName}</a>
          </Link>
          </li>
      ))}
    </ul>
  </Layout>
)

Index.getInitialProps = async function() {
    let topBurgers = await fetch('http://burgerblog/api/top/10')
    topBurgers = await topBurgers.json()

    let recentBurgers = await fetch('http://burgerblog/api/recent/10')
    recentBurgers = await recentBurgers.json()

    return {
      topBurgers,
      recentBurgers
    }
  }

export default Index