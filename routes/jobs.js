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
    JobFunctions.addJob(req.body.name, req.body.item, req.body.location, req.body.budget, req.body.time);

    JobFunctions.getAll(function(jobs){
      res.send({
        success : true,
        data : jobs
      });
    });
  })
  .put(function(req,res){
    JobFunctions.applyToJob(req.body.id, req.body.name, req.body.time, req.body.offer);

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

module.exports = router;