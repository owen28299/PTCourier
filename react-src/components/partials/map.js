import React from 'react';
import { browserHistory } from 'react-router';

var INITIAL_LOCATION = {
    address: 'Melbourne',
    position: {
        latitude: -37.8136,
        longitude: 144.9631
    }
};

var INITIAL_MAP_ZOOM_LEVEL = 10;


var Map = React.createClass({
    getInitialState: function () {
        return {
            isGeocodingError: false,
            location: INITIAL_LOCATION,
            foundAddress: INITIAL_LOCATION.address
        };
    },

    geocodeAddress: function (address) {
        this.geocoder.geocode({ 'address': address }, function handleResults(results, status) {

            if (status === google.maps.GeocoderStatus.OK) {

                var position = {
                    latitude: results[0].geometry.location.lat(),
                    longitude: results[0].geometry.location.lng()
                };
                var address = results[0].formatted_address;

                this.setState({
                    foundAddress: address,
                    isGeocodingError: false,
                    location: {
                        address: address,
                        position: position
                    }
                });

                this.props.updateState(this.props.position, position);
                this.props.updateState(this.props.address, address);

                this.map.setCenter(results[0].geometry.location);
                this.marker.setPosition(results[0].geometry.location);

                return;
            }

            this.setState({
                foundAddress: null,
                isGeocodingError: true,
                location: INITIAL_LOCATION
            });

            this.map.setCenter({
                lat: INITIAL_LOCATION.latitude,
                lng: INITIAL_LOCATION.longitude
            });

            this.marker.setPosition({
                lat: INITIAL_LOCATION.latitude,
                lng: INITIAL_LOCATION.longitude
            });

        }.bind(this));
    },

    handleFormSubmit: function (submitEvent) {
        submitEvent.preventDefault();

        var address = this.searchInputElement.value;

        this.geocodeAddress(address);
    },

    componentDidMount: function () {
        var mapElement = this.mapElement;

        this.map = new google.maps.Map(mapElement, {
            zoom: INITIAL_MAP_ZOOM_LEVEL,
            center: {
                lat: INITIAL_LOCATION.position.latitude,
                lng: INITIAL_LOCATION.position.longitude
            }
        });

        this.marker = new google.maps.Marker({
            map: this.map,
            position: {
                lat: INITIAL_LOCATION.position.latitude,
                lng: INITIAL_LOCATION.position.longitude
            }
        });

        this.geocoder = new google.maps.Geocoder();
    },

    setSearchInputElementReference: function (inputReference) {
        this.searchInputElement = inputReference;
    },

    setMapElementReference: function (mapElementReference) {
        this.mapElement = mapElementReference;
    },

    render: function () {
        return (
            <div className="container">

                <div className="row">
                    <div className="col-sm-12">

                        <form className="form-inline" onSubmit={this.handleFormSubmit}>
                            <div className="row">
                                <div className="col-xs-8 col-sm-10">

                                    <div className="form-group">
                                        <label className="sr-only" htmlFor="address">Address</label>
                                        <input type="text" className="form-control input-lg" id="address" placeholder={this.state.foundAddress} ref={this.setSearchInputElementReference} required />
                                    </div>

                                </div>
                                <div className="col-xs-4 col-sm-2">

                                    <button type="submit" className="btn btn-default btn-lg">
                                        <span className="glyphicon glyphicon-search" aria-hidden="true"></span>
                                    </button>

                                </div>
                            </div>
                        </form>

                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">

                        {this.state.isGeocodingError ? <p className="bg-danger">Address not found.</p> : <p className="bg-info">{this.state.foundAddress}</p>}

                        <div className="map" ref={this.setMapElementReference}></div>

                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Map;
