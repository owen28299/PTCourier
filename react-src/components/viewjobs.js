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
            <button id={element.id} onClick={that.apply}>Apply</button>
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