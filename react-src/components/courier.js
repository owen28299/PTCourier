import React from 'react';
import { browserHistory } from 'react-router';

const ViewJobs = require('./viewjobs');
const MyJobs = require('./courierjobview');
const Account = require('./courierpayment');
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

        case "account":
            view = <Account />;
            break;

      default:
        view = <ViewJobs />;
    }

    var courierId = session.courierid;

    var courierEntity = JobFunctions.getCourier(courierId);

    return (
      <div className="add">
        <div className="subnav">
            <div className="container">
                <div className="col-sm-8">
                    <h5>Welcome, {courierEntity.name}!</h5>
                </div>
                <div className="col-sm-4">
                    <a onClick={this.setView.bind(this,"jobslist")}>Jobs List</a>
                    <a onClick={this.setView.bind(this,"myjobs")}>My Jobs</a>
                    <a onClick={this.setView.bind(this,"account")}>My Account</a>
                </div>
            </div>

        </div>
          <div className="view">
              <div className="container">
              {view}
              </div>
          </div>
      </div>
    )
  }
});

module.exports = Add;