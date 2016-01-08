define(function (require) {

    require('component/fluxsimulator/fluxconfig');
    var React = require('react');
    var NanoFlux = require('nanoflux');
    var ClickIndicator = require('component/fluxsimulator/click.indicator');

    return React.createClass({

        visualizationStore: NanoFlux.getStore('visualizationStore'),
        userActions: NanoFlux.getActions('visualizationActions'),
        _subscription: null,

        getInitialState: function () {
            return { actions : [],  }
        },

        onActionTriggered: function (action) {
            if(this.isMounted()) {
                var actions = this.state.actions;
                actions.push(action);
                this.setState({actions : actions});
            }
        },

        componentWillMount: function () {
            this.visualizationStore.subscribe(this, this.onActionTriggered);
        },

        componentDidMount: function () {
        },

        componentWillUnmount: function () {
        },

        removeIndicator : function(id){
            // cleaning up the DOM -- still buggy!
            /*
            var actions = this.state.actions;
            for(var i = 0; i<actions.length; ++i){
                if(actions[i].id === id)
                {
                    actions.splice(i,1);
                    this.state.actions = actions;
                    // update only if no action is visible anymore
                    if(!actions.length){
                        this.forceUpdate();
                    }
                    return;
                }
            }
            */
        },

        render: function () {

            return (
                React.createElement("div", null, 
                    this.state.actions.map(function(action, index){
                            return React.createElement(ClickIndicator, {key: index, name: action.name, position: action.pos, onAnimationEnd: this.removeIndicator.bind(null, action.id)})
                        }.bind(this))
                    
                )
            )
        }
    })
});
