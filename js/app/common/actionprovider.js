define(function(){

	var ActionProvider = {

		getAction: function (name, func) {
			switch (name) {
				case "remove" :
					return {
						do: func,
						tooltip: "Excluir",
						icon: "glyphicon glyphicon-remove"
					};
				default:
					throw "Action '" + name + "' not defined!";
			}
		}
	};

	return {
		get : function(name, func){
			return ActionProvider.getAction(name, func);
		}
	}

});