'use strict';

import React from 'react';
import { Link } from 'react-router';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import Logo from './partials/images.js';

const Header = React.createClass({
    renderHeader: function() {
        const path = this.props.location.pathname;
        if (path.indexOf('/client') != -1) {
            return (
                <Nav pullRight>
                    <LinkContainer to="/clientpayments">
                        <NavItem eventKey={3}>Payment Details</NavItem>
                    </LinkContainer>
                    <LinkContainer to="/">
                        <NavItem eventKey={1} >Log Out</NavItem>
                    </LinkContainer>
                </Nav>
            );
        } else if (path.indexOf('/courier') != -1) {
            return (
                <Nav pullRight>
                    <LinkContainer to="/courierpayments">
                        <NavItem eventKey={3}>Payment Details</NavItem>
                    </LinkContainer>
                    <LinkContainer to="/">
                        <NavItem eventKey={1} >Log Out</NavItem>
                    </LinkContainer>
                </Nav>
            );
        } else {
            return (
                <Nav pullRight>
                    <LinkContainer to="/client">
                        <NavItem eventKey={1} >Customer Login</NavItem>
                    </LinkContainer>
                    <LinkContainer to="/courier">
                        <NavItem eventKey={2}>Courier Login</NavItem>
                    </LinkContainer>
                </Nav>
            )
        }
    },
    render : function(){
        return (
            <div>
                <Navbar>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <Link to="/">
                                <Logo />
                            </Link>
                        </Navbar.Brand>
                    </Navbar.Header>
                {this.renderHeader()}
                </Navbar>
            {this.props.children}
            </div>
        )
    }
});

module.exports = Header;