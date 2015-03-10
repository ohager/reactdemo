define(['react',
		'common/event',
		'jquery',
		'jqueryMask',
		'common/maskdefinitions',
		'common/validators',
		'restservice/generic.service',
		'component/details/detail.item',
		'component/details/detail.section',
		'component/checkbox.input',
		'component/array',
		'component/details/detail.section.address',
		'component/details/detail.section.contact'],
	function (React, $event, jquery, __mask, $maskdefinitions, $validators, GenericService, DetailItem, DetailSection, CheckboxInput, Array, DetailSectionAddress, DetailSectionContact) {

		var DropDownLoja = React.createClass({

			getInitialState: function () {
				return {options: []};
			},

			componentWillMount: function () {
			},

			nullFunc: function () {
			},

			render: function () {
				var options = this.props.options.map(function (option, index) {
					return <option key={index} value={option.codigo}>{option.fantasia}</option>
				}.bind(this));

				return (
					<div className="detail-component-container">
						<div className='form-group col-xs-12 col-sm-12'>
							<select id={this.props.id} className="form-control"
								onBlur={this.props.onBlur}
								title="Loja de Origem"
								defaultValue={this.props.defaultValue}
							>
                            {options}
							</select>
						</div>
					</div>

				);

			}
		});

		const PESSOA_FISICA = 'FISICA';
		const PESSOA_JURIDICA = 'JURIDICA';

		const ADDRESS_ARRAY_ID = 'detail-endereco-new';

		return React.createClass({

			_modelUpdated: false,
			_customerService: new GenericService('/customer'),


			getInitialState: function () {
				return {lojaOptions: [], tipoPessoa: this.props.model.tipoPessoa}
			},

			componentDidMount: function () {
				$event.addListener('action-remove', this.remove);
				var lojaService = new GenericService('/loja');
				lojaService.getAll().then(function (options) {
						this.setState({lojaOptions: options});
					}.bind(this)
				);

			},

			componentWillUnmount: function () {
				$event.removeListener('action-remove', this.remove);
			},

			remove: function () {
				this._customerService.remove(this.props.model.codigo).then(
					function () {
						$event.emitEvent('update-list');
					}
				)
			},


			isValid: function () {
				return this.props.model.razaoSocial != '';
			},

			saveChanges: function () {
				$event.emitEvent('editor-closed');

				// save the whole model
				if (this._modelUpdated) {
					this._customerService.update(this.props.model.codigo, this.props.model).then(function () {
						$event.emitEvent('model-changed-' + this.props.model.codigo, [this.props.model]);
						$event.emitEvent('reset-array', [ADDRESS_ARRAY_ID]);
						this.forceUpdate();
					}.bind(this));
				}
			},

			getValueFromTarget: function (event) {
				return jquery(event.target).val();
			},

			checkForModelUpdate: function (oldValue, newValue) {
				this._modelUpdated = oldValue !== newValue;
			},

			changedBasic: function (event) {
				var newValue = this.getValueFromTarget(event);
				var property = event.target.id.replace('-input', '');
				this.checkForModelUpdate(this.props.model[property], newValue);
				this.props.model[property] = newValue;

				if (this.isValid()) {
					this.saveChanges();
				}

			},

			changedTipoPessoa: function (event) {
				var newValue = this.getValueFromTarget(event);
				this.setState({tipoPessoa: newValue});
				this.changedBasic(event);
			},

			changedLojaOrigem: function (event) {
				var newValue = +this.getValueFromTarget(event); //convert to int
				this.checkForModelUpdate(this.props.model.lojaOrigem.codigo, newValue);
				this.props.model.lojaOrigem.codigo = newValue;
				this.props.model.lojaOrigem.fantasia = event.target.selectedOptions[0].text;
				if (this.isValid()) {
					this.saveChanges();
				}
			},

			changedAddress: function (newAddress, id) {
				this.props.model.enderecos[id] = newAddress;
				this._modelUpdated = true;
				this.saveChanges();
			},

			newAddress: function (address) {
				this.props.model.enderecos.push(address);
				this._modelUpdated = true;
				this.saveChanges();
			},

			changedContact: function (newContact) {
				this.props.model.contato[0] = newContact;
				this._modelUpdated = true;
				this.saveChanges();
			},

			keyPressed: function (event) {

				if (event.charCode === 13) {
					event.preventDefault();
					event.target.blur();
					this.saveChanges()
				}
			},
			/*
			 "rgIe": "405119136",
			 "razaoSocial": "Daniel Simoes Reis Felgar",
			 "fantasia": "Daniel",
			 "im": 123,
			 "suframa": 0,
			 "isentoIcms": false,
			 "ehSimples": false,
			 "observacao": "obs",
			 "email": "daniel@lojafacil.com.br",
			 "fone": "1925130851",
			 "celular": "19982337651",
			 "lojaOrigem": {
			 "codigo": 2,
			 "serieNFSe": "5"
			 },
			 "contato": [],
			 "enderecos": []

			 0: {codigo: 9, tipoEndereco: "COMERCIAL", cep: "13050410", tipoLogradouro: "Rua", endereco: "Endereco",…}
			 1: {tipoEndereco: "RESIDENCIAL", cep: "13279000", tipoLogradouro: "Rua", endereco: "Test", numero: "123",…}

			 */

			createTipoPessoaEditor: function (tipoPessoa) {
				return <select id="tipoPessoa-input" className="form-control"  onChange={this.changedTipoPessoa} onKeyPress={this.keyPressed} defaultValue={tipoPessoa}>
					<option key={0} value={PESSOA_FISICA}>Física</option>
					<option key={1} value={PESSOA_JURIDICA}>Jurídica</option>
				</select>;
			},

			renderAddressComponent: function () {

				return (
					<div>
					{
						this.props.model.enderecos.map(function (endereco, index) {
							return <DetailSectionAddress key={index} id={'detail-endereco-' + index} address={endereco} onAddressChange={this.changedAddress}/>
						}.bind(this))
						}

						<Array label = "Adicionar Novo Endereço" maxItems={1}>
							<DetailSectionAddress id={ADDRESS_ARRAY_ID} onAddressChange={this.newAddress}/>
						</Array>
					</div>
				);

			},

			renderPessoaFisica: function () {
				try {
					var tipoPessoa = this.createTipoPessoaEditor(PESSOA_FISICA);
					var razaoSocial = <input id="razaoSocial-input" type="text" className="form-control"  onBlur={this.changedBasic} onKeyPress={this.keyPressed} onKeyUp={$validators.validateNonEmpty}  defaultValue={this.props.model.razaoSocial}></input>;
					var fantasia = <input id="fantasia-input" type="text" className="form-control"  onBlur={this.changedBasic} onKeyPress={this.keyPressed} defaultValue={this.props.model.fantasia}></input>;
					var cpf = <input id="cpfCnpj-input" type="text" className="form-control"  onBlur={this.changedBasic} onKeyPress={this.keyPressed} onKeyUp={$validators.validateCpf} defaultValue={this.props.model.cpfCnpj}></input>;
					var rgIe = <input id="rgIe-input" type="text" className="form-control"  onBlur={this.changedBasic} onKeyPress={this.keyPressed} defaultValue={this.props.model.rgIe}></input>;
					var email = <input id="email-input" type="email" className="form-control"  onBlur={this.changedBasic} onKeyPress={this.keyPressed} onKeyUp={$validators.validateEmail}defaultValue={this.props.model.email}></input>;
					var celular = <input id="celular-input" type="text" className="form-control"  onBlur={this.changedBasic} onKeyPress={this.keyPressed} onKeyUp={$validators.validateCelular} defaultValue={this.props.model.celular}></input>;
					var fone = <input id="fone-input" type="text" className="form-control"  onBlur={this.changedBasic} onKeyPress={this.keyPressed} onKeyUp={$validators.validateFone} defaultValue={this.props.model.fone}></input>;
					var observacao = <textarea id="observacao-input" type="text" className="form-control"  onBlur={this.changedBasic} onKeyPress={this.keyPressed} defaultValue={this.props.model.observacao} maxLength={2048}></textarea>;
					var lojaOrigem = <DropDownLoja id="lojaOrigem-input" onBlur={this.changedLojaOrigem} options={this.state.lojaOptions} defaultValue={this.props.model.lojaOrigem.codigo}/>;

				} catch (err) {
					console.log(err);
				}

				return (

					<ul className="content-list-cards">
						<DetailItem editorRef='#tipoPessoa-input' label='Tipo de Pessoa' editor={this.props.model.cpfCnpj ? null : tipoPessoa} value={this.props.model.tipoPessoa}/>
						<DetailItem editorRef='#razaoSocial-input' label='Nome' editor={razaoSocial} value={this.props.model.razaoSocial} required={true}/>
						<DetailItem editorRef='#fantasia-input' label='Apelido' editor={fantasia} value={this.props.model.fantasia} />
						<DetailItem editorRef='#cpfCnpj-input' label='CPF' editor={cpf} value={this.props.model.cpfCnpj} mask={$maskdefinitions.cpf}/>
						<DetailItem editorRef='#rgIe-input' label='RG' editor={rgIe} value={this.props.model.rgIe}/>
						<DetailItem editorRef='#email-input' label='E-Mail' editor={email} value={this.props.model.email}/>
						<DetailItem editorRef='#celular-input' label='Celular' editor={celular} value={this.props.model.celular} mask={$maskdefinitions.cellphone}/>
						<DetailItem editorRef='#fone-input' label='Fone' editor={fone} value={this.props.model.fone} mask={$maskdefinitions.phone}/>
						<DetailItem editorRef='#lojaOrigem-input' label='Loja de Origem' editor={lojaOrigem} value={this.props.model.lojaOrigem.fantasia} />
						<DetailItem editorRef='#observacao-input' label='Observação' editor={observacao} value={this.props.model.observacao} />

						{this.renderAddressComponent()}

						<DetailSectionContact id='detail-contato-0' contact={this.props.model.contato[0]} onContactChange={this.changedContact}/>

					</ul>

				)

			},

			renderPessoaJuridica: function () {
				var tipoPessoa = this.createTipoPessoaEditor(PESSOA_JURIDICA);
				var razaoSocial = <input id="razaoSocial-input" type="text" className="form-control"  onBlur={this.changedBasic} onKeyPress={this.keyPressed} onKeyUp={$validators.validateNonEmpty}  defaultValue={this.props.model.razaoSocial}></input>;
				var fantasia = <input id="fantasia-input" type="text" className="form-control"  onBlur={this.changedBasic} onKeyPress={this.keyPressed} defaultValue={this.props.model.fantasia}></input>;
				var cpf = <input id="cpfCnpj-input" type="text" className="form-control"  onBlur={this.changedBasic} onKeyPress={this.keyPressed} onKeyUp={$validators.validateCnpj} defaultValue={this.props.model.cpfCnpj}></input>;
				var rgIe = <input id="rgIe-input" type="text" className="form-control"  onBlur={this.changedBasic} onKeyPress={this.keyPressed} defaultValue={this.props.model.rgIe}></input>;
				var im = <input id="im-input" type="text" className="form-control"  onBlur={this.changedBasic} onKeyPress={this.keyPressed} defaultValue={this.props.model.im}></input>;
				var suframa = <input id="suframa-input" type="text" className="form-control"  onBlur={this.changedBasic} onKeyPress={this.keyPressed} defaultValue={this.props.model.suframa}></input>;
				var isentoIcms = <CheckboxInput  id="isentoIcms-input" width="3" onChange={this.changedBasic} onKeyPress={this.keyPressed} checked={this.props.model.isentoIcms} noLabel={true}></CheckboxInput>;
				var ehSimples = <CheckboxInput  id="ehSimples-input" width="3" onChange={this.changedBasic} onKeyPress={this.keyPressed} checked={this.props.model.ehSimples} noLabel={true}></CheckboxInput>;
				var email = <input id="email-input" type="email" className="form-control"  onBlur={this.changedBasic} onKeyPress={this.keyPressed} onKeyUp={$validators.validateEmail}defaultValue={this.props.model.email}></input>;
				var celular = <input id="celular-input" type="text" className="form-control"  onBlur={this.changedBasic} onKeyPress={this.keyPressed} onKeyUp={$validators.validateCelular} defaultValue={this.props.model.celular}></input>;
				var fone = <input id="fone-input" type="text" className="form-control"  onBlur={this.changedBasic} onKeyPress={this.keyPressed} onKeyUp={$validators.validateFone} defaultValue={this.props.model.fone}></input>;
				var observacao = <textarea id="observacao-input" type="text" className="form-control"  onBlur={this.changedBasic} onKeyPress={this.keyPressed} defaultValue={this.props.model.observacao} maxLength={2048}></textarea>;
				var lojaOrigem = <DropDownLoja id="lojaOrigem-input" onBlur={this.changedLojaOrigem} options={this.state.lojaOptions} defaultValue={this.props.model.lojaOrigem.codigo}/>;


				return (
					<ul className="content-list-cards">
						<DetailItem editorRef='#tipoPessoa-input' label='Tipo de Pessoa' editor={this.props.model.cpfCnpj ? null : tipoPessoa} value={PESSOA_JURIDICA}/>
						<DetailItem editorRef='#razaoSocial-input' label='Razão Social' editor={razaoSocial} value={this.props.model.razaoSocial} required={true}/>
						<DetailItem editorRef='#fantasia-input' label='Fantasia' editor={fantasia} value={this.props.model.fantasia} />
						<DetailItem editorRef='#cpfCnpj-input' label='CNPJ' editor={cpf} value={this.props.model.cpfCnpj} mask={$maskdefinitions.cnpj}/>
						<DetailItem editorRef='#rgIe-input' label='Inscrição Estadual' editor={rgIe} value={this.props.model.rgIe}/>
						<DetailItem editorRef='#im-input' label='Inscrição Municipal' editor={im} value={this.props.model.im} mask={$maskdefinitions.integer}/>
						<DetailItem editorRef='#suframa-input' label='Suframa' editor={suframa} value={this.props.model.suframa} mask={$maskdefinitions.integer}/>
						<DetailItem editorRef='#isentoIcms-input' label='Isento ICMS' editor={isentoIcms} value={this.props.model.isentoIcms === 'true' ? 'Sim' : 'Não'}/>
						<DetailItem editorRef='#ehSimples-input' label='Simples' editor={ehSimples} value={this.props.model.ehSimples === 'true' ? 'Sim' : 'Não'}/>
						<DetailItem editorRef='#email-input' label='E-Mail' editor={email} value={this.props.model.email}/>
						<DetailItem editorRef='#celular-input' label='Celular' editor={celular} value={this.props.model.celular} mask={$maskdefinitions.cellphone}/>
						<DetailItem editorRef='#fone-input' label='Fone' editor={fone} value={this.props.model.fone} mask={$maskdefinitions.phone}/>
						<DetailItem editorRef='#lojaOrigem-input' label='Loja de Origem' editor={lojaOrigem} value={this.props.model.lojaOrigem.fantasia} />
						<DetailItem editorRef='#observacao-input' label='Observação' editor={observacao} value={this.props.model.observacao} />

						{this.renderAddressComponent()}
					</ul>
				)
			},

			initializeModel: function () {
				if (!this.props.model.tipoPessoa) {
					this.props.model.tipoPessoa = PESSOA_FISICA;
				}
				if (!this.props.model.lojaOrigem) {
					this.props.model.lojaOrigem = {}
				}

			},

			render: function () {
				this.initializeModel();
				return this.props.model.tipoPessoa === PESSOA_FISICA ? this.renderPessoaFisica() : this.renderPessoaJuridica();
			}
		});

	});


