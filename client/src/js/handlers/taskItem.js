'use strict';

var React = require('react');
var { flux } = require('flux');
var R = require('ramda');
var TaskItem = React.createClass({

    toggle: function() {
        flux.actions.toggle(this.props.id);
    },

    remove: function() {
        flux.actions.remove(this.props.id);
    },

    render: function() {
        console.log("TaskItem:");
        console.log(this.props);
        var shown;
        if(this.props.status)
        {
            shown=" Complete ";
        }
        else
            shown=" Pending ";
        return (<div className="todo" >
            <span className="name" onClick={this.toggle}>{this.props.children}</span>
            <span className="status">{shown}</span>
            <span className="a remove" onClick={this.remove}>X</span>
        </div>);
    }

});

module.exports = TaskItem;
