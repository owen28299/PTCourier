'use strict';

const express       = require('express'),
      router        = express.Router(),
      CourierFunctions  = require('../lib/courierfunctions')
      ;

router.route('/')
  .get(function(req, res) {
    CourierFunctions.getAll(function(couriers){
      res.send({
        success : true,
        data : couriers
      });
    });
  });

router.route('/:id')
  .get(function(req,res){
    CourierFunctions.getCourier(req.params.id, function(courier){
      res.send({
        success : true,
        data : courier
      });
    });
  });



module.exports = router;