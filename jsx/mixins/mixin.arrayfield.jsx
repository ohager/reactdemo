define(['common/event', 'common/actionprovider'], function ($event, $actionProvider) {

	return {

		createId : function(name){
			return name + '-' + this.props.id;
		},

		extractNameFromId : function(id){
			return id.replace('-' + this.props.id, '');
		}

	};
});