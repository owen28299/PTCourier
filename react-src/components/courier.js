import React from 'react';
import { browserHistory } from 'react-router';

const ViewJobs = require('./viewjobs');
const MyJobs = require('./courierjobview');
const Account = require('./courierpayment');

const Add = React.createClass({
  getInitialState : function(){
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

    return (
      <div className="add">
        <div className="subnav">
            <div className="container">
                <div className="col-sm-8">
                    <h5>Welcome, Jimmy!</h5>
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