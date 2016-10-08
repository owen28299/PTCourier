'use strict';

import React from 'react';
import { Link } from 'react-router';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import Logo from './partials/images.js';

const Header = React.createClass({
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
                    <Nav pullRight>
                        <LinkContainer to="/client">
                            <NavItem eventKey={1} >Customer Login</NavItem>
                        </LinkContainer>
                        <LinkContainer to="/courier">
                            <NavItem eventKey={2}>Courier Login</NavItem>
                        </LinkContainer>
                    </Nav>
                </Navbar>
                 {this.props.children}
            </div>
        )
    }
});

module.exports = Header;