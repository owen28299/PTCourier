import React from 'react';
import { browserHistory } from 'react-router';

const ClientJobView = React.createClass({
  getInitialState : function(){
    return {
      jobs : []
    }
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

    var myJobs = this.state.jobs.filter(function(element){
      if(element.client === "Mark Smith" && element.status !== "hiring"){
        return true;
      }
      else {
        return false;
      }
    })

    var allJobs = myJobs.map(function(element){
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
            <button>Mark Item Received</button>
        </div>
      )
    });

    return (
      <div className="add list-view">
        <h3 className="sub-heading" >My Deliveries</h3>
          <div className="list">
              {allJobs}
          </div>
      </div>
    )
  }
});

module.exports = ClientJobView;