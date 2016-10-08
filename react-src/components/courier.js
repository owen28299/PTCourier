import React from 'react';
import { browserHistory } from 'react-router';

const ViewJobs = require('./viewjobs');
const MyJobs = require('./courierjobview');

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

      default:
        view = <ViewJobs />;
    }

    return (
      <div className="add">
        <h1>Welcome, Jimmy!</h1>
        <div className="couriernav">
          <a onClick={this.setView.bind(this,"jobslist")}>Jobs List</a>
          <a onClick={this.setView.bind(this,"myjobs")}>My Jobs</a>
        </div>
        {view}
      </div>
    )
  }
});

module.exports = Add;