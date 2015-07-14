'use strict';

var React = require('react');
var { flux } = require('flux');
var TaskItem = require('handlers/taskItem');
var R = require('ramda');
var Test = require('handlers/test');

var TaskList = React.createClass({

    getInitialState: function() {
        return {
            value1: 'Show All Removed',
            filt: flux.stores.TaskStore.allNotRemoved,
            sort: flux.stores.TaskStore.sortByText,
            filt2: flux.stores.TaskStore.allUnfinished,
            value2: 'Show All Finished',
            value3: 'Sort by Complete Status',
            searchFlag: false,
            searchValue: '',
            showAllFlag: true,
        };
    },

    onClickShowAll: function() {
        this.setState({ showAllFlag: !this.state.showAllFlag });
    },

    onChange: function() {
        var taskText=React.findDOMNode(this.refs.input).value.trim();
        this.setState({ searchValue: taskText });
    },

    onClickSearch: function() {
        if(R.equals(searchValue, '')) {
            this.setState({ searchFlag: false });
        }
        else {
            this.setState({ searchFlag: true });
        }
        this.setState({ showAllFlag: false });
    },

    onClickShowAllRemoved: function() {
        if(R.compose(R.equals('Show All Removed'), R.prop('value1'))(this.state)) {
            this.setState({ value1: 'Show All Existing', filt: flux.stores.TaskStore.allRemoved });
        }
        else {
            this.setState({ value1: 'Show All Removed', filt: flux.stores.TaskStore.allNotRemoved });
        }
        this.setState({ showAllFlag: false });
    },

    onClickSort: function() {
        if(R.compose(R.equals('Sort by Complete Status'), R.prop('value3'))(this.state)) {
            this.setState({ value3: 'Sort by Text', sort: flux.stores.TaskStore.sortByComplete });
        }
        else {
            this.setState({ value3: 'Sort by Complete Status', sort: flux.stores.TaskStore.sortByText });
        }
    },

    onClickUnfinished: function() {
        if(R.compose(R.equals('Show All Finished'), R.prop('value2'))(this.state)) {
            this.setState({ value2: 'Show All Unfinished', filt2: flux.stores.TaskStore.allFinished });
        }
        else {
            this.setState({ value2: 'Show All Finished', filt2: flux.stores.TaskStore.allUnfinished });
        }
        this.setState({ showAllFlag: false });
    },

    render: function() {
        console.log("Props in taskslist : ");
        console.log(this.props.tasks);
        console.log(this.state.filt);
        var Tasks;
        var searchFilter;
        if(!this.state.searchFlag) {
            searchFilter=this.props.tasks;
        }
        else {
            searchFilter = flux.stores.TaskStore.search(this.props.tasks)('txt')(this.state.searchValue);
        }
        console.log(searchFilter);
        Tasks = R.compose(
                  R.compose(
                      R.compose(
                        R.map((task) => {
                            return <TaskItem removed={task.removed} id={task.id} status={task.status}>
                                {task.txt}
                            </TaskItem>
                        }), this.state.sort)
                    , this.state.filt2)
                , this.state.filt)(searchFilter);
        if(this.state.showAllFlag)
            Tasks = R.compose(R.map((task) => {
                            return <TaskItem removed={task.removed} id={task.id} status={task.status}>
                                {task.txt}
                            </TaskItem>
                        }), this.state.sort)(this.props.tasks);
        console.log(Tasks);
        return (<div className="overlay">
            <div className="list-container">
                {Tasks}
                <button onClick={this.onClickShowAllRemoved}>{this.state.value1}</button>
                <button onClick={this.onClickUnfinished}>{this.state.value2}</button>
                <button onClick={this.onClickSort}>{this.state.value3}</button>
                <button onClick={this.onClickShowAll}>Show All</button>
            </div>
            <div className="search-bar">
                <input ref="input" type="text" onChange={this.onChange} placeholder="Search..." value={this.state.searchValue} />
                <button onClick={this.onClickSearch}>Submit</button>
            </div>
        </div>);
    }

});

module.exports = TaskList;
