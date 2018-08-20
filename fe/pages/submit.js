import Layout from '../components/MyLayout.js';
import fetch from 'isomorphic-unfetch';
import { post } from 'axios';
import React from 'react';
import imageTools from '../utils/imagetools';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

/* TODO:
- get radio button sending working
- convert uploaded data to redis format
- save to redis

*/

const resizeImage = (file, size) => {
  const maxDimensions = {
    width: size,
    height: size,
  };
  return new Promise((resolve, reject) => {
    imageTools.resize(file, maxDimensions, function(result) {
      return resolve(result);
    });
  });
};
const fileUpload = (burgerIcon, burgerImage, state) => {
  const url = 'http://localhost/api/upload';
  const formData = new FormData();
  formData.set('icon', burgerIcon);
  formData.set('image', burgerImage);
  formData.set('restaurantName', state.restaurantName);
  formData.set('burgerName', state.burgerName);
  formData.set('dateEaten', new Date(state.dateEaten).getTime() / 1000);
  formData.set('meatFlavour', state.meatFlavour);
  formData.set('meatTexture', state.meatTexture);
  formData.set('meatSucculence', state.meatSucculence);
  formData.set('meatVolume', state.meatVolume);
  formData.set('bunRating', state.bunRating);
  formData.set('toppingRating', state.toppingRating);
  formData.set('sideRating', state.sideRating);
  formData.set('lat', state.lat);
  formData.set('long', state.long);
  const config = {
    headers: {
      'content-type': 'multipart/form-data',
    },
  };
  return post(url, formData, config);
};

const getTopBurgers = async () => {
  let topBurgers = await fetch('http://localhost/api/top/10');
  topBurgers = await topBurgers.json();
  return topBurgers;
};

export default class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      dateEaten: moment(),
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeRadio = this.onChangeRadio.bind(this);
    this.getPosition = this.getPosition.bind(this);
    this.getRadioGroup = this.getRadioGroup.bind(this);
  }
  static async getInitialProps({ query }) {
    const topBurgers = await getTopBurgers();
    return {
      topBurgers,
    };
  }

  getRadioGroup(label, name) {
    const radioRows = [];

    for (let i = 1; i <= 10; i++) {
      radioRows.push(
        <label htmlFor={i}>
          <input
            type="radio"
            key={name + i}
            id={name + i + 'label'}
            label={i}
            name={name}
            value={i}
            onChange={this.onChangeRadio}
          />
          {i}
        </label>
      );
    }
    const radioGroup = [];
    radioGroup.push(
      <div>
        {label}
        <radiogroup>{radioRows}</radiogroup>
      </div>
    );
    return radioGroup;
  }

  onFileChange(e) {
    this.setState({ file: e.target.files[0] });
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onChangeRadio(event) {
    console.log(event.target);
    this.setState({ [event.target.name]: event.target.value });
  }

  onChangeDate(date) {
    this.setState({ dateEaten: date });
  }

  async onFormSubmit(e) {
    e.preventDefault(); // Stop form submit
    const burgerIcon = await resizeImage(this.state.file, 256);
    const burgerImage = await resizeImage(this.state.file, 1500);

    return fileUpload(burgerIcon, burgerImage, this.state)
      .then((res) => {
        console.log('got', res);
        // add the burger to the list of burgers
      })
      .catch((err) => {
        console.log('err from post: ', err);
      });
  }

  getPosition(position) {
    console.log(typeof position.coords.latitude);
    this.setState({ lat: position.coords.latitude });
    this.setState({ long: position.coords.longitude });
  }

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.getPosition, (err) =>
        console.log(err)
      );
    }
  }

  render() {
    return (
      <Layout {...this.props}>
        <h1>Recent</h1>
        <form onSubmit={this.onFormSubmit}>
          <input type="file" name="burgerPhoto" onChange={this.onFileChange} />
          <label htmlFor="dateEaten">Date</label>
          <DatePicker
            name="dateEaten"
            selected={this.state.dateEaten}
            onChange={this.onChangeDate}
          />
          ;<label htmlFor="restaurantName">Restaurant Name</label>
          <input
            type="text"
            name="restaurantName"
            value={this.state.restaurantName || ''}
            onChange={this.onChange}
          />
          <label htmlFor="burgerName">Burger Name</label>
          <input
            type="text"
            name="burgerName"
            value={this.state.burgerName || ''}
            onChange={this.onChange}
          />
          <input
            id="lat"
            type="hidden"
            name="lat"
            value={this.state.lat || ''}
            onChange={this.onChange}
          />
          <input
            id="long"
            type="hidden"
            name="long"
            value={this.state.long || ''}
            onChange={this.onChange}
          />
          <label htmlFor="burgerNotes">Burger Notes</label>
          <textarea
            name="burgerNotes"
            value={this.state.burgerNotes || ''}
            onChange={this.onChange}
          />
          <div>
            {this.getRadioGroup('Meat Flavour', 'meatFlavour')}
            {this.getRadioGroup('Meat Texture', 'meatTexture')}
            {this.getRadioGroup('Meat Succulence', 'meatSucculence')}
            {this.getRadioGroup('Meat Ratio', 'meatVolume')}
            {this.getRadioGroup('Bun Rating', 'bunRating')}
            {this.getRadioGroup('Topping Rating', 'toppingRating')}
            {this.getRadioGroup('Side Rating', 'sideRating')}
          </div>
          <button type="submit">Upload</button>
        </form>
      </Layout>
    );
  }
}
