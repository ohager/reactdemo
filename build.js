// build configuration for requirejs optimizer
{
    appDir: './',
    baseUrl : 'js/lib',
    skipDirOptimize: true,
    removeCombined: true,
    optimizeCss: 'standard',
    fileExclusionRegExp: /^node_modules$/,
    paths : {
        app: '../app',
        bootstrap: 'bootstrap.min',
        bootstrapswitch: "bootstrap-switch.min",
        bootstrapswitchhighlight: "highlight",
        bootstrapswitchmain: "main",
        eventemitter: 'eventemitter.min',
        react: 'react-with-addons.min',
        reactrouter: 'react-router.min',
        restservice: '../rest-services',
        component: '../views/components',
        jquery : 'jquery',
        jqueryMask : 'jquery.inputmask.bundle.min',
        common: '../app/common',
        nanoflux: '../../node_modules/nanoflux/dist/nanoflux.min'
    },
    dir: './release-build',
        modules : [
            {
                //module names are relative to baseUrl
                name: 'app/common',
                //List common dependencies here. Only need to list
                //top level dependencies, "include" will find
                //nested dependencies.
                include: [
                    'jquery',
                    'bootstrap',
                    'bootstrapswitch',
                    'bootstrapswitchhighlight',
                    'bootstrapswitchmain',
                    'react',
                    'q',
                    'common/http',
                    'common/messagehandler',
                    'common/event',
                    'common/router',
                    'common/uriparser',
                    'common/actionprovider',
                    'app/config',
                    'restservice/auth.service',
                    'common/animation',
                    'common/maskdefinitions'
                    ]
            },
            {
                //module names are relative to baseUrl/paths config
                name: 'app/login',
                exclude: ['app/common'],
                include: [
                    'app/login'
                ]

            },
            {
				//module names are relative to baseUrl/paths config
				name: 'app/main',
				exclude: ['app/common'],
				include: [
					'app/main'
				]

			}
        ]
}