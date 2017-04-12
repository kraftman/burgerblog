
/*jshint esversion: 6 */


console.log('started!');

var AWS = require('aws-sdk');
var email = require('emailjs')


var s3 = new AWS.S3();
var myBucket = 'testiesddd';
var myKey = 'test';

var express = require('express');
var passwordless = require('passwordless');
var redisStore = require('passwordless-redisstore');
var cookieSession = require('cookie-session');
const uuidV4 = require('uuid/v4');

var bodyParser = require('body-parser');

var Redis = require('ioredis');
var red = new Redis('redis');


var app = express();


app.use(cookieSession({
  name: 'session',
  keys: ['mysecretkey'],

  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))


app.use(passwordless.sessionSupport());
passwordless.init(new redisStore(6379,'redis'),{skipForceSessionSave:true});



app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.static('public'));
app.set('view engine', 'pug');




app.use(passwordless.acceptToken({ successRedirect: '/success'}));


passwordless.addDelivery(
    function(tokenToSend, uidToSend, recipient, callback) {
        var host = 'localhost:80';
        smtpServer.send({
            text:    'Hello!\nAccess your account here: http://'
            + host + '?token=' + tokenToSend + '&uid='
            + encodeURIComponent(uidToSend),
            from:    'me@itschr.is',
            to:      recipient,
            subject: 'Token for ' + host
        }, function(err, message) {
            if(err) {
                console.log(err);
            }
            callback(err);
        });
});



app.get('/test.html', function (req, res) {
  s3.getObject({Bucket: 'tannertest', Key: 'test.txt' }, function(err,data){

    if (err) {
      console.log(err, err.stack);
      res.send('');
    } else {
      res.type('text/html')
      res.send(data.Body);           // successful response
    }
  });
});

app.listen(80, function () {
  console.log('Example app listening on port 80!');
});

app.get('/', function(req,res){
  res.render('index', { title: 'Hey', message: 'Hello there!', req: req })
  // if (req.user){
  //   res.send('you are logged in, ID:  '+req.user);
  // } else {
  //   res.send('you are not logged in');
  // }
});

app.get('/success', function(req,res){
  res.send('successfully logged in!');
})

app.get('/logout', passwordless.logout(),
    function(req, res) {
        res.redirect('/');
});

app.get('/admin', passwordless.restricted(),
    function(req, res) {
        res.send(req.user );
});


var smtpServer = email.server.connect({
              user: 'me@itschr.is',
              password: process.env.GMAIL_OTP,
              host: 'smtp.gmail.com',
              ssl: true,
            });






//var router = express.Router();
app.get('/login', function(req, res) {
   res.send(`<html>
       <body>
           <h1>Login</h1>
           <form action="/sendtoken" method="POST">
               Email:
               <br><input name="user" type="text">
               <br><input type="submit" value="Login">
           </form>
       </body>
   </html>
`);
});



var users = [
    { id: 1, email: 'me@itschr.is' },
    { id: 2, email: 'alice@example.com' }
];


function GetUser(user, delivery, callback, req){
  red.get('email:'+user).then(res =>{
    //if they don't exist, create them
    if (res) {
      console.log(res);
      callback(null, res);
    } else {
      var uuid = uuidV4();
      red.set('email:'+user, uuid)
      .then(red.hset('user:'+uuid, email, user));
      callback(null,uuid);
    }
  })
  .catch(e => {
    console.log('error getting from redis: ',e);
    callback(null,null);
  });
}

app.post('/sendtoken',
  passwordless.requestToken(GetUser),
  function(req, res) {
    res.send('sent');
    //res.render('sent');
  }
);




//
// server.send({
//
//   from: 'chris <me@itschr.is>', // sender address
//   to: 'me <me@itschr.is>',// list of receivers
//   cc: '',
//   subject: 'your subject', // Subject line
//   text: 'contant', // html body
//
// }, function (err, message) {
//
//   if(err){
//    console.log(err)
//   }else{
//    console.log("email sent")
//   }
// });



//
// s3.createBucket({Bucket: myBucket}, function(err, data) {
//
//   if (err) {
//     console.log(err);
//   } else {
//     params = {Bucket: myBucket, Key: myKey, Body: 'Hello!'};
//     s3.putObject(params, function(err, data) {
//
//       if (err) {
//         console.log(err);
//       } else {
//         console.log("Successfully uploaded data to myBucket/myKey");
//       }
//     });
//   }
// });
