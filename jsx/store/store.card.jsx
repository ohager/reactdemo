define(['react', 'restservice/generic.service', 'common/event', 'jquery', 'jqueryMask', 'common/maskdefinitions', 'component/store/store.model'],
	function (React, GenericService, $event, $jquery, __jquerymask, $maskdefinitions, StoreModel) {

		return React.createClass({

			_storeService: new GenericService("/loja"),

			_internalFullModel: {},

			propTypes: {
				model: React.PropTypes.object.isRequired
			},

			getInitialState: function () {
				return {model: this.props.model};
			},

			componentDidMount: function () {
				$event.addListener('model-changed-' + this.props.model.codigo, this.update);
			},

			componentWillUnmount: function () {
				$event.removeListener('model-changed-' + this.props.model.codigo);
			},

			componentDidUpdate: function () {
				var listener = $event.getListeners('model-changed-' + this.props.model.codigo);
				if(!listener.length){
					$event.addListener('model-changed-' + this.props.model.codigo, this.update);
				}
			},

			mapFromFullModel: function(fullModel){

				// generic mapping using reflection
				for (var propName in this.props.model) {
					if (this.props.model.hasOwnProperty(propName)) {

						if(!fullModel[propName]) {
							console.warn("[Loja Mapping]: Property '" + propName + "' undefined!");
						}

						this.props.model[propName] = fullModel[propName];
					}
				}
				this._internalFullModel = fullModel;

				this.setState({model: this.props.model});

			},

			update : function(updatedModel){
				if(this.isMounted()) {
					this.mapFromFullModel(updatedModel);
				}
			},

			showDetails: function () {
				// fetch full store model
				this._storeService.getById(this.props.model.codigo).then(function (details) {
					this._internalFullModel = details;
					var model = <StoreModel model={this._internalFullModel} />;
					$event.emitEvent('show-details', [model] );
				}.bind(this));
			},

			format: function (value, mask) {

				if (!mask || !value) return value;

				var ret = value;

				try {
					ret  = $jquery.inputmask.format(value, mask);
				}
				catch(e){
					console.error(e);
				}
				finally{
					return ret;
				}
			},

			render: function () {
				var cnpj = '';
				if(this.props.model.cnpj) {
					cnpj = this.format(this.props.model.cnpj,  $maskdefinitions.cnpj);
				}
				return (
					<a onClick={this.showDetails}>
						<span>
							<strong>{this.props.model.fantasia}</strong>
						</span>
						<span>
							<small>{this.props.model.razaoSocial}</small>
							<small>
								<span className="glyphicon glyphicon-envelope" aria-hidden="true"></span>
							&nbsp;{this.props.model.email}
							</small>
						</span>
						<span>
							<small>{cnpj}</small>

							<small>
								<span className="glyphicon glyphicon-earphone" aria-hidden="true"></span>
							&nbsp;{this.format(this.props.model.fone, $maskdefinitions.phone)}
							</small>

							<small>
								<span className="glyphicon glyphicon-phone" aria-hidden="true"></span>
							&nbsp;{this.format(this.props.model.celular, $maskdefinitions.cellphone)}
							</small>
						</span>
					</a>
				);
			}
		});
	});


