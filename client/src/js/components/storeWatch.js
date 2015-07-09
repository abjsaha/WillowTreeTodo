'use strict';

var React = require('react');
var _ = require('ramda');
var { flux } = require('flux');

var StoreWatchWrapper = function(stores, getStateFromStores, Component) {

    // Expose the Static methods of the wrapped component on the wrapper
    // TODO: Clean this up
    var keys = _.keys(Component.prototype.constructor);
    var ComponentProps = _.pick(keys, Component.prototype.constructor);

    var statics = _.omit(['getDefaultProps', 'displayName', 'contextTypes'], ComponentProps);

    var StoreWatchComponent = React.createClass(_.merge(ComponentProps, {

        statics: statics,

        componentDidMount: function() {
            _.forEach((store) => {
                flux.store(store).on('change', this.setStateFromStores);
            }, stores);
        },

        componentWillUnmount: function() {
            _.forEach(store => {
                flux.store(store).removeListener('change', this.setStateFromStores);
            }, stores);
        },

        getInitialState: function() {
            return getStateFromStores.call(this);
        },

        setStateFromStores: function() {
            this.setState(getStateFromStores.call(this));
        },

        render: function() {
            return <Component {...this.props} {...this.state} />;
        }

    }));

    return StoreWatchComponent;

};

module.exports = StoreWatchWrapper;

