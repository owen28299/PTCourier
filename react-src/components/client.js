import React from 'react';
import { browserHistory } from 'react-router';

const Get = React.createClass({
  getInitialState : function(){
    return {
      name : "",
      item : "",
      location : "",
      time : "",
      budget : ""
    }
  },
  handleChange : function(field, event){
    var nextState = {};
    nextState[field] = event.target.value;

    this.setState(nextState);
  },
  handleSubmit : function(){
    var that = this;

    var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
    xmlhttp.open("POST", "/jobs");
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send(JSON.stringify(that.state));

    browserHistory.push("/courier");
  },
  render : function(){
    return (
      <div className="get">
        <h1>Client</h1>
        <p>Instant delivery at your fingertips</p>
        <h2>Post a Job</h2>
        <p>Name</p>
        <input
          type="text"
          onChange={this.handleChange.bind(this, "name")}
        />
        <p>Item</p>
        <input
          type="text"
          onChange={this.handleChange.bind(this, "item")}
        />
        <p>Location</p>
        <input
          type="text"
          onChange={this.handleChange.bind(this, "location")}
        />
        <p>Time Limit</p>
        <input
          type="text"
          onChange={this.handleChange.bind(this, "time")}
        />
        <p>Budget</p>
        <input
          type="text"
          onChange={this.handleChange.bind(this, "budget")}
        />
        <br />
        <button onClick={this.handleSubmit}>Submit</button>
      </div>
    )
  }
});

module.exports = Get;