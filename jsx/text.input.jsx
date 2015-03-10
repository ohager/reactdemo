define(['react', 'jquery', 'jqueryMask'], function (React, $, jqueryMask) {

	var TextInput = React.createClass({

		propTypes: {
			id: React.PropTypes.string.isRequired,
			title: React.PropTypes.string.isRequired,
			width: React.PropTypes.string.isRequired,
			type : React.PropTypes.string,
			required: React.PropTypes.bool,
			onChange: React.PropTypes.func,
			onBlur: React.PropTypes.func,
			placeholder: React.PropTypes.string,
			pattern: React.PropTypes.string,
			tooltip: React.PropTypes.string,
			maxLength: React.PropTypes.number,
			mask: React.PropTypes.object,
			defaultValue: React.PropTypes.string
		},

		getInitialState : function(){
			return {};
		},

		onFocus: function (event) {
			if(!this.props.mask)
				return;

			var id = '#' + this.props.id;
			var element = $(id)[0];
			$(element).inputmask(this.props.mask);

		},

		render: function () {

			var widthStyle = 'form-group col-xs-' + this.props.width + ' col-sm-' + this.props.width ;
			var isRequiredIcon = this.props.required ? <span className="glyphicon glyphicon-hand-left"  title="Campo obrigatório" aria-hidden="true"></span> : '';
			return (

				<div className={widthStyle}>
					<label htmlFor={this.props.id}>{this.props.title}&nbsp;{isRequiredIcon}</label>
					<input type={this.props.type ? 'text' : this.props.type}
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
						mask={this.props.mask}
						defaultValue = {this.props.defaultValue}
					/>
				</div>
			);
		}
	});

	return TextInput;

});
