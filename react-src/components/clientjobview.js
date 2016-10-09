import React from 'react';
import { browserHistory } from 'react-router';

const Progress = React.createClass({

    render() {

        if (this.props.status === 'progress') {
            return (
                <div className="status on-time">
                    On-Time | Arriving at 3:15 pm
                </div>
            )
        } else if (this.props.status === 'delayed') {
            return (
                <div className="status delayed">
                    Delayed | Waiting for tram 18
                </div>
            )
        } else if (this.props.status === 'completed') {
            return (
                <div className="status completed">
                    Completed | Arived on 15/07/2016
                </div>
            )
        } else if (this.props.status === 'hiring') {
            return (
                <div className="status hiring">
                    Taking Bids
                </div>
            )
        } else if (this.props.status === 'hired') {
            return (
                <div className="status on-time">
                    Courier hired | Waiting on response
                </div>
            )
        } else {
            return (
                <div className="status"></div>
            )
        }
    }
});

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
            console.log(element);
            if(element.client === "Mark Smith" && element.status != "completed" && element.status != "hiring" ){
                return true;
            }
            else {
                return false;
            }
        });
        var allJobs = myJobs.map(function(element){
            return (
                <div className="list" key={element.id}>
                    <div className="arrival-bar">
                        <Progress status={element.status} />
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <p><b>Product Location:</b> {element.item_location}</p>
                            <p><b>Delivery Location:</b> {element.delivery_location}</p>
                            <p><b>Customer Name:</b> {element.client}</p>
                            <p><b>Product:</b> {element.item}</p>
                        </div>
                        <div className="col-md-6">
                            <p><b>Time Frame:</b> {element.time}</p>
                            <p><b>Budget:</b> {element.budget}</p>
                            <button>Mark Item Received</button>
                        </div>
                    </div>
                </div>
            )
        });
        return (
            <div className="add list-view">
                <h3 className="sub-heading" >jobs in progress</h3>
                <div>
              {allJobs.length > 0 ? allJobs : 'No Jobs in Progress'}
                </div>
            </div>
        )
    }
});

module.exports = ClientJobView;