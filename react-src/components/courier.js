import React from 'react';
import { browserHistory } from 'react-router';

const Add = React.createClass({
  getInitialState : function(){
    return {
      jobs : []
    }
  },
  componentDidMount : function(){
    var that = this;

    var xhttp = new XMLHttpRequest();
    xhttp.addEventListener("load", function(){
      var jobs = JSON.parse(this.response).data;
      that.setState({jobs : jobs});
    });
    xhttp.open("GET", "/jobs");
    xhttp.send();
  },
  render : function(){
    console.log('jobs', this.state.jobs);

    var allJobs = this.state.jobs.map(function(element){
      return (
        <div key={element.id}>
          <p>{element.name}</p>
          <p>{element.time}</p>
          <p>{element.budget}</p>
        </div>
      )
    });

    return (
      <div className="add">
        <h1>For Couriers</h1>
        <p>Find, travel, earn</p>
        {allJobs}
      </div>
    )
  }
});

module.exports = Add;