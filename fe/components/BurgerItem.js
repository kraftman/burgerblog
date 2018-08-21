import Link from 'next/link';
import css from '../sass/sitestyle.scss';
import daysAgo from '../utils/daysago';

const timeNow = () => {
  return new Date().getTime() / 1000;
};

const BurgerItem = ({ burger }) => (
  <div className={css['burger-panel']}>
    <Link as={`/b/${burger.burgerID}`} href={`/post?id=${burger.burgerID}`}>
      <a>
        <img src={`/image/${burger.icon}`} className={css['burger-icon']} />
        <span className={css['burger-score']}>{burger.burgerScore}</span>
      </a>
    </Link>
    <input
      className={css['burger-lat']}
      type="hidden"
      name="lat"
      value={burger.lat}
    />
    <input
      className={['burger-long']}
      type="hidden"
      name="long"
      value={burger.long}
    />

    <span className={css['burger-stats']}>
      <Link as={`/b/${burger.burgerID}`} href={`/post?id=${burger.burgerID}`}>
        {burger.burgerName}
      </Link>

      {daysAgo(timeNow() - burger.dateEaten)}
      <div> Meat {burger.meatRating}</div>
      <div> Bun {burger.bunRating}</div>
      <div> Topping {burger.toppingRating}</div>
      <div> Side {burger.sideRating || 0} </div>
    </span>
  </div>
);

export default BurgerItem;
