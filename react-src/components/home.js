import React from 'react';
import { browserHistory } from 'react-router';

const GetAll = React.createClass({
  render : function(){
    return (
      <div className="all-jobs">
        <h1>Welcome to PT Courier</h1>
        <p>Urgent messenger and courier services at your fingertips</p>
      </div>
    )
  }
});

module.exports = GetAll;