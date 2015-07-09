'use strict';

var React = require('react');
var { flux } = require('flux');

var TaskItem = React.createClass({

    toggle: function() {
    },

    remove: function() {
    },

    render: function() {
        var task = this.props.task;

        return <div className="todo" onClick={this.toggle}>
            <span className="a remove" onClick={this.remove}></span>
        </div>;
    }

});

module.exports = TaskItem;
