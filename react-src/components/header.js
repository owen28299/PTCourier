'use strict'

import React from 'react';
import { Link } from 'react-router';

const Header = React.createClass({
  render : function(){
    return (
      <div className="header">
        <h1>PT Courier App</h1>
        <Link to="/">Home</Link>
        <div class="container"></div>
        <Link to="/courier">For Couriers</Link>
        <div class="container"></div>
        <Link to="/client">For Clients</Link>
        <div class="container"></div>
        <Link to="/payments">Client Payments</Link>
        <div class="container"></div>
        {this.props.children}
      </div>
    )
  }
});

module.exports = Header;