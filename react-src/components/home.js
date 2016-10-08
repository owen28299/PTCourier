import React from 'react';
import { browserHistory } from 'react-router';



const GetAll = React.createClass({
  render : function(){
    return (
      <div className="home">
          <div className="parallax-bg" style={{backgroundImage: 'url(\'./theme/assets/images/melb_bg.jpg\')'}}>
              <div className="container">
                  <div className="row title">
                      <div className="col-md-7">
                          <h1>Welcome to Zap!</h1>
                          <h4>Some tag line</h4>
                      </div>
                      <div className="col-md-5">
                          <h4>Would you like to...</h4>
                          <button className="btn btn-primary">Zap an urgent delivery</button><br />
                          <button className="btn btn-primary">Deliver urgent goods</button>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    )
  }
});

module.exports = GetAll;