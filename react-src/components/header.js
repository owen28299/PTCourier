'use strict'

import React from 'react';
import { Link } from 'react-router';

const Header = React.createClass({
  render : function(){
    return (
      <div className="header">
        <h1>PT Courier App</h1>
        <Link to="/">Home</Link>
        <Link to="/courier">For Couriers</Link>
        <Link to="/client">For Clients</Link>
        {this.props.children}
      </div>
    )
  }
});

module.exports = Header;