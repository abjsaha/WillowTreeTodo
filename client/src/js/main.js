'use strict';

var React = window.React = require('react');
var Router = require('react-router');
var routes = require('routes');
var ajax = require('ajax');

require('../../public/css/style.css');

var { flux } = require('flux');

ajax.postHook(
    function(res) { return res.data; },
    function(res) { throw JSON.parse(res.response); }
);

Router.run(routes, Router.HistoryLocation, function(Handler) {
    React.render(<Handler />, document.getElementById('app-wrapper'));
});
