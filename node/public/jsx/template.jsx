
var React = require('react');
require('babel-register')({
  presets: [ 'react','es2015' ]
});

var MyNavBar = React.createFactory(require('./mynavbar'))
var BurgerItem = React.createFactory(require('./burgerlist'))


module.exports =  function Test({body, title, context }) {
  console.log(context)
  return (
    <html>
      <head>
        <title>{title}</title>
        <link rel="stylesheet" href="/assets/index.css" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.4.2/react.js" defer></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.4.2/react-dom.js" defer ></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/react-bootstrap/0.30.8/react-bootstrap.js" defer ></script>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css" />
        <script dangerouslySetInnerHTML={{
          __html: `window.__APP_STATE__=${JSON.stringify(context).replace(/</g, '\\u003c')};`,
        }} />
      </head>

      <body>

        <MyNavBar />
        {context.map((a,b) => {
          return <BurgerItem config={a}/>
        })}
        <div id="root">{body}</div>


      </body>

      <script src="/assets/bundle.js"></script>
    </html>
  );
};
