define(['react', 'common/event', 'app/config'], function (React, $event, $config) {

	const LOAD_WITH_CONCATENATION = 1;
	const LOAD_RELOAD = 0;

	return React.createClass({

		propTypes: {
			cardContentClass: React.PropTypes.any.isRequired,
			restService: React.PropTypes.any.isRequired,
			cardItemClass : React.PropTypes.string
		},

		_page: 1,
		_currentSearchTerm: '',
		_isSearching: false,

		getInitialState: function () {
			return {model: []};
		},


		componentDidMount: function () {
			$event.addListener('search', this.onSearch);
			$event.addListener('update-list', this.loadList);
			$event.addListener('more-button-click', this.loadMore);

			this.loadList();
		},

		componentWillUnmount: function () {
			$event.removeListener('search', this.onSearch);
			$event.removeListener('update-list', this.loadList);
			$event.removeListener('more-button-click', this.loadMore);
		},

		loadMore: function () {
			++this._page;
			this.loadList(LOAD_WITH_CONCATENATION);
		},

		loadList: function (mode) {
			if(!this.isMounted())
				return;

			this.props.restService.getAll({
				textFilter: this._currentSearchTerm,
				pagina: this._page,
				numeroRegistros: $config.cardsPerView
			}).then(function (services) {
					var model = mode === LOAD_WITH_CONCATENATION ? this.state.model.concat(services) : services;
					this.setState({model: model});
				}.bind(this)
			)
		},

		onSearch: function (searchTerm) {
			this._currentSearchTerm = searchTerm;

			if (this._isSearching) return;
			this._isSearching = true;

			setTimeout(function () {
				// reset model first,...
				this._page = 1;
				this.state.model = []; // ... without update
				this.loadList();
				this._isSearching = false;
			}.bind(this), 1000);

		},

		render: function () {

			var CardContent = this.props.cardContentClass;

			var items = this.state.model.map(function (item, index) {
				//var cardElement = React.createElement(this.props.cardContentClass, {model: item});
				return	<li key={index} className="card-item">
						  <CardContent model={item} />
						</li>
			});

			return (
				<ul className="content-list-cards">
                {items}
				</ul>

			);
		}
	});
});


