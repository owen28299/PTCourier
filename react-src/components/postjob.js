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
    return (
      <div className="postjob">
          <h3 className="sub-heading">post a job</h3>
          <div className="form">
              <label>Name</label>
              <input
                  type="text"
                  value={this.state.client}
                  onChange={this.handleChange.bind(this, "client")}
                  placeholder="..."
              />
              <label>Item</label>
              <input
                  type="text"
                  value={this.state.item}
                  onChange={this.handleChange.bind(this, "item")}
                  placeholder="..."
              />

              <label>Item Location</label>
              <Map ref={(map) => { this._child = map; }} updateState={this.updateState} position="item_location_geocode" address="item_location" />

              <label>Delivery Location</label>
              <Map ref={(map) => { this._child = map; }} updateState={this.updateState} position="delivery_location_geocode" address="delivery_location" />

              <label>Time Limit</label>
              <input
                  type="text"
                  value={this.state.time}
                  onChange={this.handleChange.bind(this, "time")}
                  placeholder="..."
              />
              <label>Budget</label>
              <input
                  type="text"
                  value={this.state.budget}
                  onChange={this.handleChange.bind(this, "budget")}
                  placeholder="..."
              />
              <br />
              <button onClick={this.handleSubmit}>Submit</button>
          </div>
      </div>
    )
  }
});

module.exports = PostJob;