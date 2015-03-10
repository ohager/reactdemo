define(['react', 'common/event', 'common/validators', 'jquery', 'jqueryMask', 'common/maskdefinitions', 'restservice/generic.service', 'component/details/detail.item', 'component/details/detail.section'],
	function (React, $event, $validators, jquery, __mask, $maskdefinitions, GenericService, DetailItem, DetailSection) {

		/*
		"codigo": 1,
		"nome": "Andresa",
		"email": "andresa.sv@hotmail.com",
		"fone": "19981097407",
		"celular": "19981097407",
		"cargo": "Compradora"
	*/

		var DetailSectionContact = React.createClass({

			_internalContact: null,

			propTypes: {
				id : React.PropTypes.string.isRequired,
				contact: React.PropTypes.object,
				onContactChange: React.PropTypes.func.isRequired
			},

			initializeContact: function (contact) {
					this._internalContact = contact;
				if (!this._internalContact) {
					this._internalContact = {
						codigo : null,
						nome : '',
						email : '',
						fone : '',
						celular : '',
						cargo : ''
					}
				}
			},


			getInitialState: function () {
				return {};
			},


			componentWillMount: function () {
				this.initializeContact(this.props.contact);
			},

			componentWillReceiveProps: function (nextProps) {
				this.initializeContact(nextProps.contact);
			},
			
			getValueFromTarget: function (target) {
				return jquery(target).val(); // unmask
			},

			isValidContact: function () {
				return  $validators.test.nonEmpty(this._internalContact.nome);
			},

			changedBasic: function (event) {
				var property = event.target.id.replace('-contact-input', '');
				var oldValue = this._internalContact[property];
				var newValue = this.getValueFromTarget(event.target);

				this._internalContact[property] = newValue;
				var isValid = this.isValidContact();

				if(isValid && oldValue === newValue){
					$event.emitEvent('editor-closed');
				}

				if (isValid && oldValue !== newValue) {
					this.props.onContactChange(this._internalContact);
				}
			},

			keyPressed: function (event) {

				if (event.charCode === 13) {
					event.preventDefault();
					event.target.blur();
				}
			},

			render: function () {
				var nome = <input id="nome-contact-input" type="text" className="form-control" onBlur={this.changedBasic} onKeyUp={$validators.validateNonEmpty} onKeyPress={this.keyPressed} defaultValue={this._internalContact.nome}></input>;
				var email = <input id="email-contact-input" type="email" className="form-control" onBlur={this.changedBasic} onKeyUp={$validators.validateEmail}  onKeyPress={this.keyPressed}  defaultValue={this._internalContact.email}></input>;
				var fone = <input id="fone-contact-input" type="text" className="form-control"  onBlur={this.changedBasic} onKeyUp={$validators.validateFone}  onKeyPress={this.keyPressed} defaultValue={this._internalContact.fone} ></input>;
				var celular = <input id="celular-contact-input" type="text" className="form-control"  onBlur={this.changedBasic} onKeyUp={$validators.validateCelular}  onKeyPress={this.keyPressed}  defaultValue={this._internalContact.celular}></input>;
				var cargo = <input id="cargo-contact-input" type="text" className="form-control"  onKeyPress={this.keyPressed} onBlur={this.changedBasic} defaultValue={this._internalContact.cargo}></input>;

				return (
					<DetailSection id={this.props.id} title="Contato">
						<DetailItem editorRef='#nome-contact-input' label='Nome' editor={nome} value={this._internalContact.nome} required={true} />
						<DetailItem editorRef='#email-contact-input' label='E-Mail' editor={email} value={this._internalContact.email}/>
						<DetailItem editorRef='#fone-contact-input' label='Fone' editor={fone} value={this._internalContact.fone} mask={$maskdefinitions.phone}/>
						<DetailItem editorRef='#celular-contact-input' label='Celular' editor={celular} value={this._internalContact.celular} mask={$maskdefinitions.cellphone}/>
						<DetailItem editorRef='#cargo-contact-input' label='Cargo' editor={cargo} value={this._internalContact.cargo}/>
					</DetailSection>
				);
			}

		});

		return DetailSectionContact;
	});

