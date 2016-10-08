import React from 'react';

const Dashboard = React.createClass({
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
    var allJobs = this.state.jobs.map(function(element){
      var applicants = element.applicants.map(function(applicant){
        return (
          <div key={applicant.id}>
            <p>{applicant.name}</p>
            <p>{applicant.offer}</p>
            <p>{applicant.time}</p>
            <button>Accept Applicant</button>
          </div>
        )
      })

      return (
        <div key={element.id}>
          <p>{element.name}</p>
          <p>{element.item}</p>
          <p>{element.item_location}</p>
          <p>{element.delivery_location}</p>
          <p>{element.time}</p>
          <p>{element.budget}</p>
          {applicants}
        </div>
      )
    });

    return (
      <div className="clientdashboard">
        <h1>Client Dashboard</h1>
        {allJobs}
      </div>
    )
  }
});

module.exports = Dashboard;