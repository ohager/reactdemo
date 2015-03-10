define(['react'], function (React) {

	var EmailInput = React.createClass({

		render: function () {

			var widthstyle = 'form-group col-xs-' + this.props.width + ' col-sm-' + this.props.width ;
			return (

				<div className={widthstyle}>
					<label htmlFor={this.props.id}>{this.props.title}</label>
					<input type="email"
						className="form-control"
						id={this.props.id}
						placeholder="ex. mail@minhaempresa.com.br"
						onChange={this.props.onChange}
						required={this.props.required === 'true'}
						maxLength={100}
					/>
				</div>
			);
		}
	});

	return EmailInput;

});

