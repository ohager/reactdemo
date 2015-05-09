define(	function (require) {

		var React = require('react');
		var $event = require('common/event');

		return React.createClass({

				_timeoutId : 0,

				getInitialState: function () {
					return { message : null, type : null, secondsToVanish : 0 }
				},

				componentDidMount : function(){
					$event.addListener('show-notification', this.showNotification);
				},

				componentWillUnmount : function(){
					$event.removeListener('show-notification', this.showNotification);
					clearTimeout(this._timeoutId);
				},

				isVisible : function(){
					return this.state.message && this.state.type;
				},

				hideNotification : function(){
					this.setState({
						type : null,
						message : null
					});
				},

				startVanishing : function(){
					clearTimeout(this._timeoutId);
					this._timeoutId = setTimeout(function(){this.hideNotification();}.bind(this), this.state.secondsToVanish *  1000);
				},

				showNotification : function(notification){
					this.state={
						type : notification.type,
						message : notification.message,
						secondsToVanish : notification.secondsToVanish
					};
					if(notification.secondsToVanish > 0){
						this.startVanishing();
					}
					this.forceUpdate();
				},

				render: function () {

					return (

						<div className={"alert alert-dismissible alert-" + this.state.type } role="alert" hidden={!this.isVisible()}>
							<a className="close" role="button" onClick={this.hide}>&times;</a>
						    <strong>{this.state.message} </strong>
						</div>

					);
				}

			}
		);
	});

