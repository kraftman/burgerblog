import Layout from '../components/MyLayout.js';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';

const onChange = e => {
    this.setState({file:e.target.files[0]})
}

const onFormSubmit = (e) => {
e.preventDefault() // Stop form submit
this.fileUpload(this.state.file).then((response)=>{
    console.log(response.data);
})
}

const radioRows = []

for(let i = 1; i <= 10; i++) {
    radioRows.push(<input type="radio" key="{i}" id="{i}" label="{i}"/>)
}

const Index = (props) => (
  <Layout {...props}>
    <h1>Recent</h1>
    {/* big map
      file upload
      Date picker
      restaurant name
      burger name
      burger notes
      meat flavour
      meat texture
      meat succulence
      meat volume
      bun rating
      topping rating
      side rating
    */}
    <form onSubmit={this.onFormSubmit}>
        <input type="file" onChange={this.onChange} />
        <radiogroup>
            {radioRows}
        </radiogroup>
        <button type="submit">Upload</button>
    </form>
  </Layout>
);

const getTopBurgers = async () => {
  let topBurgers = await fetch('http://localhost/api/top/10');
  topBurgers = await topBurgers.json();
  return topBurgers;
};


Index.getInitialProps = async function({ pathname, query }) {
  const topBurgers = await getTopBurgers();
  console.log(query);
  return {
    topBurgers,
  };
};

export default Index;
