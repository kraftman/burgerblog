import Layout from '../components/MyLayout.js';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';

const Index = (props) => (
  <Layout {...props}>
    <h1>Recent</h1>
    <ul>
      {props.mainBurgers.map((burger) => (
        <li key={burger.burgerID}>
          <Link
            as={`/b/${burger.burgerID}`}
            href={`/post?id=${burger.burgerID}`}
          >
            <a>{burger.burgerName}</a>
          </Link>
        </li>
      ))}
    </ul>
  </Layout>
);

const sorts = {
  top: 'top/10',
  bottom: 'bottom/10',
};

const getTopBurgers = async () => {
  let topBurgers = await fetch('http://localhost/api/top/10');
  topBurgers = await topBurgers.json();
  return topBurgers;
};

const getMainBurgers = async (query) => {
  const baseURI = 'http://localhost/api/';
  const sortType = query && query.type;
  if (!sortType) {
    return;
  }
  const extension = sorts[sortType];
  if (!extension) {
    return;
  }
  const fullUrl = baseURI + extension;
  console.log('getting main burgers: ', fullUrl);
  let mainBurgers = await fetch(fullUrl);
  mainBurgers = await mainBurgers.json();
  return mainBurgers;
};

Index.getInitialProps = async function({ pathname, query }) {
  const topBurgers = await getTopBurgers();
  let mainBurgers = (await getMainBurgers(query)) || topBurgers;
  console.log(query);
  return {
    topBurgers,
    mainBurgers,
  };
};

export default Index;
