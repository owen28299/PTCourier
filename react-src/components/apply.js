import React from 'react';
import { browserHistory, Link } from 'react-router';

const Application = React.createClass({
  getInitialState : function(){
    return {
      job : [],
      offer : 0,
      time : 0,
        courierId : 2,
        courier : {}
    }
  },
  componentDidMount : function(){
    var that = this;

      var courierRequest = new XMLHttpRequest();
      courierRequest.addEventListener("load", function(){
          var courier = JSON.parse(this.response).data;
          that.setState({courier : courier[0]});
      });
      courierRequest.open("GET", "/couriers/" + that.state.courierId);
      courierRequest.send();

    var jobsRequest = new XMLHttpRequest();
    jobsRequest.addEventListener("load", function(){
      var job = JSON.parse(this.response).data;
      that.setState({job : job});
    });
    jobsRequest.open("GET", "/jobs/" + this.props.params.id);
    jobsRequest.send();
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
      name : that.state.courier.name
    }));
    browserHistory.push("/courier");
  },
  render : function(){
    var that = this;
    var jobdetails = this.state.job.map(function(element){
        var plannerUrl = "http://54.206.123.83:10080/?module=planner&fromPlace="
            + element.item_location_geocode.latitude + "%2C" + element.item_location_geocode.longitude + "&toPlace="
            + element.delivery_location_geocode.latitude + "%2C" + element.delivery_location_geocode.longitude
            + "&time=9%3A19am&date=10-09-2016&mode=TRANSIT%2CWALK&maxWalkDistance=804.672&arriveBy=true&wheelchair=false&locale=en&startTransitStopId=4_19842&itinIndex=0";
        var courierToItemUrl = "http://54.206.123.83:10080/?module=planner&fromPlace="
            + that.state.courier.home_geocode.latitude + "%2C" + that.state.courier.home_geocode.longitude + "&toPlace="
            + element.item_location_geocode.latitude + "%2C" + element.item_location_geocode.longitude
            + "&time=9%3A19am&date=10-09-2016&mode=TRANSIT%2CWALK&maxWalkDistance=804.672&arriveBy=true&wheelchair=false&locale=en&startTransitStopId=4_19842&itinIndex=0";
      return (
        <div className="row" key={element.id}>
            <div className="col-md-6">
                <p>Client : {element.client}</p>
                <p>Item : {element.item}</p>
                <p>Item Location : {element.item_location}</p>
            </div>
            <div className="col-md-6">
                <p>Delivery Location : {element.delivery_location}</p>
                <p>Budget : {element.budget}</p>
                <p>Time Limit (hours) : {element.time}</p>
            </div>
            <div className="row">
                <h4 className="overlap-map">Getting to the goods</h4>
                <iframe className="map-iframe" src={courierToItemUrl}></iframe>
                <h4 className="overlap-map">Getting to the purchaser</h4>
                <iframe className="map-iframe" src={plannerUrl}></iframe>
            </div>
        </div>
      )
    });

    return (
      <div className="courier-application">
          <div className="subnav">
              <div className="container">
                  <div className="col-sm-10">
                      <h5>Welcome, {this.state.courier.name}!</h5>
                  </div>
                  <div className="col-sm-2">
                      <Link to="/courier">Back to Jobs</Link>
                  </div>
              </div>
          </div>
          <div className="view">
              <div className="container">
                  <h3 className="sub-heading">apply for job</h3>
                  <div className="form">
                      <h4>Job Details</h4>
                  {jobdetails}

                      <h4>Your Application</h4>
                      <div className="row">
                          <div className="col-xs-12">
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
                      </div>
                  </div>
              </div>
          </div>
      </div>
    )
  }
});

module.exports = Application;