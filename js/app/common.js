requirejs.config({
    baseUrl: 'js/lib',
    paths: {
        app: '../app',
        bootstrap: 'bootstrap.min',
        react: 'react-with-addons', // for development only
	    reactrouter: 'react-router.min',
        restservice: '../rest-services',
        component: '../views/components',
        common: '../app/common',
        eventemitter: 'eventemitter.min',
        jquery : 'jquery',
        jqueryMask : 'jquery.inputmask.bundle.min',
        nanoflux: 'nanoflux.min',
        snabbt: 'snabbt.min'
    },
    waitSeconds: 20,
    shim: {
        'jqueryMask': {
	        deps: ['jquery']
        },
	    'bootstrap':{
		    deps: ['jquery']
	    },
	    'reactrouter':{
		    deps: ['react'],
		    exports: 'ReactRouter'
	    }
    }
});


require(['jquery', 'bootstrap', 'react'], function($, _b, React){

    // initial load
	window.React = React;
    window.Global = {
        githubUrl: "http://github.com/ohager/reactdemo",
        githubSourcePath: "https://github.com/ohager/reactdemo/blob/master/js/views/components/canvas"
    };

    //polyfills

    if (!Array.prototype.findIndex) {
        Array.prototype.findIndex = function(predicate) {
            if (this === null) {
                throw new TypeError('Array.prototype.findIndex called on null or undefined');
            }
            if (typeof predicate !== 'function') {
                throw new TypeError('predicate must be a function');
            }
            var list = Object(this);
            var length = list.length >>> 0;
            var thisArg = arguments[1];
            var value;

            for (var i = 0; i < length; i++) {
                value = list[i];
                if (predicate.call(thisArg, value, i, list)) {
                    return i;
                }
            }
            return -1;
        };
    }

});