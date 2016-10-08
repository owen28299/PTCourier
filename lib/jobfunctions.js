'use strict';

const ReviewFunctions = function(){
  var jobs = [
    {
      id : 0,
      name : "Max Power",
      budget : 20,
      time : 3.5
    },
    {
      id : 1,
      name : "Jimmy Beckett",
      budget : 35,
      time : 3
    },
    {
      id : 2,
      name : "Timmy Smith",
      budget : 50,
      time : 4
    }
  ];

  function getAll(callback){
    callback(jobs);
  }

  return {
    getAll : getAll
  };
};

module.exports = ReviewFunctions();