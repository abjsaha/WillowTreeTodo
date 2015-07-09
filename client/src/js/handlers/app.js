'use strict';

var React = require('react');
var StoreWatchComponent = require('components/storeWatch');
var { RouteHandler } = require('react-router');
var { flux } = require('flux');
var { Link } = require('react-router');

var App = React.createClass({

    render: function() {
        //console.log(this.props);
        return <div className="app-container">
            <div className="header">
                <Link className="title" to="tasks">TODO</Link>
                <Link className="add" to="add">
                    add
                </Link>
            </div>

            <RouteHandler tasks={this.props.tasks} />
        </div>;
    }

});


// Have the top level of our application listen for store
// changes and pass them down to all child components.
// Since our application is very small, this works just fine.
module.exports = StoreWatchComponent(['TaskStore'], function() {
    return {
        tasks: flux.store('TaskStore').getState()
    };
}, App);
