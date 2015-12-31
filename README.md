# Example Project for ReactJS

A collection of example to demonstrate ReactJS capabalities. It also serves as playground!

Live Demo at https://www.devbutze.com/dojo/react

This project uses

- requirejs, as AMD dependency resolver (also used for minification)
- react, for component driven Web UI
- react-router , for React-based routing
- event-emitter, as event system
- q, as promise API
- jquery, just as dependency, or if you really need it
- jquery.inputmask, jquery plugin for input masking

# Installation

Install [node.js](http://nodejs.org/download/) to get ``npm``.

After successfull installation just call to get all packages

``npm install``


# Build

For starting the jsx-watcher to build modified JSX files continuously just call ``npm run jsx-watch``.
A single JSX run you execute with ``npm run jsx``

To create a javscript bundle simply call ``npm run optimize``.
If you want to make a complete deploy you may use the ``.\build.bat`` script (A Bash shell will follow someday).


