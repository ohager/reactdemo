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
				descricao: '',
                simbolo: ''
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
				var service = new GenericService('/unidade');

				service.create(this._internalModel).then(function () {
					$event.emitEvent('update-list');
					this.reset(editorForm);
					$messageHandler.showSuccess("Unidade criada com sucesso");
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
							<TextInput id="descricao"  onBlur={this.handleChange} title="Descrição" tooltip="Descrição da unidade" width="12" required={true} maxLength={50} tabindex="1" />
							<TextInput id="simbolo"  onBlur={this.handleChange} title="Simbolo" tooltip="Abreviação da unidade" width="12" required={true} maxLength={10} tabindex="2" />
						</div>
					</div>
				);
			}
		});
	});


