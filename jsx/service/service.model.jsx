define(['react', 'common/event', 'jquery', 'jqueryMask', 'common/maskdefinitions', 'restservice/generic.service', 'component/details/detail.item', 'component/checkbox.input'],
	function (React, $event, jquery, __mask, $maskdefinitions, GenericService, DetailItem, CheckboxInput) {


		return React.createClass({

			_modelUpdated : false,
			_restService : new GenericService('/servico'),

			getInitialState: function () {
				return {}
			},

			componentDidMount: function () {
				$event.addListener('action-remove', this.remove);
			},

			componentWillUnmount: function () {
				$event.removeListener('action-remove', this.remove);
			},

			componentDidUpdate: function () {

			},

			remove : function(){
				this._restService.remove(this.props.model.codigo).then(
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
					this._restService.update(this.props.model.codigo, this.props.model).then(function () {
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

			changedCodServico: function (event) {

				this.checkForModelUpdate(this.props.model.codServico , this.getValueFromTarget(event));

				this.props.model.codServico = jquery(event.target).val();
				this.saveChanges(event);
			},

			changedCodPrefeitura: function (event) {
				var newValue = this.getValueFromTarget(event);
				this.checkForModelUpdate(this.props.model.codPrefeitura , newValue );
				this.props.model.codPrefeitura = newValue;
				this.saveChanges(event);
			},

			changedDescricao: function (event) {
				var newValue = this.getValueFromTarget(event);
				this.checkForModelUpdate(this.props.model.descricao , newValue );
				this.props.model.descricao = newValue
				this.saveChanges(event);
			},
			changedCodTributacaoMunicipio: function (event) {
				var newValue = this.getValueFromTarget(event);
				this.checkForModelUpdate(this.props.model.codTributacaoMunicipio , newValue );
				this.props.model.codTributacaoMunicipio = newValue;
				this.saveChanges(event);
			},
			changedValor: function (event) {
				var newValue = this.getValueFromTarget(event);
				this.checkForModelUpdate(this.props.model.valor , newValue );
				this.props.model.valor = newValue;
				this.saveChanges(event);
			},
			changedCusto: function (event) {
				var newValue = this.getValueFromTarget(event);
				this.checkForModelUpdate(this.props.model.custo , newValue );
				this.props.model.custo = newValue;
				this.saveChanges(event);
			},
			changedPerIss: function (event) {
				var newValue = this.getValueFromTarget(event);
				this.checkForModelUpdate(this.props.model.PerISS, newValue );
				this.props.model.PerISS = newValue;
				this.saveChanges(event);
			},
			changedRetemIss: function (event) {
				var newValue = this.getValueFromTarget(event);
				this.checkForModelUpdate(this.props.model.RetemISS, newValue );
				this.props.model.RetemISS = newValue;
				this.store();
			},
			keyPressed: function (event) {

				if (event.charCode === 13) {
					event.preventDefault();
					event.target.blur();
					this.saveChanges(event)
				}

			},

			render: function () {

				var codServico = <input  id="codServico-input" type="text" className="form-control"  onBlur={this.changedCodServico} onKeyPress={this.keyPressed} defaultValue={this.props.model.codServico}></input>;
				var codPrefeitura = <input  id="codPrefeitura-input" type="text" className="form-control"  onBlur={this.changedCodPrefeitura} onKeyPress={this.keyPressed} defaultValue={this.props.model.codPrefeitura}></input>;
				var descricao = <textarea  id="descricao-input" type="text" className="form-control"  rows="3" onBlur={this.changedDescricao} onKeyPress={this.keyPressed} defaultValue={this.props.model.descricao}></textarea>;
				var codTributacaoMunicipio = <input   id="codTributacaoMunicipio-input"type="text" className="form-control"  onBlur={this.changedCodTributacaoMunicipio} onKeyPress={this.keyPressed} defaultValue={this.props.model.codTributacaoMunicipio}></input>;
				var valor = <input  id="valor-input" type="text" className="form-control"  onBlur={this.changedValor} onKeyPress={this.keyPressed} defaultValue={this.props.model.valor} mask={$maskdefinitions.currency}></input>;
				var custo = <input  id="custo-input" type="text" className="form-control"  onBlur={this.changedCusto} onKeyPress={this.keyPressed} defaultValue={this.props.model.custo} mask={$maskdefinitions.currency}></input>;
				var perISS = <input  id="perISS-input" type="text" className="form-control"  onBlur={this.changedPerIss} onKeyPress={this.keyPressed} defaultValue={this.props.model.PerISS} mask={$maskdefinitions.percentage}></input>;
				var retemISS = <CheckboxInput  id="retemISS-input" title="Retem ISS?" width="3" onChange={this.changedRetemIss} onKeyPress={this.keyPressed} checked={this.props.model.RetemISS} noLabel={true}></CheckboxInput>;


				return (

					<ul className="content-list-cards">

						<DetailItem editorRef='#codServico-input' label='Código de Serviço' editor={codServico} value={this.props.model.codServico}/>
						<DetailItem editorRef='#descricao-input' label='Descrição' editor={descricao} value={this.props.model.descricao}/>
						<DetailItem editorRef='#codPrefeitura-input' label='Código da Prefeitura' editor={codPrefeitura} value={this.props.model.codPrefeitura}/>
						<DetailItem editorRef='#codTributacaoMunicipio-input' label='Código Tributação Município' editor={codTributacaoMunicipio} value={this.props.model.codTributacaoMunicipio}/>
						<DetailItem editorRef='#valor-input' label='Valor' editor={valor} value={this.props.model.valor} mask={$maskdefinitions.currency}/>
						<DetailItem editorRef='#custo-input' label='Custo' editor={custo} value={this.props.model.custo} mask={$maskdefinitions.currency}/>
						<DetailItem editorRef='#perISS-input' label='Porcentagem ISS' editor={perISS} value={this.props.model.PerISS} mask={$maskdefinitions.percentage}/>
						<DetailItem editorRef='#retemISS-input' label='Retem ISS' editor={retemISS} value={this.props.model.RetemISS==='true' ? 'Sim' : 'Não'}/>

					</ul>

				)
			}
		});

	});