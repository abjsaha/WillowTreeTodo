'use strict';

var React = require('react');
var { Link } = require('react-router');
var { flux } = require('flux');

var TaskAdd = React.createClass({

    // Since we want to use the router in this component, we need
    // to include it in our context
    contextTypes: {
        router: React.PropTypes.func
    },

    onSubmit: function() {
    },

    render: function() {
        return <div className="add-container">
            <div className="add-inner">
                <input ref="input" type="text" placeholder="Todo:" />
                <Link className="cancel" to="tasks">Cancel</Link>
                <span className="a save" onClick={this.onSubmit}>Save</span>
            </div>
        </div>;
    }

});

module.exports = TaskAdd;
