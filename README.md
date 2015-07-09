#React Todo List

##Overview

The react-boilerplate is a collection of configuration files and organization
conventions designed to ease the process of bootstrapping new javascript heavy
web applications at WTA. It uses [gulp](http://gulpjs.com/) as a build tool
and [sass](http://sass-lang.com/) to generate CSS. Both tools require
some minimal setup.

##Installation

0. Clone this repo and point it at a new git repository for your project.

1. Install [node](http://nodejs.org/). If you're on OSX, there's a handy pkg
   installer available on the node homepage. This is the recommended method of
   installation.

2. If you are running windows, you will need to install some version of
   visual studio ([visual studio comunity](https://www.visualstudio.com/en-us/products/visual-studio-express-vs.aspx) is free) as well as [python 2.7](https://www.python.org/download/releases/2.7/).

3. Install the gulp CLI as a global node package. `npm install -g gulp`

4. Install the dependencies for your project. From the root of this repo, run
   `npm install`. This will read the packages.json file and install packages
   into `./node_modules`.

5. Configure your application in `config.js`:

    - `apiFallback`: This is the url of the API you are pointing to.
    - `portFallback`: This is the port you will access the web server on.
    it defaults to `http://localhost:9000`.

6. Start the development server with `gulp`.

##Editor Choices

- [Sublime Text](http://www.sublimetext.com/): One of the most popular cross platform text editors
- [Notepad ++](https://notepad-plus-plus.org/): Another popular windows editor
- [Webstorm](https://www.jetbrains.com/webstorm/): An IDE usefull for JavaScript

##Library Documentation

###[React](https://facebook.github.io/react/docs/getting-started.html):

React has a lot going on. We have pulled out some crucial
information with links to its corresponding docs to help you out.

- Lifecycle methods [link](https://facebook.github.io/react/docs/component-specs.html)
- Getting values from an input [link](https://facebook.github.io/react/docs/working-with-the-browser.html)
- When to use state and when to use props [link](https://facebook.github.io/react/docs/thinking-in-react.html)
- Gotchas [link](https://facebook.github.io/react/docs/jsx-gotchas.html)

###[react-router](https://github.com/rackt/react-router)

For route management (as well as screen management) we use react-router.
Here are the docs just in case you dive into deeper functionality.

###[Fluxxor](http://fluxxor.com/) and [Tuxxor](https://github.com/willowtreeapps/tuxxor):

The foundation of our Flux architecture is based on Fluxxor. We layered
on a minimal amount of additional functionality, read the Tuxxor docs
for more information.

###[Bluebird](https://github.com/petkaantonov/bluebird):

To shim promises for older browsers, we use bluebird. In general, you
shouldn't need to create promises. When making ajax requests you can
tap into the promise given and go from there.

    var Promise = require('bluebird');
    var newPromise = new Promise(function(resolve, reject) {
        // Do your async stuff here
        resolve({ name: 'jim' });
    });
    newPromise.then(function(person) { console.log(person); });

###Ajax

For communicating with external servers we use a wrapper around the
[xr](https://github.com/radiosilence/xr) ajax library. You can find this file in `client/src/js/ajax.js`.
Here are the primary methods it gives you:

- `get(<String>route, [<Object>parameters], [<Object>options])`
- `post`: `post(<String>route, <Object>data, [<Object>options])`
- `put`: `put(<String>route, <Object>data, [<Object>options])`
- `del`: `del(<String>route, [<Object>data], [<Object>options])`

The `<String>route` in each of these commands is the url of the service
you are tying to hit. To get past cross origin requests we use a
proxy to filter out our API calls. The `apiFallback` variable in your
`config.js` file should point to the base of your service. You then
prefix your `route` with `/api/` and your requests will get proxied.

    // apiFallback = 'localhost:9000'
    ajax.get('/api/tasks', { completed: true });
    // localhost:9000/tasks?completed=true

Additionally, all ajax requests return promises which you can then chain.

    ajax.get('/api/tasks')
        .then(function(tasks) { console.log(tasks); });
