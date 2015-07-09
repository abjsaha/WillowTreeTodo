'use strict';

var React = require('react');
var { flux } = require('flux');
var TaskItem = require('handlers/taskItem');

var TaskList = React.createClass({

    componentWillMount: function() {
    },
    render: function() {
    	var mappedTasks=this.props.tasks.map(function(task){
    		return(
    				<TaskItem id={task.id} status={task.status}>
    					{task.txt}
    				</TaskItem>
    			);
    	});
        return (<div className="list-container">{mappedTasks}
        </div>);
    }

});

module.exports = TaskList;
