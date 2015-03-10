define(['react', 'jquery', 'jqueryMask', 'common/maskdefinitions', 'restservice/generic.service'], function (React, $, jqueryMask, $maskdefinitions, GenericService) {

	var CepInput = React.createClass({

		cepMask: $maskdefinitions.cep,

		propTypes: {
			id: React.PropTypes.string.isRequired,
			title: React.PropTypes.string.isRequired,
			width: React.PropTypes.string.isRequired,
			required: React.PropTypes.bool,
			onChange: React.PropTypes.func,
			onBlur: React.PropTypes.func,
			placeholder: React.PropTypes.string,
			pattern: React.PropTypes.string,
			tooltip: React.PropTypes.string,
			maxLength: React.PropTypes.number,
			onCep: React.PropTypes.func
		},

		getInitialState: function () {
			return {};
		},

		onFocus: function (event) {
			var id = '#' + this.props.id;
			var element = $(id)[0];
			$(element).inputmask(this.cepMask);
		},
		searchCep: function (event) {
			var cepInput = this.refs.cepInput.getDOMNode();
			var cep = $(cepInput).val(); // unmasked

			if (!cep) {
				event.preventDefault();
				return;
			}

			if (!this.props.onCep) {
				event.preventDefault();
				console.warn("CEP.INPUT: No callback defined!");
				return;
			}

			new GenericService('/endereco/cep/' + cep).getAll()
				.then(this.props.onCep)
				.catch(function () {
					this.props.onCep(null)
				});
		},

		render: function () {

			var widthStyle = 'form-group col-xs-' + this.props.width + ' col-sm-' + this.props.width;
			var isRequiredIcon = this.props.required ? <span className="glyphicon glyphicon-hand-left"  title="Campo obrigatório" aria-hidden="true"></span> : '';
			return (
              <div className={widthStyle}>
                <label htmlFor={this.props.id}>{this.props.title}&nbsp;{isRequiredIcon}</label>
                <div className="input-group">
					<input
						ref='cepInput'
						type='text'
						className="form-control"
						id={this.props.id}
						placeholder={this.props.placeholder ? this.props.placeholder : this.props.title}
						onFocus={this.onFocus}
						onChange={this.props.onChange}
						onBlur={this.props.onBlur}
						required={this.props.required}
						pattern={this.props.pattern}
						title ={this.props.tooltip}
						maxLength={this.props.maxLength}
						mask={this.cepMask}
					/>
                    <span className="input-group-btn">
                      <button type="button" className="btn btn-link" onClick={this.searchCep}>
                          <span className="glyphicon glyphicon-search" aria-hidden="true"></span>
                      </button>
                  </span>
				</div>
              </div>                                     
			);
		}
	});

	return CepInput;

});
