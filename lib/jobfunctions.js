'use strict';
var jobs = require('../database/jobs').jobs;
var couriers = require('../database/jobs').couriers;

const JobFunctions = function(){
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

  function addJob(client, item, item_location, item_location_geocode, delivery_location, delivery_location_geocode, budget, time){
    var id = getNextId;

    jobs.push({
      id : id,
      client : client,
      item : item,
      item_location : item_location,
      item_location_geocode : item_location_geocode,
      delivery_location : delivery_location,
      delivery_location_geocode : delivery_location_geocode,
      budget : budget,
      time : time,
      status : "hiring",
      courier : null,
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

        var courierEntity = couriers.find(function(item) {
          return item.name == name;
        });

        element.applicants.push({
          id : nextId,
          name : name,
          offer : offer,
          time : time,
          offer_time_geocode : courierEntity.home_geocode
        });

        return element;
      }
      else {
        return element;
      }
    });
  }

  function acceptApplicant(jobid, appid){
    jobs = jobs.map(function(element){
      if(jobid == element.id){

        var applicant = element.applicants.filter(function(applicant){
          if(applicant.id == appid){
            return true;
          }
          else {
            return false;
          }
        });

        element.applicants = [];
        element.status = "hired";

        element.courier = applicant;

        return element;
      }
      else {
        return element;
      }
    });
  }

  return {
    getAll : getAll,
    addJob : addJob,
    getJob : getJob,
    applyToJob : applyToJob,
    acceptApplicant : acceptApplicant
  };
};

module.exports = JobFunctions();