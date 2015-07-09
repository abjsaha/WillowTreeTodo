'use strict';

// Expose / conglomorate everything related to Flux here.
// This also allows us to more cleanly use the FluxMixin without
// needing to pass it React every time we use it.

var React = require('react');
var { Flux, FluxMixin, StoreWatchMixin } = require('tuxxor');

var stores = {
    TaskStore: require('stores')
};

var actions = require('actions');

module.exports = {
    flux: new Flux(stores, actions),
    FluxMixin: FluxMixin(React),
    StoreWatchMixin: StoreWatchMixin
};

