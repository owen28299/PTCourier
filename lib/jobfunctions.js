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
      status : "hiring",
      applicants : []
    });
  }

  function getJob(id, callback){
    var job = jobs.filter(function(element){
      if(id == element.id){
        return true;
      }
      else {
        return false;
      }
    });

    callback(job);
  }

  function applyToJob(id, name, offer, time) {
    jobs = jobs.map(function(element){
      if(id == element.id){

        var nextId = 0;
        element.applicants.forEach(function(applicant){
          if (applicant.id >= nextId){
            nextId = applicant.id + 1;
          }
        });

        element.applicants.push({
          id : nextId,
          name : name,
          offer : offer,
          time : time
        });

        return element;
      }
      else {
        return element;
      }
    });

    console.log('jobs', jobs);
  }

  return {
    getAll : getAll,
    addJob : addJob,
    getJob : getJob,
    applyToJob : applyToJob
  };
};

module.exports = ReviewFunctions();