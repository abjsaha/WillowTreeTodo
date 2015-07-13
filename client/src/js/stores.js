'use strict';

var Tuxxor = require('tuxxor');

var R = require('ramda');

console.log(R.where)

var TaskStore = Tuxxor.createStore({

    initialize: function() {
        this.tasks = [];
        this.counter=0;
    },

    // Our actions hash is a key value store where
    // keys are the name of the method within the store
    // and the value is the event name. Value can also be
    // an array of event names.
    actions: {
        add: 'ADD',
        remove: 'REM',
        update: 'UP',
        all: 'ALL',
        toggle:'TOG',
        emitAChange: 'EMIT'
    },
    toggle: function(id)
    {
        var value=this.tasks.filter(function(task){
            return task.id===id;
        });
        if(!value)
            return;
        console.log("toggle:");
        console.log(value[0]);
        this.tasks[this.tasks.indexOf(value[0])].status=this.tasks[this.tasks.indexOf(value[0])].status==0?1:0;
        this.emit('change');
    },
    all: function()
    {
        return TaskStore.getState();
    },
    set: function (tasks) {
        this.tasks=tasks;
        this.counter=this.tasks.length;
        this.emit('change');
    },

    update: function(updatedTask) {
        var value=this.tasks.filter(function(task){
            return task.id===updatedTask.pos;
        });
        if(!value)
            return;
        this.tasks[this.tasks.indexOf(value)]=updatedTask.latest;
        this.emit('change');
    },

    add: function(task) {
        task.id = this.counter;
        this.tasks.push(task);
        this.counter++;
        console.log("add store");
        console.log(this.tasks);
        console.log(this.counter);
        this.emit('change');
    },

    remove: function(id) {
        var value=this.tasks.filter(function(task){
            return task.id===id;
        });
        if(!value)
            return;
        console.log("remove:");
        console.log(id);
        console.log(value);
        console.log(this.tasks);
        this.tasks[this.tasks.indexOf(value[0])].removed = true;
        console.log(this.tasks[this.tasks.indexOf(value[0])].removed);
        this.emit('change');
    },

    isRemoved: R.whereEq({ removed: true }),

    isComplete: R.whereEq({ status: true }),

    allRemoved: R.filter(this.isRemoved),

    allNotRemoved: R.reject(this.isRemoved),

    allUnfinished: R.filter(this.isComplete),

    allFinished: R.reject(this.isComplete),

    search: function(arr) {
      return function(prop) {
            return function(input) {
                var has = R.propEq(prop, input);
                return R.filter(has, arr);
            };
        };
    },

    sortByComplete: R.sortBy(R.prop('status')),

    sortByText: R.sortBy(R.compose(R.toLower, R.prop('txt'))),

    nonRemovedAreFinished: function() {
        return R.compose(R.all(R.prop('complete')), this.allRemoved);
    },


    // This is our public facing get method for the store. Any
    // component can call getState to get the list of tasks.
    // Here we are using Array.slice to make sure we return
    // a copy of the data and not the actual data. This way
    // we are protected from others modifying our state
    getState: function() {
        return this.tasks.slice(0);
    },
    emitAChange: function() {
        this.emit('change');
    }
});

module.exports = new TaskStore();
