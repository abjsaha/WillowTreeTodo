'use strict';

var { Route, DefaultRoute } = require('react-router');

// Every route in our application has a handler. This
// handler gets rendered to the screen whenever the route
// is matched.
var App = require('handlers/app');
var TaskList = require('handlers/taskList.js');
var TaskAdd = require('handlers/taskAdd.js');

var routes = (
    <Route name="app" path="/" handler={App}>
        <Route name="tasks" handler={TaskList} />
        <Route name="add" handler={TaskAdd} />

        <DefaultRoute handler={TaskList} />
    </Route>
);

module.exports = routes;

