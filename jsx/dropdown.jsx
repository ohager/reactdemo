define(['react'], function (React) {

	var DropDown = React.createClass({

		propTypes : {
			id : React.PropTypes.string.isRequired,
			title : React.PropTypes.string.isRequired,
			onChange : React.PropTypes.func.isRequired,
			width : React.PropTypes.string.isRequired,
			options : React.PropTypes.array.isRequired,
			tooltip : React.PropTypes.string,
			required : React.PropTypes.bool
		},


		render: function () {

			var widthstyle = 'form-group col-xs-' + this.props.width + ' col-sm-' + this.props.width ;
			var isRequiredIcon =  this.props.required ? <span className="glyphicon glyphicon-hand-left"  title="Campo obrigatório" aria-hidden="true"></span> : null;
			var options = this.props.options.map(function (option, index) {
					return <option key={index} value={option.value}>{option.text}</option>
				}
			);

			return (
				<div className={widthstyle}>
					<label htmlFor={this.props.id}>{this.props.title}&nbsp;{isRequiredIcon}</label>
					<select id={this.props.id} className="form-control" required={this.props.required} onChange={this.props.onChange} title={this.props.tooltip}>
                     {options}
					</select>
				</div>
			);
		}
	});

	return DropDown;
});
