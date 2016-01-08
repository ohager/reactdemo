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
            return { actions : [] }
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

        removeIndicator : function(){
            //this.setState( {action : null} );
        },

        render: function () {

            return (
                <div>{
                    this.state.actions.map(function(action, index){
                            return <ClickIndicator key={index} name={action.name} position={action.pos}/>
                        })
                    }
                </div>
            )
        }
    })
});
