define(['react'], function (React) {

	var DetailSection = React.createClass({

		propTypes: {
			id: React.PropTypes.string,
			title: React.PropTypes.string
		},

		getInitialState: function () {
			return {}
		},

		componentDidMount: function () {
		},

		render: function () {

			var collapseId = 'collapse-' + this.props.id;
			var acordionId = 'acordion-' + this.props.id;

			return (
				<div className="form-group col-xs-12 col-sm-12">
					<div className="panel-group panel-crud" id={acordionId} role="tablist" aria-multiselectable="true">
						<div className="panel panel-default" >
							<div ref="expandPanel" className="panel-heading collapsed" data-toggle="collapse" data-parent={'#' + acordionId} href={'#' + collapseId} aria-expanded="true" aria-controls={collapseId}>
								<h3 className="panel-title" >{this.props.title}</h3>
								<span className="icon-accordion"></span>
							</div>
							<div id={collapseId} className="panel-collapse collapse" >
								<div className="panel-body">
								{this.props.children}
								</div>
							</div>
						</div>
					</div>
				</div>
			)
		}
	});

	return DetailSection;

});

