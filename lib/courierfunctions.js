'use strict';
var couriers = require('../database/jobs').couriers;

const courierFunctions = function(){

  function getAll(callback){
    callback(couriers);
  }

  function getCourier(id, callback){
    var courier = couriers.filter(function(element){
      if(element.id == couriers.id){
        return true;
      }
      else {
        return false;
      }
    });

    callback(courier);
  }

  return {
    getAll : getAll,
    getCourier : getCourier
  };
};

module.exports = courierFunctions();