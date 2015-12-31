define(function (require) {

        var isMobile = true;

        var React = require('react');
        var MessageHandler = require('common/messagehandler');

        React.createResponsiveClass = function(desc){

            desc.render = isMobile
                ? function(){ return <div/> } : desc.render;

            return React.createClass(desc);
        };

        return React.createResponsiveClass( {

            getInitialState: function () {
                return {text: 'Test'}
            },

            render: function () {

                return (
                    <div>
                        <h1>{this.state.text}</h1>
                    </div>
                )
            }
        });
    });
