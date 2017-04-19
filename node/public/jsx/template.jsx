
var React = require('react');
require('babel-register')({
  presets: [ 'react','es2015' ]
});

var newApp = React.createElement(require('./mynavbar'))


function Test(props){
  return <h1> Test </h1>;
}

module.exports =  function test({body, title, context }) {
  return (
    <html>
      <head>
        <title>{title}</title>
        <link rel="stylesheet" href="/assets/index.css" />
        <script dangerouslySetInnerHTML={{
          __html: `window.__APP_STATE__=${JSON.stringify(context).replace(/</g, '\\u003c')};`,
        }} />
      </head>

      <body>
        <newApp />
        <Test />
        <div id="root">{body}</div>
      </body>

      <script src="/assets/bundle.js"></script>
    </html>
  );
};
