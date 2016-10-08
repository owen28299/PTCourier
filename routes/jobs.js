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
  ;

module.exports = router;