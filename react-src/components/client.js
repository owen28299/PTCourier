import React from 'react';
import { browserHistory } from 'react-router';

const Get = React.createClass({
  render : function(){
    return (
      <div className="get">
        <h1>Client</h1>
        <p>Instant delivery at your fingertips</p>
      </div>
    )
  }
});

module.exports = Get;