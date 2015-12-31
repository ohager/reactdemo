define(function (require) {

        var isMobile = true;

        var React = require('react');
        var MessageHandler = require('common/messagehandler');

        React.createResponsiveClass = function(desc){

            desc.render = isMobile
                ? function(){ return React.createElement("div", null) } : desc.render;

            return React.createClass(desc);
        };

        return React.createResponsiveClass( {

            getInitialState: function () {
                return {text: 'Test'}
            },

            render: function () {

                return (
                    React.createElement("div", null, 
                        React.createElement("h1", null, this.state.text)
                    )
                )
            }
        });
    });
