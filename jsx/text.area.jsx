define(['react'], function (React) {


	var TextArea = React.createClass({

		propTypes : {
			id : React.PropTypes.string.isRequired,
			title : React.PropTypes.string.isRequired,
			onChange : React.PropTypes.func,
			onBlur : React.PropTypes.func,
			tooltip : React.PropTypes.string,
			required: React.PropTypes.bool
		},

		render: function () {
			var isRequiredIcon =  this.props.required ? <span className="glyphicon glyphicon-hand-left"  title="Campo obrigatório" aria-hidden="true"></span> : null;

			return (
				<div className="form-group col-xs-12 col-sm-12">
					<label htmlFor={this.props.id}>{this.props.title}&nbsp;{isRequiredIcon}</label>
					<textarea className="form-control" rows="3" id={this.props.id} placeholder={this.props.title} title={this.props.tooltip} onChange={this.props.onChange} onBlur={this.props.onBlur}></textarea>
				</div>
			);
		}
	});


	return TextArea;

});
