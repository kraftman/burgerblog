
require('babel-register')({
  presets: [ 'react','es2015' ]
});

//import express from 'express';
var express = require('express')
var app = express()
var ReactDOMServer = require('react-dom/server')
var React = require('react'),
    DOM = React.DOM, div = DOM.div, button = DOM.button, ul = DOM.ul, li = DOM.li
//var myNavbar = require('./public/jsx/mynavbar')
var newApp = React.createElement(require('./public/jsx/mynavbar'))
//var testDiv = React.createFactory('div')
//var myNavBar = React.createFactory(require('./public/jsx/mynavbar'));
// require("babel-core").transform("code", {
//   plugins: ["transform-react-jsx"]
// });

app.use(express.static('/web'))

app.get('/', function (req, res) {
  res.send('Hello World!')
})
app.get('/client', function(req, res){
  res.sendFile('/web/html/index.html')
})
app.get('/server', function(req, res){
  var test = `  <!DOCTYPE html>
    <html>
      <head>
        <title>burgerblog</title>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
      </head>
      <body>
        <div id="root">`
  test += ReactDOMServer.renderToString(newApp)
  test += `</div>
</body>

<script src="/assets/bundle.js"></script>
</html>
`
  res.send(test);
})

app.listen(80, function () {
  console.log('Example app listening on port 3000!')
})
