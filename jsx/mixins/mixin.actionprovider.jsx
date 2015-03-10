define(['common/event', 'common/actionprovider'], function ($event, $actionProvider) {

	return {
		ActionProvider : {
			getActions: function () {
				var actions = [];
				actions.push($actionProvider.get('remove', function () {
					$event.emitEvent('action-remove');
				}));
				return actions;
			}
		}
	};
});