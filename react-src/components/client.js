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
        <button>Submit</button>
      </div>
    )
  }
});

module.exports = Get;