import React from 'react';
import { browserHistory } from 'react-router';

const ViewJobs = require('./viewjobs');
const MyJobs = require('./courierjobview');
var session = require('client-sessions');
const JobFunctions  = require('../../lib/jobfunctions');

const Add = React.createClass({
  getInitialState : function(){
    if(this.props.params != null) {
      var id = this.props.params.id;
      session.courierid = id;
    }
    return {
      view : "jobslist"
    }
  },
  setView : function(view){
    this.setState({
      view : view
    })
  },
  render : function(){
    var view = null;

    switch(this.state.view){
      case "jobslist":
        view = <ViewJobs />;
        break;

      case "myjobs":
        view = <MyJobs />;
        break;

      default:
        view = <ViewJobs />;
    }

    var courierId = session.courierid;

    var courierEntity = JobFunctions.getCourier(courierId);

    return (
      <div className="add">
        <div className="subnav">
          <a onClick={this.setView.bind(this,"jobslist")}>Jobs List</a>
          <a onClick={this.setView.bind(this,"myjobs")}>My Jobs</a>
        </div>
          <div className="view">
              <div className="container">
                  <h1>Welcome, {courierEntity.name}!</h1>
              {view}
              </div>
          </div>
      </div>
    )
  }
});

module.exports = Add;