import React from 'react';
import { browserHistory } from 'react-router';

const Map  = require('./partials/map');

const PostJob = React.createClass({
  getInitialState : function(){
    return {
      client : "",
      item : "",
      item_location : "",
      delivery_location : "",
      time : "",
      budget : "",
      item_location_geocode : null,
      delivery_location_geocode : null
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
  updateState: function(key, value) {
    var nextState = {};
    nextState[key] = value;
    this.setState(nextState);
  },
  render : function(){
    var map = <Map />
    return (
      <div className="get">
        <h1>Welcome, Mark!</h1>
        <p>Instant delivery at your fingertips</p>
        <h2>Post a Job</h2>
        <p>Name</p>
        <input
          type="text"
          value={this.state.client}
          onChange={this.handleChange.bind(this, "client")}
        />
        <p>Item</p>
        <input
          type="text"
          value={this.state.item}
          onChange={this.handleChange.bind(this, "item")}
        />

        <p>Item Location</p>
        <Map ref={(map) => { this._child = map; }} updateState={this.updateState} position="item_location_geocode" address="item_location" />

        <p>Delivery Location</p>
        <Map ref={(map) => { this._child = map; }} updateState={this.updateState} position="delivery_location_geocode" address="delivery_location" />

        <p>Time Limit</p>
        <input
          type="text"
          value={this.state.time}
          onChange={this.handleChange.bind(this, "time")}
        />
        <p>Budget</p>
        <input
          type="text"
          value={this.state.budget}
          onChange={this.handleChange.bind(this, "budget")}
        />
        <br />
        <button onClick={this.handleSubmit}>Submit</button>
      </div>
    )
  }
});

module.exports = PostJob;