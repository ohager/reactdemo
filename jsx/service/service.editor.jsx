define(['react',
		'common/event',
		'common/messagehandler',
		'restservice/generic.service',
		'component/text.input',
		'component/checkbox.input',
		'component/text.area',
		'jquery',
		'common/maskdefinitions'
	],

	function (React, $event, $messageHandler, GenericService, TextInput, CheckboxInput, TextArea, $jquery, $maskdefinitions) {

		function getInitialModel() {
			return {
				codigo: null,
				codServico: '',
				codPrefeitura: '',
				descricao: '',
				valor: 0,
				custo: 0,
				PerISS: 0,
				RetemISS: 'false',
				codTributacaoMunicipio: ''
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
				var service = new GenericService('/servico');

				service.create(this._internalModel).then(function () {
					$event.emitEvent('update-list');
					$messageHandler.showSuccess("Serviço criado com sucesso");
					this.reset(editorForm);
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
							<TextInput id="codServico" onBlur={this.handleChange} title="Código do Serviço" tooltip="Código do serviço no estabelecimento do cliente" width="12" required={true} maxLength={15} tabindex="1" />
						</div>
						<div className="row">
							<TextInput id="descricao"  onBlur={this.handleChange} title="Descrição" tooltip="Descrição do serviço que sairá na NFSe" width="12" required={true} maxLength={50} tabindex="2" />
						</div>
						<div className="row">
							<TextInput id="valor" onBlur={this.handleChange} title="Valor" width="6" required={true} maxLength={15} tabindex="3" mask={$maskdefinitions.currency}/>
							<TextInput id="custo" onBlur={this.handleChange}  title="Custo" width="6" maxLength={15} tabindex="4" mask={$maskdefinitions.currency}/>
						</div>
						<div className="row">
							<TextInput id="codPrefeitura" onBlur={this.handleChange}  title="Código da Prefeitura" tooltip="Código do serviço na tabela da prefeitura" width="6" maxLength={15} tabindex="5" />
							<TextInput id="codTributacaoMunicipio" onBlur={this.handleChange} title="Código Tributação Município" tooltip="Código de tributação do serviço no município" width="6" maxLength={15} tabindex="6" />
						</div>
						<div className="row">
							<TextInput id="PerISS" type="text" onBlur={this.handleChange} title="Percentual ISS" placeholder="0.00 %" tooltip="Percentual de ISS cobrado no serviço" width="6" tabindex="7" mask={$maskdefinitions.percentage}/>

							<CheckboxInput id="RetemISS" type="checkbox" onChange={this.handleChange} title="Retem ISS" tooltip="ISS é retido pela prefeitura?"  width="6"  tabindex="8" checked={true}/>

						</div>
					</div>
				);
			}
		});
	});


