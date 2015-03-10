define(['react', 'common/event', 'jquery', 'jqueryMask', 'common/maskdefinitions', 'restservice/generic.service', 'component/details/detail.item'],
	function (React, $event, jquery, __mask, $maskdefinitions, GenericService, DetailItem) {


		return React.createClass({

			_modelUpdated : false,
			_unitService : new GenericService('/unidade'),

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
				this._unitService.remove(this.props.model.codigo).then(
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
					this._unitService.update(this.props.model.codigo, this.props.model).then(function () {
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

			changedDescricao: function (event) {
				var newValue = this.getValueFromTarget(event);
				this.checkForModelUpdate(this.props.model.descricao , newValue );
				this.props.model.descricao = newValue;
				this.saveChanges(event);
			},
            
            changedSimbolo: function (event) {
				var newValue = this.getValueFromTarget(event);
				this.checkForModelUpdate(this.props.model.simbolo , newValue );
				this.props.model.simbolo = newValue;
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

				var descricao = <input  id="descricao-input" type="text" className="form-control" onBlur={this.changedDescricao} onKeyPress={this.keyPressed} defaultValue={this.props.model.descricao} maxLength={50}></input>;
				var simbolo = <input  id="simbolo-input" type="text" className="form-control" onBlur={this.changedSimbolo} onKeyPress={this.keyPressed} defaultValue={this.props.model.simbolo} maxLength={10}></input>;
                
				return (

					<ul className="content-list-cards">
						<DetailItem editorRef='#descricao-input' label='Descrição' editor={descricao} value={this.props.model.descricao}/>
						<DetailItem editorRef='#simbolo-input' label='Simbolo' editor={simbolo} value={this.props.model.simbolo}/>
					</ul>

				)
			}
		});

	});