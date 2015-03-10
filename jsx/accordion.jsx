define(['react'],function (React) {


		return React.createClass({


			propTypes: {
				id: React.PropTypes.string.isRequired,
				title : React.PropTypes.string.isRequired
			},

			onPanelClicked: function (event) {
				var isExpanded = this.refs.expandPanel.getDOMNode().getAttribute('aria-expanded');
				this.setState({isExpanded: isExpanded === 'true'});
			},

			render: function () {

				var accordionId = "accordion-" + this.props.id;
				var collapseId = "collapse-" + this.props.id;

				return (
					<div className="form-group col-xs-12 col-sm-12">
						<div className="panel-group panel-crud" id={accordionId} role="tablist" aria-multiselectable="true">
							<div className="panel panel-default" >
								<div ref="expandPanel" className="panel-heading collapsed" data-toggle="collapse" data-parent={'#' + accordionId} href={'#' + collapseId} aria-expanded="true" aria-controls={collapseId} onClick={this.onPanelClicked}>
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

	});

