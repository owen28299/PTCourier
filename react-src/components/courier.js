import React from 'react';
import { browserHistory } from 'react-router';

const Add = React.createClass({
  render : function(){
    return (
      <div className="add">
        <h1>For Couriers</h1>
        <p>Find, travel, earn</p>
      </div>
    )
  }
});

module.exports = Add;