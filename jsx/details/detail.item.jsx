define(['react', 'common/event', 'jquery', 'jqueryMask'],
	function (React, $event, jquery, __mask ) {


		var ReadOnlyItem = React.createClass({

			value: function () {
				if (this.props.mask && this.props.rawValue) {

					try {
						// Attention: React silently dismiss exceptions withou rendering. so its better to get any feedback!
						return jquery.inputmask.format(this.props.rawValue, this.props.mask);
					}
					catch (e) {
						console.error(e);
					}
				}

				return this.props.rawValue;
			},

			render: function () {

				value = this.props.required && this.value().length === 0 ? <span className="glyphicon glyphicon-exclamation-sign"  title="Campo obrigatório" aria-hidden="true"></span> : this.value();

				return (
					<strong tabIndex={this.props.ix} onFocus={this.props.onFocus}>{value}</strong>
				)
			}
		});


		var DetailItem = React.createClass({

			propTypes : {
				editor : React.PropTypes.object,
				required : React.PropTypes.bool,
				editorRef : React.PropTypes.string,
				mask : React.PropTypes.object
			},

			getInitialState: function () {
				return {isOpened: false}
			},

			componentDidMount: function () {
				$event.addListener('editor-closed', this.saveChanges);
			},

			componentWillUnmount: function () {
				$event.removeListener('editor-closed');
			},

			componentDidUpdate: function () {
				if (!this.state.isOpened)
					return;

				this.refs.editorContainer.getDOMNode().firstChild.focus();

				if (this.props.editorRef && this.props.mask) {
					var input = jquery(this.props.editorRef);
					jquery(input).inputmask(this.props.mask);
				}
			},

			openEditor: function (event) {

				if(!this.props.editor)
					return;

				if(this.isMounted()) {
					this.setState({isOpened: true});
				}
			},

			saveChanges: function () {

				if(!this.isMounted())
					return;

				this.setState({isOpened: false});
			},
			isReadOnly : function()			{
				return !this.props.editor;
			},

			render: function () {

				var contentItem = this.state.isOpened ? this.props.editor :
					<ReadOnlyItem ix={this.isReadOnly()? "-1" : "0"} rawValue={this.props.value} onFocus={this.openEditor} mask={this.props.mask} required={this.props.required}/>;

				var isRequiredIcon = this.props.required ? <span className="glyphicon glyphicon-hand-left"  title="Campo obrigatório" aria-hidden="true"></span> : '';

				return (
					<li className="card-item-details" onClick={this.openEditor}>
						<label>{this.props.label}&nbsp;{isRequiredIcon}</label>
						<label>
							<div  ref="editorContainer" className='detail-component-container' title = {this.isReadOnly()? '' : 'Clique para editar'}>
							{contentItem}
							</div>
						</label>
					</li>

				)
			}
		});

		return DetailItem;
	});