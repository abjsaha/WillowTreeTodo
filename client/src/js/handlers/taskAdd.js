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
    getInitialState: function(){
        return({value:""});
    },
    onSubmit: function(e) {
        e.preventDefault();
        var taskText=this.state.value;
        if(!taskText)
            return;
        var todo={
            txt:taskText,
            status:0
        };
        flux.actions.add(todo);
        //flux.actions.all();
        console.log("Test:");
        console.log(this.props);
        this.setState({value:""});
        return;
    },
    onChange: function(e){
        var taskText=React.findDOMNode(this.refs.input).value.trim();
        this.setState({value:taskText});
    },
    render: function() {
        return <div className="add-container">
            <div className="add-inner">
                <input ref="input" type="text" onChange={this.onChange} placeholder="Todo:" value={this.state.value} />
                <Link className="cancel" to="tasks">Cancel</Link>
                <span className="a save" onClick={this.onSubmit}>Save</span>
            </div>
        </div>;
    }

});

module.exports = TaskAdd;
