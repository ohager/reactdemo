define(['react', 'common/event', 'jquery', 'jqueryMask', 'common/messagehandler', 'component/action'], function (React, $event, jquery, _mask, $messagehandler, Action) {

	var Header = React.createClass({

		propTypes: {
			actions: React.PropTypes.array
		},

		render: function () {

			var actions = this.props.actions ? this.props.actions.map(function (action, index) {
				return <Action key={index} {...action} />
			}) : [];

			return (
				<div className="panel-heading clearfix">
					<h3 className="panel-title">Detalhes</h3>
					{ actions }
				</div>
			)
		}
	});



	return React.createClass({

		propTypes: {
			actions: React.PropTypes.array
		},

		getInitialState: function () {
			return {detailModel: null};
		},

		componentDidMount: function () {
			$event.addListener('show-details', this.showDetails);
			$event.addListener('action-remove', this.clearDetails);
		},

		componentWillUnmount: function () {
			$event.removeListener('show-details', this.showDetails);
			$event.removeListener('action-remove', this.clearDetails);
		},

		clearDetails: function () {
			if (this.isMounted()) {
				this.setState({detailModel: null});
			}
		},

		showDetails: function (detailModel) {
			if (this.isMounted()) {
				this.setState({detailModel: detailModel});
			}
		},

		render: function () {

			return (
				<div className="panel panel-default">
					<Header actions = {this.state.detailModel ? this.props.actions : []}/>
					<div className="panel-body">
						{this.state.detailModel ?  this.state.detailModel : <strong>Clique item para ver os detalhes</strong> }
					</div>
					<div className="panel-footer">
					</div>
				</div>
			);
		}
	})
});


