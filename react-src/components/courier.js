import React from 'react';
import { browserHistory } from 'react-router';

const Add = React.createClass({
  getInitialState : function(){
    return {
      jobs : []
    }
  },
  apply : function(event){
    browserHistory.push("/apply/" + event.target.id)
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
    var that = this;

    var allJobs = this.state.jobs.map(function(element){
      if(element.status === "hiring"){
        return (
          <div key={element.id}>
            <p>{element.client}</p>
            <p>{element.item}</p>
            <p>{element.item_location}</p>
            <p>{element.delivery_location}</p>
            <p>{element.time}</p>
            <p>{element.budget}</p>
            <button id={element.id} onClick={that.apply}>Apply</button>
          </div>
        )
      }

    });

    return (
      <div className="add">
        <h1>For Couriers</h1>
        <h2>Currently listed jobs</h2>
        {allJobs}
      </div>
    )
  }
});

module.exports = Add;