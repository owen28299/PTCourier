import React from 'react';
import { browserHistory } from 'react-router';

const Application = React.createClass({
  getInitialState : function(){
    return {
      job : [],
      offer : 0,
      time : 0
    }
  },
  componentDidMount : function(){
    var that = this;

    var xhttp = new XMLHttpRequest();
    xhttp.addEventListener("load", function(){
      var job = JSON.parse(this.response).data;
      that.setState({job : job});
    });
    xhttp.open("GET", "/jobs/" + this.props.params.id);
    xhttp.send();
  },
  handleChange : function(field, event){
    var nextState = {};
    nextState[field] = event.target.value;

    this.setState(nextState);
  },
  handleSubmit : function(){
    var that = this;

    var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
    xmlhttp.open("PUT", "/jobs");
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send(JSON.stringify({
      offer : that.state.offer,
      time : that.state.time,
      id : that.props.params.id,
      name : "Jimmy McGrath"
    }));
    browserHistory.push("/courier");
  },
  render : function(){
    var jobdetails = this.state.job.map(function(element){
      return (
        <div key={element.id}>
          <p>Client : {element.client}</p>
          <p>Item : {element.item}</p>
          <p>Item Location : {element.item_location}</p>
          <p>Delivery Location : {element.delivery_location}</p>
          <p>Budget : {element.budget}</p>
          <p>Time Limit (hours) : {element.time}</p>
        </div>
      )
    });

    return (
      <div className="courier-application">
        <h1>Apply to job</h1>
        {jobdetails}
        <h1>~~~Show Map with options here~~~</h1>
        <p>Proposed Delivery Time (hours)</p>
        <input
          type="text"
          onChange={this.handleChange.bind(this,"time")}
          value={this.state.time}
        />
        <p>Offer ($)</p>
        <input
          type="text"
          onChange={this.handleChange.bind(this,"offer")}
          value={this.state.offer}
        />
        <br />
        <button onClick={this.handleSubmit}>Make Offer</button>
      </div>
    )
  }
});

module.exports = Application;