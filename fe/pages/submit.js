import Layout from '../components/MyLayout.js';
import fetch from 'isomorphic-unfetch';
import { post } from 'axios';
import React from 'react';
import imageTools from '../utils/imagetools';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

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
const fileUpload = (burgerIcon, burgerImage, restaurantName) => {
  const url = 'http://localhost/api/upload';
  const formData = new FormData();
  formData.set('icon', burgerIcon);
  formData.set('image', burgerImage);
  formData.set('restaurantName', restaurantName);
  const config = {
    headers: {
      'content-type': 'multipart/form-data',
    },
  };
  return post(url, formData, config);
};

const getRadioGroup = (label, name) => {
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
      restaurantName: 'srtrst',
      ateDate: moment(),
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  static async getInitialProps({ query }) {
    const topBurgers = await getTopBurgers();
    return {
      topBurgers,
    };
  }

  onFileChange(e) {
    console.log('adding file: ', e.target.files[0]);
    this.setState({ file: e.target.files[0] });
  }

  onChange(event) {
    console.log('event: ', event.target.value);
    this.setState({ [event.target.name]: event.target.value });
  }

  async onFormSubmit(e) {
    e.preventDefault(); // Stop form submit
    console.log('fileupload: ', this.state.file, this.state.restaurantName);
    const burgerIcon = await resizeImage(this.state.file, 256);
    const burgerImage = await resizeImage(this.state.file, 1500);
    return fileUpload(burgerIcon, burgerImage, this.state.restaurantName)
      .then((res) => {
        console.log('got', res);
      })
      .catch((err) => {
        console.log('err from post: ', err);
      });
  }

  render() {
    return (
      <Layout {...this.props}>
        <h1>Recent</h1>
        <form onSubmit={this.onFormSubmit}>
          <input type="file" name="burgerPhoto" onChange={this.onFileChange} />
          <label htmlFor="dateEaten">Date</label>
          <DatePicker selected={this.state.ateDate} onChange={this.onChange} />;
          <label htmlFor="restaurantName">Restaurant Name</label>
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
            {getRadioGroup('Meat Flavour', 'meatflavour')}
            {getRadioGroup('Meat Texture', 'meatTexture')}
            {getRadioGroup('Meat Succulence', 'meatSucculence')}
            {getRadioGroup('Meat Ratio', 'meatRatio')}
            {getRadioGroup('Bun Rating', 'bunRating')}
            {getRadioGroup('Topping Rating', 'toppingRating')}
            {getRadioGroup('Side Rating', 'sideRating')}
          </div>
          <button type="submit">Upload</button>
        </form>
      </Layout>
    );
  }
}
