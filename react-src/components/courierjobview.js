import React from 'react';
import { browserHistory } from 'react-router';

const JobView = React.createClass({
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
  handleSubmit : function(){
    console.log('FROG');
  },
  render : function(){
    var that = this;

    var myJobs = this.state.jobs.filter(function(element){
      if(element.courier && element.courier[0].name === "Jimmy McGrath"){
        return true;
      }
      else {
        return false;
      }
    })

    var allJobs = myJobs.map(function(element){
      return (
        <div key={element.id}>
          <p>{element.client}</p>
          <p>{element.item}</p>
          <p>{element.item_location}</p>
          <p>{element.delivery_location}</p>
          <div>Insert live route here</div>
          <p>{element.time}</p>
          <p>{element.budget}</p>
          <button>Mark Item Purchased</button>
        </div>
      )
    });

    return (
      <div className="jobs list-view">
          <h3 className="sub-heading">my jobs</h3>
          <div className="list">
              {allJobs.length > 0 ? allJobs : 'You have no jobs'}
          </div>
      </div>
    )
  }
});

module.exports = JobView;