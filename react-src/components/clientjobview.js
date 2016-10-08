import React from 'react';
import { browserHistory } from 'react-router';

const ClientJobView = React.createClass({
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
    var that = this;

    var myJobs = this.state.jobs.filter(function(element){
      if(element.client === "Mark Smith" && element.status !== "hiring"){
        return true;
      }
      else {
        return false;
      }
    })

    var allJobs = myJobs.map(function(element){
      return (
        <div key={element.id}>
          <p>{element.client}</p>
          <p>{element.item}</p>
          <p>{element.item_location}</p>
          <p>{element.delivery_location}</p>
          <p>{element.time}</p>
          <p>{element.budget}</p>
          <button>Mark Item Received</button>
        </div>
      )
    });

    return (
      <div className="add">
        <h2>My Deliveries</h2>
        {allJobs}
      </div>
    )
  }
});

module.exports = ClientJobView;