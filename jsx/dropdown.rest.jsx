define(['react'], function (React) {

		var DropDownRest = React.createClass( {

			propTypes: {
				id: React.PropTypes.string.isRequired,
				title: React.PropTypes.string,
				descriptor: React.PropTypes.string.isRequired,
				restservice: React.PropTypes.any.isRequired,
				onChange: React.PropTypes.func.isRequired,
				width: React.PropTypes.string.isRequired,
				tooltip: React.PropTypes.string,
				tooltipoDescriptor: React.PropTypes.string,
				required: React.PropTypes.bool,
				defaultValue: React.PropTypes.string
			},

			getInitialState: function () {
				return {options: []};
			},

			componentWillMount: function () {

				this.props.restservice.getAll().then(function (options) {
						this.setState({options: options});
					}.bind(this)
				)
			},

			nullFunc : function(){},

			render: function () {
				var widthstyle = 'form-group col-xs-' + this.props.width + ' col-sm-' + this.props.width ;
				var isRequiredIcon = this.props.required ? <span className="glyphicon glyphicon-hand-left"  title="Campo obrigatório" aria-hidden="true"></span> : null

				var options = this.state.options.map(function (option, index) {
					var tooltip = this.props.tooltipDescriptor ? option[this.props.tooltipDescriptor] : null;
					return <option title={tooltip} key={index} value={option.codigo}>{option[this.props.descriptor]}</option>
				}.bind(this));

				var label = this.props.title ? <label htmlFor={this.props.id}>{this.props.title}&nbsp;{isRequiredIcon}</label> : '';


				return (
					<div className={widthstyle}>
						{label}
						<select id={this.props.id} className="form-control"
							onBlur={this.props.onBlur?this.props.onBlur:this.nullFunc}
							onChange={this.props.onChange?this.props.onChange:this.nullFunc}
							title={this.props.tooltip}
							required={this.props.required}
							defaultValue={this.props.defaultValue}
						>
							<option value={null}>- Selecionar -</option>
                            {options}
						</select>
					</div>
				);
			}
		});

		return DropDownRest;

	}
);