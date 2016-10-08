'use strict';

import React from 'react';
import { Link } from 'react-router';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import Logo from './partials/images.js';

const Header = React.createClass({
    renderHeader: function() {
        const path = this.props.location.pathname;
        if (path == '/client') {
            return (
                <Nav pullRight>
                    <LinkContainer to="/">
                        <NavItem eventKey={1} >Log Out</NavItem>
                    </LinkContainer>
                </Nav>
            );
        } else if (path === '/courier') {
            return (
                <Nav pullRight>
                    <LinkContainer to="/">
                        <NavItem eventKey={1} >Courier Log Out</NavItem>
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
                    <LinkContainer to="/payments">
                        <NavItem eventKey={3}>Client Payments</NavItem>
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