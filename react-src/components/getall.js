import React from 'react';
import { browserHistory } from 'react-router';

const GetAll = React.createClass({
  render : function(){
    return (
      <div className="all-jobs">
        <h1>All Jobs</h1>
      </div>
    )
  }
});

module.exports = GetAll;