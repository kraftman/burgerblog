import Layout from '../components/MyLayout.js';
import fetch from 'isomorphic-unfetch';
import { post } from 'axios';
import React from 'react';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import css from '../sass/sitestyle.scss';
import md5 from 'md5';

const getTopBurgers = async () => {
  let topBurgers = await fetch('http://localhost/api/top/10');
  topBurgers = await topBurgers.json();
  return topBurgers;
};

export default class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onFormChange = this.onFormChange.bind(this);
  }
  static async getInitialProps({ query }) {
    const topBurgers = await getTopBurgers();
    return {
      topBurgers,
    };
  }

  async onFormSubmit(e) {
    e.preventDefault(); // Stop form submit
    const username = this.state.username;
    const password = md5(this.state.password + 'salty28$*@!38729837fe&eeesh');
    const url = 'http://localhost/api/login';

    const formData = new FormData();
    formData.set('username', username);
    formData.set('password', password);
    console.log(username, password);

    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };

    return post(url, formData, config).then((res) => {
      console.log(res);
      if (res.status !== 200) {
        return Promise.reject(new Error('unauthorised'));
      }
      this.cookie.set('token', res.data.token);
    });
  }

  componentDidMount() {
    if (window) {
      this.cookie = require('cookies-js');
    }
  }

  onFormChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    return (
      <Layout {...this.props}>
        <form onSubmit={this.onFormSubmit}>
          <p>
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.onFormChange}
            />
          </p>
          <p>
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.onFormChange}
            />
          </p>
          <p className={css.submit}>
            <input type="submit" name="commit" value="Login" />
          </p>
        </form>
      </Layout>
    );
  }
}
