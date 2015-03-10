define(['react',
		'component/accordion',
		'component/mixins/mixin.arrayfield',
		'component/email.input',
		'component/text.input',
		'component/dropdown',
		'jquery',
		'jqueryMask',
		'common/maskdefinitions'],

		function(React, Accordion, MixinArrayField, EmailInput, TextInput, DropDown, $jquery, __mask, $maskdefinitions){

		var ContactField = React.createClass({

			mixins : [MixinArrayField],

				propTypes : {
					id : React.PropTypes.string.isRequired,
					onChange : React.PropTypes.func.isRequired,
					defaultModel : React.PropTypes.object
				},

				componentWillReceiveProps : function(newProps){
						var model = newProps.defaultModel ? newProps.defaultModel : {};
						this.setState({contact: model });
				},

				getInitialState : function(){
					return {isExpanded : false, contact: {}}
				},

				getDefaultValue : function(field){
					return this.state.contact ? this.state.contact[field] : '';
				},

				getValueFromTarget : function(target){
					return $jquery(target).val(); // unmask
				},

				contactChange : function(event){
					var field = this.getFieldNameFromTarget(event.target);
					this.state.contact[field] = this.getValueFromTarget(event.target);
					this.forceUpdate();
					if(this.props.onChange) {
						this.props.onChange(this.state.contact, this.props.id);
					}
				},


			render :  function(){

					return (
						<Accordion id={this.createId("contact")} title="Contato">
							<div className="row">
								<TextInput type="text" id={this.createId('nome')} onBlur={this.contactChange} title="Nome" width="12" required={this.state.isExpanded} defaultValue={this.getDefaultValue('nome')}/>
							</div>
							<div className="row">
								<EmailInput id={this.createId('email')} onBlur={this.contactChange}  title="E-Mail"  width="12" defaultValue={this.getDefaultValue('email')}/>
							</div>
							<div className="row">
								<TextInput ref="fone" id={this.createId('fone')}  onBlur={this.contactChange}  title="Fone" width="6" mask={$maskdefinitions.phone} defaultValue={this.getDefaultValue('fone')}/>
								<TextInput ref="celular" id={this.createId('celular')} onBlur={this.contactChange} title="Celular" width="6" mask={$maskdefinitions.cellphone} defaultValue={this.getDefaultValue('celular')}/>
							</div>
							<div className="row">
								<TextInput id={this.createId('cargo')} onBlur={this.contactChange} title="Cargo" width="12" defaultValue={this.getDefaultValue('cargo')}/>
	                        </div>
						</Accordion>
					)
				}

			});

		return ContactField;
	}
);
