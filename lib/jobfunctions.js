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

  function addJob(name, item, address, budget, time){
    var id = getNextId;

    jobs.push({
      id : id,
      name : name,
      item : item,
      address : address,
      budget : budget,
      time : time
    });
  }

  return {
    getAll : getAll,
    addJob : addJob
  };
};

module.exports = ReviewFunctions();