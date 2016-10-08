import React from 'react';
import { browserHistory } from 'react-router';
const Payment = require('./payment');
const Dashboard = React.createClass({
  getInitialState : function(){
    return {
      jobs : [],
      offer : 0.0
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
    pay : function(){
      var offer = this.state.offer;
        PaymentSession.configure({
            fields: {
                // ATTACH HOSTED FIELDS TO YOUR PAYMENT PAGE FOR A CREDIT CARD
                card: {
                    number: "#card-number",
                    securityCode: "#security-code",
                    expiryMonth: "#expiry-month",
                    expiryYear: "#expiry-year"
                }
            },
            //SPECIFY YOUR MITIGATION OPTION HERE
            frameEmbeddingMitigation: ["javascript"],
            callbacks: {
                initialized: function(response) {
                    // HANDLE INITIALIZATION RESPONSE
                    if (response.status) {
                        if ("ok" == response.status) {
                            console.log("BOOM");
                        } else if ("fields_in_error" == response.status)  {

                            console.log("Session update failed with field errors.");
                            if (response.errors.cardNumber) {
                                console.log("Card number invalid or missing.");
                            }
                            if (response.errors.expiryYear) {
                                console.log("Expiry year invalid or missing.");
                            }
                            if (response.errors.expiryMonth) {
                                console.log("Expiry month invalid or missing.");
                            }
                            if (response.errors.securityCode) {
                                console.log("Security code invalid.");
                            }
                        } else if ("request_timeout" == response.status)  {
                            console.log("Session update failed with request timeout: " + response.errors.message);
                        } else if ("system_error" == response.status)  {
                            console.log("Session update failed with system error: " + response.errors.message);
                        }
                    } else {
                        console.log("Session update failed: " + response);
                    }
                },
                formSessionUpdate: function(response) {
                    // HANDLE RESPONSE FOR UPDATE SESSION
                    if (response.status) {
                        if ("ok" == response.status) {
                            console.log("Session updated with data: " + response.session.id);

                            //check if the security code was provided by the user
                            if (response.sourceOfFunds.provided.card.securityCode) {
                                console.log("Security code was provided.");
                            }

                            //check if the user entered a MasterCard credit card
                            if (response.sourceOfFunds.provided.card.scheme == 'MASTERCARD') {
                                console.log("The user entered a MasterCard credit card.")
                            }
                        } else if ("fields_in_error" == response.status)  {

                            console.log("Session update failed with field errors.");
                            if (response.errors.cardNumber) {
                                console.log("Card number invalid or missing.");
                            }
                            if (response.errors.expiryYear) {
                                console.log("Expiry year invalid or missing.");
                            }
                            if (response.errors.expiryMonth) {
                                console.log("Expiry month invalid or missing.");
                            }
                            if (response.errors.securityCode) {
                                console.log("Security code invalid.");
                            }
                        } else if ("request_timeout" == response.status)  {
                            console.log("Session update failed with request timeout: ");
                        } else if ("system_error" == response.status)  {
                            console.log("Session update failed with system error: ");
                        }
                    } else {
                        console.log("Session update failed: " + response);
                    }
                }
            },
            order: {
                amount: offer,
                currency: "AUD"
            }
        });
        PaymentSession.updateSessionFromForm('card');
    },
  handleAccept : function(event){
    var that = this;

    var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
    xmlhttp.addEventListener("load", function(){
      var jobs = JSON.parse(this.response).data;
      that.setState({jobs : jobs});
    });

    xmlhttp.open("POST", "/jobs/accept");
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send(JSON.stringify({
      appid : event.target.dataset.appid,
      jobid : event.target.dataset.jobid
    }));
    this.pay();
  },
  handleChangeView : function(){
    this.props.setView("jobview");
  },
  render : function(){
    var that = this;
    var payment = <Payment />
    var allJobs = this.state.jobs.map(function(element){
      var applicants = element.applicants.map(function(applicant){
          that.state.offer = applicant.offer.toFixed(2);
        return (
          <div className="app-list" key={applicant.id}>
            <div className="row">
                <div className="col-md-3">
                    <p><b>Applicant Name: </b>{applicant.name}</p>
                </div>
                <div className="col-md-3">
                    <p><b>Offer: </b>{applicant.offer.toFixed(2)} AUD</p>
                </div>
                <div className="col-md-3">
                    <p><b>Estimated Time: </b>{applicant.time*60} minutes</p>
                </div>
                <div className="col-md-3">
                    <button
                        data-appid={applicant.id}
                        data-jobid={element.id}
                        onClick={that.handleAccept}>
                        Accept Applicant
                    </button>
                </div>
            </div>
          </div>
        )
      });
      var hiddenStyle ={
          display:"none"
      }
      return (
        <div key={element.id}>
            <div className="row">
                <div className="col-md-3">
                    <p><b>Name:</b> {element.client}</p>
                    <p><b>Delivery Location:</b> {element.delivery_location}</p>
                </div>
                <div className="col-md-3">
                    <p><b>Product:</b> {element.item}</p>
                    <p><b>Product Location:</b> {element.item_location}</p>

                </div>
                <div className="col-md-3">
                    <p><b>Time Frame:</b> {element.time*60} minutes </p>
                    <p><b>Budget:</b> {element.budget.toFixed(2)}</p>
                </div>
            </div>
            <div>
                <p>{element.courier ? element.courier[0].name + " has been paid " + element.budget.toFixed(2) + " AUD to deliver your product." : null}</p>
          {applicants}
          {element.courier ? <button onClick={that.handleChangeView}>View Job Progress</button> : null}
            </div>
            <div style={hiddenStyle}>
                <Payment ref={(payment) => { that._child = payment; }} />
            </div>
        </div>
      )
    });

    return (
      <div className="clientdashboard list-view">
          <h3 className="sub-heading" >dashboard</h3>
          <div className="list">
               {allJobs.length > 0 ? allJobs : 'No Jobs Listed'}
          </div>
      </div>
    )
  }
});

module.exports = Dashboard;