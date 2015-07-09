'use strict';

var ajax = require('ajax');


// The key values of this object will be available in
// flux.actions.<KEY_NAME>
//
// There is a common pattern with these actions, they all
// return promises. The action starts with firing off an
// ajax request (which returns a promise). We tap into
// that promise with then. Here, we notify the stores
// that an action took place.
//
// Why do we return the promise? That way the view who
// triggered this action will be notified when the action
// is successfully completed. This is useful if the view
// needs to transition to a new screen when the action is
// complete.
var TaskActions = {

    // Fetch all tasks from the server
    all: function() {
    },

    // Update a single task
    update: function(id, params) {
    },

    // Add a new task
    add: function(params) {
    },

    // Delete a task by id
    remove: function(id) {
    }

};

module.exports = TaskActions;

