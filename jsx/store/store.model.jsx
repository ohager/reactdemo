define(['react', 'common/event', 'jquery', 'jqueryMask', 'common/maskdefinitions', 'common/validators','restservice/generic.service', 'component/details/detail.item', 'component/details/detail.section', 'component/checkbox.input', 'component/details/detail.section.address'],
	function (React, $event, jquery, __mask, $maskdefinitions, $validators, GenericService, DetailItem, DetailSection, CheckboxInput, DetailSectionAddress) {

  
  		return React.createClass({

			_modelUpdated: false,
			_storeService : new GenericService('/loja'),

				getInitialState: function () {
				return {}
			},

            componentDidMount: function () {
				$event.addListener('action-remove', this.remove);
			},

			componentWillUnmount: function () {
				$event.removeListener('action-remove', this.remove);
			},

			componentDidUpdate: function () {},

			remove : function(){
				this._storeService.remove(this.props.model.codigo).then(
					function(){
						$event.emitEvent('update-list');
					}
				)
			},

			saveChanges: function (event) {
				$event.emitEvent('editor-closed');
				this.store();
			},

			store : function(){
				if(this._modelUpdated) {
					this._storeService.update(this.props.model.codigo, this.props.model).then(function () {
						$event.emitEvent('model-changed-' + this.props.model.codigo, [this.props.model]);
						this.forceUpdate();

					}.bind(this));
				}
			},

			getValueFromTarget : function(event){
				return jquery(event.target).val();
			},

			checkForModelUpdate : function(oldValue, newValue){
				this._modelUpdated = oldValue !== newValue;
			},

			changedBasic: function (event) {
				var newValue = this.getValueFromTarget(event);
				var property = event.target.id.replace('-input', '');
				this.checkForModelUpdate(this.props.model[property], newValue);
				this.props.model[property] = newValue;

				if(this.isValid()){
					this.saveChanges();
				}

			},			

			changedAddress: function (newAddress) {
				this.props.model.enderecos[0] = newAddress;
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


			render: function () {
              
                var razao = <input id="razao-input" type="text" className="form-control"  onBlur={this.changedBasic} onKeyPress={this.keyPressed} onKeyUp={$validators.validateNonEmpty}  defaultValue={this.props.model.razao}></input>;
				var fantasia = <input id="fantasia-input" type="text" className="form-control"  onBlur={this.changedBasic} onKeyPress={this.keyPressed} defaultValue={this.props.model.fantasia}></input>;
				var cnpj = <input id="cnpj-input" type="text" className="form-control"  onBlur={this.changedBasic} onKeyPress={this.keyPressed} onKeyUp={$validators.validateCnpj} defaultValue={this.props.model.cnpj}></input>;
                var ie = <input id="ie-input" type="text" className="form-control"  onBlur={this.changedBasic} onKeyPress={this.keyPressed} defaultValue={this.props.model.ie}></input>;
                var im = <input id="im-input" type="text" className="form-control"  onBlur={this.changedBasic} onKeyPress={this.keyPressed} defaultValue={this.props.model.im}></input>;
                var suframa = <input id="suframa-input" type="text" className="form-control"  onBlur={this.changedBasic} onKeyPress={this.keyPressed} defaultValue={this.props.model.suframa}></input>;
                var isentoIcms = <CheckboxInput  id="isentoIcms-input" width="3" onChange={this.changedBasic} onKeyPress={this.keyPressed} checked={this.props.model.isentoIcms} noLabel={true}></CheckboxInput>;
				var ehSimples = <CheckboxInput  id="ehSimples-input" width="3" onChange={this.changedBasic} onKeyPress={this.keyPressed} checked={this.props.model.ehSimples} noLabel={true}></CheckboxInput>;
				var email = <input id="email-input" type="email" className="form-control"  onBlur={this.changedBasic} onKeyPress={this.keyPressed} onKeyUp={$validators.validateEmail}defaultValue={this.props.model.email}></input>;
				var celular = <input id="celular-input" type="text" className="form-control"  onBlur={this.changedBasic} onKeyPress={this.keyPressed} onKeyUp={$validators.validateCelular} defaultValue={this.props.model.celular}></input>;
				var fone = <input id="fone-input" type="text" className="form-control"  onBlur={this.changedBasic} onKeyPress={this.keyPressed} onKeyUp={$validators.validateFone} defaultValue={this.props.model.fone}></input>;

                
              return (

					<ul className="content-list-cards">
				        <DetailItem editorRef='#razaoSocial-input' label='Razão Social' editor={razao} value={this.props.model.razao} required={true}/>
						<DetailItem editorRef='#fantasia-input' label='Fantasia' editor={fantasia} value={this.props.model.fantasia} />
						<DetailItem editorRef='#cnpj-input' label='CNPJ' editor={cnpj} value={this.props.model.cnpj} mask={$maskdefinitions.cnpj}/>
						<DetailItem editorRef='#ie-input' label='IE' editor={ie} value={this.props.model.ie} mask={$maskdefinitions.ie}/>	
                        <DetailItem editorRef='#im-input' label='Inscrição Municipal' editor={im} value={this.props.model.im} mask={$maskdefinitions.integer}/>
                        <DetailItem editorRef='#suframa-input' label='Suframa' editor={suframa} value={this.props.model.suframa} mask={$maskdefinitions.integer}/>
                <DetailItem editorRef='#isentoIcms-input' label='Isento ICMS' editor={isentoIcms} value={this.props.model.isentoIcms ==='true' ? 'Sim' : 'Não'}/>
						<DetailItem editorRef='#ehSimples-input' label='Simples' editor={ehSimples} value={this.props.model.ehSimples==='true' ? 'Sim' : 'Não'}/>
						<DetailItem editorRef='#email-input' label='E-Mail' editor={email} value={this.props.model.email}/>
						<DetailItem editorRef='#celular-input' label='Celular' editor={celular} value={this.props.model.celular} mask={$maskdefinitions.cellphone}/>
						<DetailItem editorRef='#fone-input' label='Fone' editor={fone} value={this.props.model.fone} mask={$maskdefinitions.phone}/>
						<DetailSectionAddress id='detail-endereco-0' address={this.props.model.enderecos} onAddressChange={this.changedAddress}/>
						
					</ul>
				)		
			}
		});

	});


