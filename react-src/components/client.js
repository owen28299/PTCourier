import React from 'react';
import { browserHistory, Link } from 'react-router';

const PostJob = require('./postjob');
const DashBoard = require('./clientdashboard');
const JobView = require('./clientjobview');
const Account = require('./payment');

const Get = React.createClass({
  getInitialState : function(){
    return {
      view : "dashboard"
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
      case "home":
        view = <PostJob />
        break;

      case "dashboard":
        view = <DashBoard setView={this.setView}/>
        break;

      case "jobview":
        view = <JobView />
        break;

        case "account":
            view = <Account />
            break;

      default:
        view = <PostJob />
    }

      return (
      <div className="get">
        <div className="subnav">
            <div className="container">
                <div className="col-sm-6">
                    <h5>Welcome, Mark!</h5>
                </div>
                <div className="col-sm-6">
                    <a onClick={this.setView.bind(this,"dashboard")}>View DashBoard</a>
                    <a onClick={this.setView.bind(this,"postjob")}>Post Job</a>
                    <a onClick={this.setView.bind(this,"jobview")}>Jobs in Progress</a>
                    <a onClick={this.setView.bind(this,"account")}>Your Account</a>
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

module.exports = Get;