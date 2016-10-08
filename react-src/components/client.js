import React from 'react';
import { browserHistory } from 'react-router';

const Get = React.createClass({
  getInitialState : function(){
    return {
      client : "",
      item : "",
      item_location : "",
      delivery_location : "",
      time : "",
      budget : "",
        item_location_geocode : null,
    }
  },
  handleChange : function(field, event){
    var nextState = {};
    nextState[field] = event.target.value;

    this.setState(nextState);
  },
  handleSubmit : function(){
    var that = this;
      this.state.item_location_geocode = document.getElementById('item_location_geocode').value;

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
        <input id="item_location"
          type="text"
          value={this.state.item_location}
          onChange={this.handleChange.bind(this, "item_location")}
        />
        <input id="geocode_item_location" type="button" value="Geocode" />
        <div id="map"></div>
          <input type="hidden" id="item_location_geocode" />
        <p>Delivery Location</p>
        <input
          type="text"
          value={this.state.delivery_location}
          onChange={this.handleChange.bind(this, "delivery_location")}
        />
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

module.exports = Get;