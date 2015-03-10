define(function () {

	function toDecimal(value) {
		return value.replace('.', '').replace(',', '.') * 1.0;
	}

	function intToStr(value){
		return String(value);
	}

	return {
		email : {
			alias: "email"
		},
		integer : {
			mask: '999999999',
			clearMaskOnLostFocus: false,
			autoUnmask: true,
			placeholder : '',
			onBeforeMask : intToStr
		},
		percentage: {
			suffix: " %",
			groupSeparator: ".",
			radixPoint: ',',
			alias: "numeric",
			placeholder: "0",
			autoGroup: true,
			digits: 2,
			integerDigits: 2,
			allowPlus: false,
			allowMinus: false,
			digitsOptional: false,
			clearMaskOnLostFocus: false,
			autoUnmask: true,
			rightAlign: false,
			radixFocus: false,
			onUnMask: function (maskedValue, unmaskedValue) {
				return toDecimal(unmaskedValue);
			}
		},
		currency: {
			prefix: "R$ ",
			groupSeparator: ".",
			radixPoint: ',',
			alias: "numeric",
			placeholder: "0",
			autoGroup: true,
			digits: 2,
			allowPlus: false,
			allowMinus: false,
			digitsOptional: false,
			clearMaskOnLostFocus: false,
			autoUnmask: true,
			rightAlign: false,
			radixFocus: false,
			onUnMask: function (maskedValue, unmaskedValue) {
				return toDecimal(unmaskedValue);
			}
		},
		phone: {
			mask: '(99)9999-9999',
			clearMaskOnLostFocus: false,
			autoUnmask: true
		},
		cellphone: {
			mask: '(99)9999[9]-9999',
			clearMaskOnLostFocus: false,
			autoUnmask: true
		},
		cpf: {
			mask: '999.999.999-99',
			clearMaskOnLostFocus: false,
			autoUnmask: true
		},
		cnpj: {
			mask: '99.999.999/9999-99',
			clearMaskOnLostFocus: false,
			autoUnmask: true
		},
		cep: {
			mask: '99.999-999',
			clearMaskOnLostFocus: false,
			autoUnmask: true
		},
		exipi: {
			mask: '99',
			clearMaskOnLostFocus: false,
			autoUnmask: false
		}
	}
});
