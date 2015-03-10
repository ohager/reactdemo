define(['react',
		'common/event',
		'common/messagehandler',
		'restservice/generic.service',
		'component/text.input',
		
		'jquery',
		'common/maskdefinitions'
	],

	function (React, $event, $messageHandler, GenericService, TextInput, $jquery, $maskdefinitions) {

		function getInitialModel() {
			return {
				codigo: null
			};
		}

		return React.createClass({

			_internalModel: getInitialModel(),

			getInitialState: function () {
				return {};
			},
			componentDidMount: function () {
				$event.addListener('save', this.saveData);
			},
			componentWillUnmount: function () {
				$event.removeListener('save', this.saveData);
			},
			saveData: function (editorForm) {
				var service = new GenericService('/usuario');

				service.create(this._internalModel).then(function () {
					$event.emitEvent('update-list');
					this.reset(editorForm);
					$messageHandler.showSuccess("Usuário criada com sucesso");
				}.bind(this));
			},
			reset: function (editorForm) {

				this._internalModel = getInitialModel();
				editorForm.getDOMNode().reset();
			},
			handleChange: function (event) {
				this._internalModel[event.target.id] = $jquery(event.target).val(); // auto unmask
			},

			render: function () {

				return (

					<div>
						<div className="row">
                          <TextInput  id="nome-input" type="text" className="form-control" onBlur={this.handleChange} title="Nome" tooltip="Nome" width="12" required={true} maxLength={50} tabindex="1"></TextInput>  
                        </div>
                        <div className="row">
                          <TextInput  id="login-input" type="text" className="form-control" onBlur={this.handleChange} title="Login" tooltip="Login" width="6" required={true} maxLength={50} tabindex="2"></TextInput>                
                            <TextInput  id="senha-input" type="password" className="form-control" onBlur={this.handleChange} title="Senha" tooltip="Senha" width="6" required={true} maxLength={20} tabindex="3"></TextInput> 
                        </div>
                        <div className="row">
                            <TextInput  id="email-input" type="text" className="form-control" onBlur={this.handleChange} title="Email" tooltip="email" width="12"  maxLength={50} tabindex="4"></TextInput>    
                        </div>
                        <div className="row">
                            <TextInput  id="comissao-input" type="text" className="form-control" onBlur={this.handleChange} title="Comissão" tooltip="Comissão" width="12"  maxLength={50} tabindex="5"></TextInput> 
                        </div>
                  
					</div>
				);
			}
		});
	});


