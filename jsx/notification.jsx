define(['react', 'common/event'],
	function (React, $event) {

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
					this.cancelVanish();
				},

				isVisible : function(){
					return this.state.message && this.state.type;
				},

				hide : function(){
					this.setState({
						type : null,
						message : null,
						secondsToVanish : 0
					});
				},

				startVanishing : function(){
					if(this.isVisible() && this.state.secondsToVanish > 0){
						this.cancelVanish();
						this._timeoutId = setTimeout(this.hide, this.state.secondsToVanish *  1000);
					}
				},

				cancelVanish : function(){
					if(this._timeoutId > 0) {
						clearTimeout(this._timeoutId);
					}
				},

				showNotification : function(notification){
					this.setState({
						type : notification.type,
						message : notification.message,
						secondsToVanish : notification.secondsToVanish
					});
					this.startVanishing();
				},

				render: function () {

					return !this.isVisible() ? <div/> : (

						<div className={"alert alert-dismissible alert-" + this.state.type } role="alert">
							<a className="close" role="button" onClick={this.hide}>&times;</a>
						    <strong>{this.state.message} </strong>
						</div>

					);
				}

			}
		);
	});

