'use strict';

const express       = require('express'),
      router        = express.Router(),
      JobFunctions  = require('../lib/jobfunctions')
      ;

router.route('/')
  .get(function(req, res) {
    JobFunctions.getAll(function(jobs){
      res.send({
        success : true,
        data : jobs
      });
    });
  })
  .post(function(req,res) {
    JobFunctions.addJob(req.body.client, req.body.item, req.body.item_location, req.body.item_location_geocode, req.body.delivery_location, req.body.delivery_location_geocode, req.body.budget, req.body.time);

    JobFunctions.getAll(function(jobs){
      res.send({
        success : true,
        data : jobs
      });
    });
  })
  .put(function(req,res){
    JobFunctions.applyToJob(req.body.id, req.body.name, req.body.offer, req.body.time);

    res.send({
      success : true,
     });
  });

router.route('/:id')
  .get(function(req,res){
    JobFunctions.getJob(req.params.id, function(job){
      res.send({
        success : true,
        data : job
      });
    });
  });

router.route('/accept')
  .post(function(req,res){
    JobFunctions.acceptApplicant(req.body.jobid, req.body.appid);

    JobFunctions.getAll(function(jobs){
      res.send({
        success : true,
        data : jobs
      });
    });

  });

module.exports = router;