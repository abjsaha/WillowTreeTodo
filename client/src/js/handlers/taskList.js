'use strict';

var React = require('react');
var { flux } = require('flux');
var TaskItem = require('handlers/taskItem');

var TaskList = React.createClass({

    componentWillMount: function() {
    },

    render: function() {
        return <div className="list-container">
        </div>;
    }

});

module.exports = TaskList;
