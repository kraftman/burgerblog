import Layout from '../components/MyLayout.js';
import fetch from 'isomorphic-unfetch';
import css from '../sass/sitestyle.scss';

const Index = (props) => (
  <Layout {...props}>
    <img
      className={css['burger-image-main']}
      src={`/image/${props.burger.image}`}
      alt="burger image"
    />
    <div className={css['burger-page-details']}>
      <h1 className={css['burger-page-name']}>{props.burger.burgerName}</h1>
      <div>
        Location: {props.burger.restaurantName} <br />
        Burger Rating: {props.burger.burgerScore / 100} <br />
        Meal Rating: {props.burger.mealScore / 100} <br />
        Patty Flavour: {props.burger.meatFlavour} <br />
        Patty Texture: {props.burger.meatTexture} <br />
        Patty Succulence: {props.burger.meatSucculence} <br />
        Patty Volume: {props.burger.meatVolume} <br />
        Bun Rating: {props.burger.bunRating} <br />
        Topping Rating: {props.burger.toppingRating} <br />
      </div>
    </div>
  </Layout>
);

const getTopBurgers = async () => {
  let topBurgers = await fetch('http://localhost/api/top/10');
  topBurgers = await topBurgers.json();
  return topBurgers;
};

const getBurger = async (burgerID) => {
  let burger = await fetch(`http://localhost/api/burger/${burgerID}`);
  burger = await burger.json();
  return burger;
};

Index.getInitialProps = async function({ pathname, query }) {
  const topBurgers = await getTopBurgers();
  const burger = await getBurger(query.id);
  return {
    topBurgers,
    burger,
  };
};

export default Index;
