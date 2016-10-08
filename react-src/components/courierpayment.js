import React from 'react';
import { browserHistory } from 'react-router';

const CourierPayment = React.createClass({
    getInitialState : function(){

        return {
            number : "5123450000000016",
            securityCode : "100",
            expiryMonth : "05",
            expiryYear : "17",
            paymentSession : null
        }
    },
    handleChange : function(field, event){
        var nextState = {};
        nextState[field] = event.target.value;

        this.setState(nextState);
    },
    componentDidMount: function() {

    },
    pay : function(){
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
                            console.log("Session update failed with request timeout: " + response.errors.message);
                        } else if ("system_error" == response.status)  {
                            console.log("Session update failed with system error: " + response.errors.message);
                        }
                    } else {
                        console.log("Session update failed: " + response);
                    }
                }
            },
            order: {
                amount: 10.00,
                currency: "AUD"
            }
        });
        PaymentSession.updateSessionFromForm('card');
    },
    render : function(){
        return (
            <div className="paymentmodule">
                <div>Please enter your payment details:</div>
                <label>Card Number:</label>
                <input
                    type="text" id="card-number" readOnly="readOnly" value={this.state.number}
                    onChange={this.handleChange.bind(this, "number")}
                />
                <div className="container"></div>
                <label>Expiry Month:</label>
                <input
                    type="text" id="expiry-month" readOnly="readOnly" value={this.state.expiryMonth}
                    onChange={this.handleChange.bind(this, "expiryMonth")}
                />
                <div className="container"></div>
                <label>Expiry Year:</label>
                <input
                    type="text" id="expiry-year" readOnly="readOnly" value={this.state.expiryYear}
                    onChange={this.handleChange.bind(this, "expiryYear")}
                />
                <div className="container"></div>
                <label>Security Code:</label>
                <input
                    type="text" id="security-code" readOnly="readOnly" value={this.state.securityCode}
                    onChange={this.handleChange.bind(this, "securityCode")}
                />
                <div className="container"></div>
            </div>
        )
    }

});

module.exports = CourierPayment;