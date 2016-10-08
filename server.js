'use strict';
const express    = require('express'),
      bodyParser = require('body-parser'),
      app        = express(),
      PORT       = process.env.PORT || 3000
      ;

const jobs       = require('./routes/jobs'),
      payment    = require('./routes/payment'),
      couriers   = require('./routes/couriers')
      ;

app
  .use(bodyParser.urlencoded({extended: true}))
  .use(bodyParser.json())
  ;

app.use('/jobs', jobs)
   .use('/payment', payment)
   .use('/couriers', couriers)
   ;

app.use(express.static(__dirname + "/public"));

app.get('*', function(req, res){
  res.sendFile('./public/index.html',
    {
      root  : __dirname
    });
});

app.listen(PORT, function() {
  console.log("Server listening on port: 3000");
});