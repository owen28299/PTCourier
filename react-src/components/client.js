import React from 'react';
import { browserHistory, Link } from 'react-router';

const PostJob = require('./postjob');
const DashBoard = require('./clientdashboard');

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
        view = <DashBoard />
        break;

      default:
        view = <PostJob />
    }

    return (
      <div className="get">
        <div className="couriernav">
          <a onClick={this.setView.bind(this,"dashboard")}>View DashBoard</a>
          <a onClick={this.setView.bind(this,"postjob")}>Post Job</a>
        </div>
        {view}
      </div>
    )
  }
});

module.exports = Get;