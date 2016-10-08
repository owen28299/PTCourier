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
  });

module.exports = router;