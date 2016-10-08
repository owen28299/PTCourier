import React from 'react';
import { browserHistory } from 'react-router';

const Add = React.createClass({
  getInitialState : function(){
    return {
      jobs : []
    }
  },
  apply : function(event){
    browserHistory.push("/courier/apply/" + event.target.id)
  },
  componentDidMount : function(){
    var that = this;

    var xhttp = new XMLHttpRequest();
    xhttp.addEventListener("load", function(){
      var jobs = JSON.parse(this.response).data;
      that.setState({jobs : jobs});
    });
    xhttp.open("GET", "/jobs");
    xhttp.send();
  },
  render : function(){
    var that = this;

    var allJobs = this.state.jobs.map(function(element){
      var plannerUrl = "http://54.206.123.83:10080/?module=planner&fromPlace="
          + element.item_location_geocode.latitude + "%2C" + element.item_location_geocode.longitude + "&toPlace="
          + element.delivery_location_geocode.latitude + "%2C" + element.delivery_location_geocode.longitude
          + "&time=9%3A19am&date=10-09-2016&mode=TRANSIT%2CWALK&maxWalkDistance=804.672&arriveBy=true&wheelchair=false&locale=en&startTransitStopId=4_19842&itinIndex=0";
      if(element.status === "hiring"){
        return (
        <div key={element.id}>
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
                    <iframe className="map-iframe" src={plannerUrl}></iframe>
                    <button id={element.id} onClick={that.apply}>Apply</button>
                </div>

            </div>
        </div>
        )
      }
    });

    return (
      <div className="list-view">
        <h3 className="sub-heading" >Currently listed jobs</h3>
          <div className="list">
               {allJobs}
          </div>
      </div>
    )
  }
});

module.exports = Add;