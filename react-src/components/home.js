import React from 'react';
import { browserHistory } from 'react-router';



const GetAll = React.createClass({
  render : function(){
    return (
      <div className="home">
          <div className="container">
             <div className="row col-md-6 col-md-offset-3">
                 <h1>Welcome to Zap!</h1>
                 <h4>Are you a...</h4>
                 <button className="btn btn-default">Custumer</button>
                 <button className="btn btn-default">Courier</button>
             </div>
          </div>
      </div>
    )
  }
});

module.exports = GetAll;