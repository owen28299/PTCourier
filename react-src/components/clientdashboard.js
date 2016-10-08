import React from 'react';
import { browserHistory } from 'react-router';

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
  handleAccept : function(event){
    var that = this;

    var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
    xmlhttp.addEventListener("load", function(){
      var jobs = JSON.parse(this.response).data;
      that.setState({jobs : jobs});
    });

    xmlhttp.open("POST", "/jobs/accept");
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send(JSON.stringify({
      appid : event.target.dataset.appid,
      jobid : event.target.dataset.jobid
    }));

  },
  handleChangeView : function(){
    this.props.setView("jobview");
  },
  render : function(){
    var that = this;

    var allJobs = this.state.jobs.map(function(element){
      var applicants = element.applicants.map(function(applicant){
        return (
          <div key={applicant.id}>
            <p>{applicant.name}</p>
            <p>{applicant.offer}</p>
            <p>{applicant.time}</p>
            <button
              data-appid={applicant.id}
              data-jobid={element.id}
              onClick={that.handleAccept}
            >
              Accept Applicant
            </button>
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
          <p>{element.courier ? element.courier[0].name : null}</p>
          {applicants}
          {element.courier ? <button onClick={that.handleChangeView}>View Job Progress</button> : null}
        </div>
      )
    });

    return (
      <div className="clientdashboard">
        <h1>Welcome, Mark!</h1>
        <h2>Dashboard</h2>
        {allJobs}
      </div>
    )
  }
});

module.exports = Dashboard;