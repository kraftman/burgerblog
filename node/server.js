var express = require('express')
var app = express()
var ReactDOMServer = require('react-dom/server')
require("babel-register");
var React = require('react');
var myNavBar = React.createFactory(require('./public/jsx/mynavbar.jsx'));

app.use(express.static('/web'))

app.get('/', function (req, res) {
  res.send('Hello World!')
})
app.get('/client', function(req, res){
  res.sendFile('/web/html/index.html')
})
app.get('/server', function(req, res){

})

app.listen(80, function () {
  console.log('Example app listening on port 3000!')
})
