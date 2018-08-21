import Layout from '../components/MyLayout.js';
import fetch from 'isomorphic-unfetch';
import BurgerItem from '../components/BurgerItem';
import css from '../sass/sitestyle.scss';

const Index = (props) => (
  <Layout {...props}>
    <div className={css.main}>
      <ul>
        {props.mainBurgers.map((burger) => (
          <BurgerItem key="{burger.burgerID}" burger={burger} />
        ))}
      </ul>
    </div>
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
