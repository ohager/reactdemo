define(['react'], function (React) {

	var CheckboxInput = React.createClass({displayName: "CheckboxInput",

		propTypes: {
			id: React.PropTypes.string.isRequired,
			title: React.PropTypes.string.isRequired,
			width: React.PropTypes.string.isRequired,
			checked : React.PropTypes.bool.isRequired,
			onChange: React.PropTypes.func.isRequired,
			noLabel : React.PropTypes.bool,
			required: React.PropTypes.bool,
			tooltip : React.PropTypes.string
		},
		getInitialState : function(){
			return {checked : this.props.checked}
		},
		onToggle : function(event){
			this.setState({checked : !this.state.checked});
			this.props.onChange(event);
		},

		render: function () {

			var widthStyle = 'form-group col-xs-' + this.props.width + ' col-sm-' + this.props.width ;
			var isRequiredIcon =  this.props.required ? React.createElement("span", {className: "glyphicon glyphicon-hand-left", title: "Campo obrigatório", "aria-hidden": "true"}) : '';
            var label = this.props.noLabel ? '' : <label htmlFor={this.props.id}>{this.props.title}&nbsp;{isRequiredIcon}</label>;
          
			return (
                                
                  <div className={widthStyle}>
                  {label}
                    <div className="onoffswitch">              
                      <input type="checkbox"
                          className="onoffswitch-checkbox"
                          id={this.props.id}                          
                          onChange={this.onToggle}
                          required={this.props.required}						
                          title ={this.props.tooltip}
	                      checked = {this.state.checked}
	                      value = {!this.state.checked} // is inverted
                      />
                          <label className="onoffswitch-label" htmlFor={this.props.id}>
                            <span className="onoffswitch-inner"></span>
                            <span className="onoffswitch-switch"></span>
                          </label>              
                  </div>
		      </div>
			);
		}
	});

	return CheckboxInput;

});

