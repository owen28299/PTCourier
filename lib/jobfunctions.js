'use strict';
var jobs = require('../database/jobs').jobs;

const ReviewFunctions = function(){
  function getNextId(){
    var highest = 0;

    jobs.forEach(function(element){
      if(element.id >= highest){
        highest = element.id + 1;
      }
    });

    return highest;
  }

  function getAll(callback){
    callback(jobs);
  }

  function addJob(client, item, item_location, delivery_location, budget, time){
    var id = getNextId;

    jobs.push({
      id : id,
      client : client,
      item : item,
      item_location : item_location,
      delivery_location : delivery_location,
      budget : budget,
      time : time,
      applicants : []
    });
  }

  return {
    getAll : getAll,
    addJob : addJob
  };
};

module.exports = ReviewFunctions();