import React from 'react';
import { browserHistory } from 'react-router';

const Add = React.createClass({
  getInitialState : function(){
    return {
      jobs : [],
      courierId : 2,
      courier : null
    }
  },
  apply : function(event){
    browserHistory.push("/courier/apply/" + event.target.id)
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
       var jobs = JSON.parse(this.response).data;
       that.setState({jobs : jobs});
     });
     jobsRequest.open("GET", "/jobs");
     jobsRequest.send();
  },
  render : function(){
    var that = this;

    var allJobs = this.state.jobs.map(function(element){
        var plannerUrl = "http://54.206.123.83:10080/?module=planner&fromPlace="
            + element.item_location_geocode.latitude + "%2C" + element.item_location_geocode.longitude + "&toPlace="
            + element.delivery_location_geocode.latitude + "%2C" + element.delivery_location_geocode.longitude
            + "&mode=TRANSIT%2CWALK&itinIndex=1";
        var courierToItemUrl = "http://54.206.123.83:10080/?module=planner&fromPlace="
            + that.state.courier.home_geocode.latitude + "%2C" + that.state.courier.home_geocode.longitude + "&toPlace="
            + element.item_location_geocode.latitude + "%2C" + element.item_location_geocode.longitude
            + "&mode=TRANSIT%2CWALK&itinIndex=1";
      if(element.status === "hiring"){
        return (
        <div className="list" key={element.id}>
           <div className="row">
               <div className="col-md-4">
                   <p><b>Name:</b> {element.client}</p>
                   <p><b>Delivery Location:</b> {element.delivery_location}</p>
               </div>
               <div className="col-md-4">
                   <p><b>Product:</b> {element.item}</p>
                   <p><b>Product Location:</b> {element.item_location}</p>

               </div>
               <div className="col-md-4">
                   <p><b>Time Frame:</b> {element.time}</p>
                   <p><b>Budget:</b> {element.budget}</p>
               </div>
           </div>
            <div className="row">
                <div className="col-sm-12">
                    <h3 className="overlap-map">Getting to the goods</h3>
                    <iframe className="map-iframe" src={courierToItemUrl}></iframe>
                    <h3 className="overlap-map">Getting to the purchaser</h3>
                    <iframe className="map-iframe" src={plannerUrl}></iframe>
                    <button className="btn btn-default" id={element.id} onClick={that.apply}>Apply</button>
                </div>
            </div>
        </div>
        )
      }
    });

    return (
      <div className="list-view">
        <h3 className="sub-heading" >currently listed jobs</h3>
          <div >
               {allJobs.length > 0 ? allJobs : 'No Jobs Listed'}
          </div>
      </div>
    )
  }
});

module.exports = Add;