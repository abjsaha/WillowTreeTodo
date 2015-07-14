'use strict';

var React = require('react');
var { flux } = require('flux');
var TaskItem = require('handlers/taskItem');
var R = require('ramda');
var Test = require('handlers/test');

var TaskList = React.createClass({

    getInitialState: function() {
        return {
            //value1: 'Show All Removed',
            //filt: flux.stores.TaskStore.allNotRemoved,
            //sort: flux.stores.TaskStore.sortByText,
            //filt2: flux.stores.TaskStore.allUnfinished,
            //value2: 'Show All Finished',
            //value3: 'Sort by Complete Status',
            //searchFlag: false,
            //searchValue: '',
            //showAllFlag: true,
            searchValue: '',
            filters: {
                status: false,
                removed: false
            },
            sort: 'txt'
        };
    },

    onClickShowAll: function() {
        this.setState({ showAllFlag: !this.state.showAllFlag, searchFlag: false });
    },

    onChange: function() {
        var taskText=React.findDOMNode(this.refs.input).value.trim();
        this.setState({ searchValue: taskText });
    },

    onClickSearch: function() {
        console.log('search:',this.state.searchValue);
        if(R.equals(this.state.searchValue, '')) {
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

    test: function() {
        // Filters
        var filters = {
            status: React.findDOMNode(this.refs.complete).checked,
            removed: React.findDOMNode(this.refs.removed).checked
        };

        // Sorts
        var sort = React.findDOMNode(this.refs.sortTxt).checked ?  'txt' : 'complete';

        // Search
        var searchValue = React.findDOMNode(this.refs.search).value;

        this.setState({
            filters: filters,
            sort: sort,
            searchValue: searchValue
        });
    },

    clearAll: function() {
        this.setState(this.getInitialState());
    },

    render: function() {

        //+ searchPredicate :: obj -> boolean
        var searchPredicate = R.compose(R.test(new RegExp(this.state.searchValue, 'i')), R.prop('txt'));

        var filterPredicate = R.whereEq(this.state.filters);

        var sortComparator = R.compose(R.toLower, R.toString, R.prop(this.state.sort));


        var Tasks = R.compose(
            // Map the task to a Component
            R.map((task) => {
                return <TaskItem removed={task.removed} id={task.id} status={task.status}>
                    {task.txt}
                </TaskItem>
            }),
            // Sort the todos
            R.sortBy(sortComparator),
            // Filter the todos
            R.filter(filterPredicate),
            // Search the todos
            R.filter(searchPredicate)
        )(this.props.tasks);

        //console.log("Props in taskslist : ");
        //console.log(this.props.tasks);
        //console.log(this.state.filt);
        //var Tasks;
        //var searchFilter;
        //if(!this.state.searchFlag) {
            //searchFilter=this.props.tasks;
        //}
        //else {
            //searchFilter = flux.stores.TaskStore.search(this.props.tasks)('txt')(this.state.searchValue);
            //console.log("Search Result: ");
        //}
        //console.log(searchFilter);

        //Tasks = R.compose(
            //R.map((task) => {
                //return <TaskItem removed={task.removed} id={task.id} status={task.status}>
                    //{task.txt}
                //</TaskItem>
            //}),
            //this.state.sort,
            //this.state.filt2,
            //this.state.filt
        //)(searchFilter);

        //if(this.state.showAllFlag && !this.state.searchFlag)
            //Tasks = R.compose(R.map((task) => {
                            //return <TaskItem removed={task.removed} id={task.id} status={task.status}>
                                //{task.txt}
                            //</TaskItem>
                        //}), this.state.sort)(this.props.tasks);
        //console.log(Tasks);
        return (<div className="overlay">
            <div className="list-container">
                <form onChange={this.test}>
                    <label><input ref="complete" type="checkbox" checked={this.state.filters.status} /><span>Complete</span></label>
                    <label><input ref="removed" type="checkbox" checked={this.state.filters.removed} /><span>Removed</span></label>
                    <label><input ref="sortTxt" type="radio" name="sort" value="txt" checked={this.state.sort === 'txt'} /><span>Text</span></label>
                    <label><input ref="sortComplete" type="radio" name="sort" value="complete" checked={this.state.sort === 'complete'} /><span>Complete</span></label>

                    <input ref="search" type="text" placeholder="Search..." value={this.state.searchValue} />

                    <span className="clear" onClick={this.clearAll}>Clear Filters</span>
                </form>

                <hr />

                {Tasks}
            </div>
        </div>);
    }

});

module.exports = TaskList;
