define(function (require) {

	var React = require('react');

	return React.createClass({

		propTypes: {
			id: React.PropTypes.string.isRequired,
			title: React.PropTypes.string,
			width: React.PropTypes.string.isRequired,
			required: React.PropTypes.bool,
			onChange: React.PropTypes.func,
			onBlur: React.PropTypes.func,
			placeholder: React.PropTypes.string,
			tooltip: React.PropTypes.string,
			maxLength: React.PropTypes.number,
			defaultValue: React.PropTypes.string,
			autoComplete: React.PropTypes.bool
		},

		getInitialState: function () {
			return {passwordVisible:false};
		},

		togglePasswordVisibility : function(){
			this.setState({passwordVisible : !this.state.passwordVisible});
		},

		render: function () {

			var widthStyle = 'form-group col-xs-' + this.props.width + ' col-sm-' + this.props.width;
			var isRequiredIcon = this.props.required ? <span className="glyphicon glyphicon-hand-left"  title="Campo obrigatório" aria-hidden="true"></span> : '';
			return (

				<div className={widthStyle}>
									{
										this.props.title ?
											<label htmlFor={this.props.id}>{this.props.title}&nbsp;{isRequiredIcon}</label>
											: null
										}

					<div className="input-group">
						<input type={this.state.passwordVisible ? 'text' : 'password'}
							className="form-control"
							id={this.props.id}
							placeholder={this.props.placeholder ? this.props.placeholder : this.props.title}
							onFocus={this.onFocus}
							onChange={this.props.onChange}
							onBlur={this.props.onBlur}
							required={this.props.required}
							title ={this.props.tooltip}
							maxLength={this.props.maxLength}
							defaultValue = {this.props.defaultValue}
							autoComplete= {this.props.autoComplete ? 'on' : 'off'}
						/>
						<span className="input-group-btn">
							<button type="button" className="btn btn-link" onClick={this.togglePasswordVisibility}>
								<span className={this.state.passwordVisible ? "glyphicon glyphicon-eye-close" : "glyphicon glyphicon-eye-open"} aria-hidden="true" title={this.state.passwordVisible ? "Esconder senha" : "Mostrar senha"}></span>
							</button>
						</span>
					</div>
				</div>
			);
		}
	});

});
