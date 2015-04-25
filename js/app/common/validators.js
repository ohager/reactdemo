define(['jquery', 'jqueryMask', 'common/maskdefinitions', 'app/config', 'common/validators/validator.cnpj', 'common/validators/validator.cpf'], function ($jquery, __mask, $maskdefinitions, $config, $validatorCnpj, $validatorCpf) {

	var Validator = new function() {
		function markInvalid(j) {
			j.addClass('invalid');
		}

		function unmarkInvalid(j) {
			j.removeClass('invalid');
		}

		// TODO: validating using input mask does not work as exepcted!
		this.validateMask = function (event, maskdefinition) {
			var j = $jquery(event.target);
			var value = j.val();
			var isValid = $jquery.inputmask.isValid(value, {mask: maskdefinition});
			if (isValid) {
				unmarkInvalid(j);
			} else {
				markInvalid(j);
				event.preventDefault();
			}
		};

		this.validateGeneric = function(event, constraint) {
			var j = $jquery(event.target);
			var unmasked = j.val();
			var isValid = constraint(unmasked);
			if (isValid) {
				unmarkInvalid(j);
			} else {
				markInvalid(j);
				event.preventDefault();
			}
		};

		this.validateRegex = function(event, regex) {
			this.validateGeneric(event, function (unmasked) {
				return regex.test(unmasked)
			});
		}
	};

	var Rx = {
		CEP : /^\d{8}$/,
		NOT_EMPTY : /^.+$/,
		EMAIL : /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
		PHONE : /^\d{10}$/,
		CELLPHONE : /^\d{10,11}$/
	};

	return {
		test:{
			cep: function(cep){
				return Rx.CEP.test(cep);
			},
			nonEmpty: function(text){
				return text!==undefined && text!==null && Rx.NOT_EMPTY.test(text);
			},
			phone: function(text){
				return Rx.PHONE.test(text);
			},
			cellphone: function(text){
				return Rx.CELLPHONE.test(text);
			},
			email: function(text){
				return Rx.EMAIL.test(text);
			}
		},
		validateMinimumCurrency: function(event){
			Validator.validateGeneric(event, function(unmasked) { return unmasked >= 0.01; });
		},
		validateNonEmpty: function (event) {
			Validator.validateRegex(event, Rx.NOT_EMPTY);
		},
		validateCep: function (event) {
			Validator.validateRegex(event, Rx.CEP);
		},
		validateEmail: function (event) {
			Validator.validateRegex(event, Rx.EMAIL);
		},
		validateFone: function (event) {
			Validator.validateRegex(event, Rx.PHONE);
		},
		validateCelular: function (event) {
			Validator.validateRegex(event, Rx.CELLPHONE);
		},
		validateCnpj : function (event){
			Validator.validateGeneric(event, function(unmasked) { return $validatorCnpj.isValid(unmasked)});
		},
		validateCpf : function (event){
			Validator.validateGeneric(event, function(unmasked) { return $validatorCpf.isValid(unmasked)});
		}
	}

});