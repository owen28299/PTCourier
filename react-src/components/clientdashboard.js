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
          <div className="app-list" key={applicant.id}>
            <div className="row">
                <div className="col-md-3">
                    <p><b>Applicant Name: </b>{applicant.name}</p>
                </div>
                <div className="col-md-3">
                    <p><b>Offer: </b>{applicant.offer}</p>
                </div>
                <div className="col-md-3">
                    <p><b>Estimated Time: </b>{applicant.time}</p>
                </div>
                <div className="col-md-3">
                    <button
                        data-appid={applicant.id}
                        data-jobid={element.id}
                        onClick={that.handleAccept}>
                        Accept Applicant
                    </button>
                </div>
            </div>
          </div>
        )
      });

      return (
        <div key={element.id}>
            <div className="row">
                <div className="col-md-3">
                    <p><b>Name:</b> {element.client}</p>
                    <p><b>Delivery Location:</b> {element.delivery_location}</p>
                </div>
                <div className="col-md-3">
                    <p><b>Product:</b> {element.item}</p>
                    <p><b>Product Location:</b> {element.item_location}</p>

                </div>
                <div className="col-md-3">
                    <p><b>Time Frame:</b> {element.time}</p>
                    <p><b>Budget:</b> {element.budget}</p>
                </div>
                <div className="col-md-3">
                    <p><b>Time Frame:</b> {element.time}</p>
                    <p><b>Budget:</b> {element.budget}</p>
                </div>
            </div>
            <div>
                <p>{element.courier ? element.courier[0].name : null}</p>
          {applicants}
          {element.courier ? <button onClick={that.handleChangeView}>View Job Progress</button> : null}
            </div>
        </div>
      )
    });

    return (
      <div className="clientdashboard list-view">
        <h1>Welcome, Mark!</h1>
          <h3 className="sub-heading" >Dashboard</h3>
          <div className="list">
              {allJobs}
          </div>
      </div>
    )
  }
});

module.exports = Dashboard;