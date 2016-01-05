define(function (require) {

    require('component/fluxsimulator/fluxconfig');
    var React = require('react');
    var NanoFlux = require('nanoflux');
    var ActionIndicator = require('component/fluxsimulator/action.indicator');

    return React.createClass({

        visualizationStore: NanoFlux.getStore('visualizationStore'),
        userActions: NanoFlux.getActions('visualizationActions'),
        _subscription: null,

        getInitialState: function () {
            return { action : null }
        },

        onActionTriggered: function (action) {
            if(this.isMounted()) {
                this.setState({action : action});
            }
        },

        componentWillMount: function () {
            this.visualizationStore.subscribe(this, this.onActionTriggered);
        },

        componentDidMount: function () {
        },

        componentWillUnmount: function () {
        },

        removeIndicator : function(){
            this.setState( {action : null} );
        },


        render: function () {

            return (
                <div>{
                        this.state.action ? <ActionIndicator name={this.state.action.name} position={this.state.action.pos} onAnimationEnd={this.removeIndicator}/> : null
                    }
                </div>
            )
        }
    })
});
