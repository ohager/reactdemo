requirejs.config({
    baseUrl: 'js/lib',
    paths: {
        app: '../app',
        bootstrap: 'bootstrap.min',
        react: 'react-with-addons', // for development only
        delorean: 'delorean',
	    reactrouter: 'react-router.min',
        restservice: '../rest-services',
        component: '../views/components',
        common: '../app/common',
        eventemitter: 'eventemitter.min',
        jquery : 'jquery',
        jqueryMask : 'jquery.inputmask.bundle.min',
        nanoflux: 'nanoflux.min'
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
});