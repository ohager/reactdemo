define(['react', 'common/event', 'jquery', 'jqueryMask', 'common/maskdefinitions', 'restservice/generic.service', 'component/details/detail.item', 'component/details/detail.section' ],
	function (React, $event, jquery, __mask, $maskdefinitions, GenericService, DetailItem, DetailSection ) {


		return React.createClass({

			_modelUpdated : false,
			_productService : new GenericService('/produto'),

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
				this._productService.remove(this.props.model.codigo).then(
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
					this._productService.update(this.props.model.codigo, this.props.model).then(function () {
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

			changedCodAlfa: function (event) {
				var newValue = this.getValueFromTarget(event);
				this.checkForModelUpdate(this.props.model.codAlfa , newValue );
				this.props.model.codAlfa = newValue;
				this.saveChanges(event);
			},
          
            changedDescricao: function (event) {
				var newValue = this.getValueFromTarget(event);
				this.checkForModelUpdate(this.props.model.descricao , newValue );
				this.props.model.descricao = newValue;
				this.saveChanges(event);
			},
          
           changedValorVenda: function (event) {
				var newValue = this.getValueFromTarget(event);
				this.checkForModelUpdate(this.props.model.valorVenda , newValue );
				this.props.model.valorVenda = newValue;
				this.saveChanges(event);
			},
          
           changedValorCusto: function (event) {
				var newValue = this.getValueFromTarget(event);
				this.checkForModelUpdate(this.props.model.valorCusto , newValue );
				this.props.model.valorCusto = newValue;
				this.saveChanges(event);
			}, 
           
          changedCodigoEan: function (event) {
				var newValue = this.getValueFromTarget(event);
				this.checkForModelUpdate(this.props.model.codigoEan , newValue );
				this.props.model.codigoEan = newValue;
				this.saveChanges(event);
			}, 
           
          changedPesoLiquido: function (event) {
				var newValue = this.getValueFromTarget(event);
				this.checkForModelUpdate(this.props.model.pesoLiquido , newValue );
				this.props.model.pesoLiquido = newValue;
				this.saveChanges(event);
			}, 
          
          changedPesoBruto: function (event) {
				var newValue = this.getValueFromTarget(event);
				this.checkForModelUpdate(this.props.model.pesoBruto , newValue );
				this.props.model.pesoBruto = newValue;
				this.saveChanges(event);
			},
          
          changedObservacao: function (event) {
				var newValue = this.getValueFromTarget(event);
				this.checkForModelUpdate(this.props.model.observacao , newValue );
				this.props.model.observacao = newValue;
				this.saveChanges(event);
			},
          
          
			
			keyPressed: function (event) {

				if (event.charCode === 13) {
					event.preventDefault();
					event.target.blur();
					this.saveChanges(event)
				}

			},

			render: function () {

				var codAlfa = <input  id="codAlfa-input" type="text" className="form-control"  onBlur={this.changedCodAlfa} onKeyPress={this.keyPressed} defaultValue={this.props.model.codAlfa}></input>;
				var descricao = <input  id="descricao-input" type="text" className="form-control" rows="3" onBlur={this.changedDescricao} onKeyPress={this.keyPressed} defaultValue={this.props.model.descricao}></input>;
				var valorVenda = <input  id="valorVenda-input" type="text" className="form-control"  onBlur={this.changedValorVenda} onKeyPress={this.keyPressed} defaultValue={this.props.model.valorVenda} mask={$maskdefinitions.currency}></input>;
				var valorCusto = <input  id="valorCusto-input" type="text" className="form-control"  onBlur={this.changedValorCusto} onKeyPress={this.keyPressed} defaultValue={this.props.model.valorCusto} mask={$maskdefinitions.currency}></input>;
				var codigoEan = <input  id="codigoEan-input" type="text" className="form-control"  onBlur={this.changedCodigoEan} onKeyPress={this.keyPressed} defaultValue={this.props.model.codigoEan}></input>;
				var pesoLiquido = <input  id="pesoLiquido-input" type="text" className="form-control"  onBlur={this.changedPesoLiquido} onKeyPress={this.keyPressed} defaultValue={this.props.model.pesoLiquido} ></input>;
				var pesoBruto = <input  id="pesoBruto-input" type="text" className="form-control"  onBlur={this.changedPesoBruto} onKeyPress={this.keyPressed} defaultValue={this.props.model.pesoBruto} ></input>;
                var observacao = <input  id="observacao-input" type="text" className="form-control" rows="3" onBlur={this.changedObservacao} onKeyPress={this.keyPressed} defaultValue={this.props.model.observacao}></input>;
                
                return (

					<ul className="content-list-cards">
						<DetailItem editorRef='#codAlfa-input' label='Código do produto' editor={codAlfa} value={this.props.model.codAlfa}/>
						<DetailItem editorRef='#descricao-input' label='Descrição' editor={descricao} value={this.props.model.descricao}/>
						<DetailItem editorRef='#valorVenda-input' label='Valor da venda' editor={valorVenda} value={this.props.model.valorVenda} mask={$maskdefinitions.currency}/>
						<DetailItem editorRef='#valorCusto-input' label='Valor de custo' editor={valorCusto} value={this.props.model.valorCusto} mask={$maskdefinitions.currency}/>
						<DetailItem editorRef='#codigoEan-input' label='Código de barras' editor={codigoEan} value={this.props.model.codigoEan} />
						<DetailItem editorRef='#pesoLiquido-input' label='Peso liquido' editor={pesoLiquido} value={this.props.model.pesoLiquido} />
						<DetailItem editorRef='#pesoBruto-input' label='Peso bruto' editor={pesoBruto} value={this.props.model.pesoBruto} />
						<DetailItem editorRef='#observacao-input' label='Observação' editor={observacao} value={this.props.model.observacao} />                  
                       
                  
					</ul>

				)
			}
		});

	});