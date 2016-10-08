'use strict';

const express         = require('express'),
      router          = express.Router()
      ;

router.route('/')
  .get(function(req, res) {
    res.send({
      success : true
    });
  });

module.exports = router;