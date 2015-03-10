define(['react',
		'common/event'],
	function (React, $event) {

		return React.createClass({


			propTypes: {
				label: React.PropTypes.string,
				maxItems: React.PropTypes.number
			},

			getInitialState: function () {
				return {items: [], model: [], baseId: "", onChange: undefined}
			},

			componentDidMount : function(){
				$event.addListener('reset-array', this.resetArray);
			},

			componentWillUnmount : function(){
				$event.removeListener('reset-array', this.resetArray);
			},

			resetArray : function(baseId){
				if(this.isMounted() && this.state.baseId === baseId){
					this.setState({items: [], model:[]});
				}
			},

			clone: function (id) {
				var prototype = React.addons.cloneWithProps(this.props.children);

				this.state.baseId = prototype.props.id;
				prototype.props.id = this.state.baseId + '-' + id;

				this.state.onChange = prototype.props.onChange;
				prototype.props.onChange = this.itemChanged;

				return prototype;
			},

			addNew: function () {

				var id = this.state.items.length;

				var item = this.clone(id);
				this.state.model.push({});
				// passing element is not recommended, but it fits exactly my needs here!
				this.state.items.push(
					<div key={id} className="row">
							{item}
					</div>);
				this.forceUpdate();

			},

			itemChanged: function (model, id) {
				var id = id.replace(this.state.baseId + "-", '');
				this.state.model[id] = model;
				this.state.onChange(this.state.model);
			},


			render: function () {
				return (
					<div>
						<div className="row">
						{
							!this.props.maxItems || this.state.items.length < this.props.maxItems ?
								<button type="button" className="btn btn-link pull-right" onClick={this.addNew}>
									<span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
								{this.props.label}
								</button>
							: null
							}
						</div>
						<div ref="itemArray">
							{this.state.items}
						</div>
					</div>
				)

			}

		})

	});