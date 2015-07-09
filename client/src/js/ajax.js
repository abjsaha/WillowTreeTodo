'use strict';

var _ = require('ramda');
var Promise = require('bluebird');
var xr = require('xr');

var preCallbacks = [];
var postCallbacks = [];

/**
 * Simple constructor function that
 * manages concurrnet XHR requests.
 *
 * @class RequestManager
 */
var requestManager = (function() {

    var requestHash = {};

    /**
     * Checks the current request and aborts
     * it, then adds the current request to the slot.
     *
     * @param {Object} request Reqwest object
     * @method addRequest
     */
    var addRequest = function(name, request) {
        var storedRequest = requestHash[name];

        if (storedRequest) {
            storedRequest.cancel();
        }

        request.finally(() => requestHash[name] = null);

        requestHash[name] = request;
    };

    return addRequest;

})();

/**
 * Turns an object into a URL-safe query string.
 *
 * @method serializeQueryParams
 * @return {String}
 */

var serializeQueryParams = function(obj) {
    obj = obj || {};
   var str = [];
   for(var p in obj){
       if (obj.hasOwnProperty(p)) {
           str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
       }
   }
   return '?'+str.join("&");
};

/**
 * Helper method that ensures options are passed
 * in as an object or will be set as an object.
 *
 * @param {Object} options
 *
 * @method setOptionsHash
 * @return {Object} options
 */
var setOptionsHash = function(options) {
    options = options || {};

    if (_.type(options) !== 'Object') {
        return {};
    }

    return options;
};

/**
 * Helper function that takes in a headers object and
 * merges it with app default headers.
 *
 * @param {Object} headers
 *
 * @method buildHeaders
 * @return {Object}
 */
var buildHeaders = function(headers) {
    return setOptionsHash(headers);
};

/**
 * Wrapper around `reqwest` (XHR library)
 * that return a promise with the server response.
 *
 * @method buildRequest
 * @return {Promise}
 */
var buildRequest = function(options) {
    options = setOptionsHash(options);

    /**
     * Options
     *                            DEFAULTS
     *
     * route        (Required)
     * queryParams  (Optional)
     * type         (Optional)    'json'
     * method       (Required)
     * data         (Optional)
     * contentType  (Optional)    'application/x-www-form-urlencoded'
     * crossOrigin  (Optional)    false
     */
    options = _.merge({
        route: '',
        queryParams: '',
        type: 'json',
        method: '',
        data: null,
        contentType: 'application/x-www-form-urlencoded',
        accept: 'application/json',
        headers: {}
        //crossOrigin: false
    }, options);

    options.headers['Content-Type'] = options.contentType;
    options.headers.Accept = options.accept;

    var requestOptions = {
        url: options.route,
        type: options.type,
        method: options.method,
        data: options.data,
        contentType: options.contentType,
        crossOrigin: options.crossOrigin,
        headers: buildHeaders(options.headers),
        promise: Promise,
        raw: _.is(FormData, options.data),
        queryParams: options.queryParams
    };

    // Allow all preHooks to modify the request options before execution
    var finalizedOptions = _.reduce(function(options, callback) {
        return callback(options);
    }, requestOptions, preCallbacks);

    finalizedOptions.url = finalizedOptions.url + serializeQueryParams(finalizedOptions.queryParams || '');

    var request = xr(finalizedOptions)
                    .cancellable()
                    .catch(
                        Promise.CancellationError,
                        function() { /* no-op */ }
                    );

    // If the user wants to queue this, send it to the requestManager
    if (options.queueRequest) {
        requestManager(options.queueRequest, request);
    }

    // Allow all postHooks to tap into the promise before passing it back
    return _.reduce(function(promise, [success, error]) {
        return promise.then(success, error);
    }, request, postCallbacks);
};


// Public interface. Unified API between gets and posts/puts,
// all data is passed in as an object.
var AJAX = {

    get: function(route, params, options) {
        options = setOptionsHash(options);

        var defaults = {
            route: route,
            queryParams: params,
            method: xr.Methods.GET
        };

        return buildRequest(_.merge(defaults, options));
    },

    post: function(route, data, options) {
        options = setOptionsHash(options);

        var defaults = {
            route: route,
            contentType: 'application/json',
            data: data,
            method: xr.Methods.POST
        };

        return buildRequest(_.merge(defaults, options));
    },

    put: function(route, data, options) {
        options = setOptionsHash(options);

        var defaults = {
            route: route,
            contentType: 'application/json',
            accept: 'application/json',
            data: data,
            method: xr.Methods.PUT
        };

        return buildRequest(_.merge(defaults, options));
    },

    del: function(route, data, options) {
        options = setOptionsHash(options);

        var defaults = {
            route: route,
            contentType: 'application/json',
            data: data,
            method: xr.Methods.DELETE
        };

        return buildRequest(_.merge(defaults, options));
    },

    preHook: function(fn) {
        preCallbacks.push(fn);
    },

    postHook: function(success, err) {
        postCallbacks.push([success, err]);
    },

    serializeQueryParams: serializeQueryParams

};

module.exports = AJAX;
