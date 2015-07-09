'use strict';

var Tuxxor = require('tuxxor');

var TaskStore = Tuxxor.createStore({

    initialize: function() {
        this.tasks = [];
    },

    // Our actions hash is a key value store where
    // keys are the name of the method within the store
    // and the value is the event name. Value can also be
    // an array of event names.
    actions: {
    },

    set: function (tasks) {
        this.emit('change');
    },

    update: function(updatedTask) {
        this.emit('change');
    },

    add: function(task) {
        this.emit('change');
    },

    remove: function(id) {
        this.emit('change');
    },

    // This is our public facing get method for the store. Any
    // component can call getState to get the list of tasks.
    // Here we are using Array.slice to make sure we return
    // a copy of the data and not the actual data. This way
    // we are protected from others modifying our state
    getState: function() {
        return this.tasks.slice(0);
    }
});

module.exports = new TaskStore();
