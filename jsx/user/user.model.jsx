define(['react', 'common/event', 'jquery', 'jqueryMask', 'common/maskdefinitions', 'restservice/generic.service', 'component/details/detail.item'],
	function (React, $event, jquery, __mask, $maskdefinitions, GenericService, DetailItem) {

		return React.createClass({

			_modelUpdated : false,
			_userService : new GenericService('/usuario'),

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
				this._userService.remove(this.props.model.codigo).then(
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
					this._userService.update(this.props.model.codigo, this.props.model).then(function () {
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
                this.saveChanges();
			},
			
			keyPressed: function (event) {

				if (event.charCode === 13) {
					event.preventDefault();
					event.target.blur();
					this.saveChanges(event)
				}

			},

              render: function () {
               
				var nome = <input  id="nome-input" type="text" className="form-control" onBlur={this.changedBasic} onKeyPress={this.keyPressed} defaultValue={this.props.model.nome} maxLength={50}></input>;                
				var login = <input  id="login-input" type="text" className="form-control" onBlur={this.changedBasic} onKeyPress={this.keyPressed} defaultValue={this.props.model.login} maxLength={50}></input>;                
				var senha = <input  id="senha-input" type="password" className="form-control" onBlur={this.changedBasic} onKeyPress={this.keyPressed} defaultValue={this.props.model.senha} maxLength={20}></input>;                
				var email = <input  id="email-input" type="text" className="form-control" onBlur={this.changedBasic} onKeyPress={this.keyPressed} defaultValue={this.props.model.email} maxLength={50}></input>;                
				var comissao = <input  id="comissao-input" type="text" className="form-control" onBlur={this.changedBasic} onKeyPress={this.keyPressed} defaultValue={this.props.model.comissao} maxLength={50}></input>;                
                
                
				return (

					<ul className="content-list-cards">                        
						<DetailItem editorRef='#nome-input' label='Nome' editor={nome} value={this.props.model.nome}/>
						<DetailItem editorRef='#login-input' label='Login' editor={login} value={this.props.model.login}/>
						<DetailItem editorRef='#senha-input' label='Senha' editor={senha} value={this.props.model.senha}/>
						<DetailItem editorRef='#email-input' label='Email' editor={email} value={this.props.model.email}/>
						<DetailItem editorRef='#comissao-input' label='Comissão' editor={comissao} value={this.props.model.comissao}/>
					</ul>

				)
			}    
		});

	});