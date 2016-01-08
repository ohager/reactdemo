define(function (require) {

    var NanoFlux = require('nanoflux');
    var userStoreDesc = require('component/fluxsimulator/user.store');
    var visualizationStoreDesc = require('component/fluxsimulator/visualization.store');
    var dispatcher = NanoFlux.getDispatcher('simulatorDispatcher');
    var MouseListener = require('common/mouselistener');


    if (dispatcher) return;


    dispatcher = NanoFlux.createDispatcher('simulatorDispatcher');

    /* simulation context */
    dispatcher.connectTo(NanoFlux.createStore('visualizationStore', visualizationStoreDesc));
    var visualizationActions = NanoFlux.createActions('visualizationActions', dispatcher, {
        _generateHandlerName : function(actionName) {
            return "on" + actionName[0].toUpperCase() + actionName.substr(1);
        },

        triggerAction : function(actionName, payload){
            var actionContext = {
                name : actionName,
                storeName : this._generateHandlerName(actionName),
                payload: payload,
                pos: MouseListener.getClickPosition()
            };
            this.dispatch('triggerAction', actionContext);
        }
    });

    /* user context */
    dispatcher.connectTo(NanoFlux.createStore('userStore', userStoreDesc));
    NanoFlux.createActions('userActions', dispatcher, {
        addUser : function(user){
            visualizationActions.triggerAction('addUser', user);
            this.dispatch('addUser', user);
        },
        removeUser : function(userId){
            visualizationActions.triggerAction('removeUser', userId);
            this.dispatch('removeUser', userId);
        },
        updateUser : function(updatedUser){
            visualizationActions.triggerAction('updateUser', updatedUser);
            this.dispatch('updateUser', updatedUser);
        },
        selectUser : function(userId){
            visualizationActions.triggerAction('selectUser', userId);
            this.dispatch('selectUser', userId);
        }
    });



});
