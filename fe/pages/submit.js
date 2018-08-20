import Layout from '../components/MyLayout.js';
import fetch from 'isomorphic-unfetch';
import { post } from 'axios';
import React from 'react';

const fileUpload = (data, restaurantName) => {
  const url = 'http://localhost/api/upload';
  const formData = new FormData();
  console.log(data, restaurantName);
  formData.set('icon', data);
  formData.set('image', data);
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
    console.log('event:', event.target);
    console.log('event: ', event.target.value);
    this.setState({ [event.target.name]: event.target.value });
  }

  onFormSubmit(e) {
    e.preventDefault(); // Stop form submit
    console.log('fileupload: ', this.state.file, this.state.restaurantName);
    return fileUpload(this.state.file, this.state.restaurantName)
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
          <input
            type="date"
            name="dateEaten"
            value=""
            onChange={this.onChange}
          />

          <label htmlFor="restaurantName">Restaurant Name</label>
          <input
            type="text"
            name="restaurantName"
            value={this.state.restaurantName || ''}
            onChange={this.onChange}
          />

          <label htmlFor="burgerName">Burger Name</label>
          <input type="text" name="burgerName" value="" />

          <input id="lat" type="hidden" name="lat" value="" />
          <input id="long" type="hidden" name="long" value="" />

          <label htmlFor="burgerNotes">Burger Notes</label>
          <textarea name="burgerNotes" />

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
