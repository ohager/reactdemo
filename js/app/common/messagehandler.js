define( ['common/event'], function($event){
	const MESSAGE_TIMEOUT_SECONDS = 5; // 0 to disable message vanishing
	const SUCCESS_TIMEOUT_SECONDS = 3; // 0 to disable message vanishing

    return {
	    showError : function(message){
		    $event.emitEvent('show-notification' ,[{
			    type : 'danger',
			    message : message,
			    secondsToVanish : MESSAGE_TIMEOUT_SECONDS
		    }])
	    },

	    showWarning : function(message){
		    $event.emitEvent('show-notification' ,[{
			    type : 'warning',
			    message : message,
			    secondsToVanish : MESSAGE_TIMEOUT_SECONDS
		    }])
	    },

	    showSuccess : function(message){
		    $event.emitEvent('show-notification' ,[{
			    type : 'success',
			    message : message,
			    secondsToVanish : SUCCESS_TIMEOUT_SECONDS
		    }])
	    },

	    showInfo : function(message){
		    $event.emitEvent('show-notification' ,[{
			    type : 'info',
			    message : message,
			    secondsToVanish : MESSAGE_TIMEOUT_SECONDS
		    }])
	    }

    }
});


