define(function (require) {

    require('component/fluxsimulator/fluxconfig');

    var React = require('react');
    var NanoFlux = require('nanoflux');

    var UserDetailItem = React.createClass({

        propTypes: {
            name: React.PropTypes.string.isRequired,
            value: React.PropTypes.any.isRequired
        },

        render: function () {
            return (
                <li className="list-group-item">
                    <div className="row">
                        <div className="col-lg-12">
                            <small>{this.props.name}</small>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <strong>{this.props.value}</strong>
                        </div>
                    </div>
                </li>
            );
        }
    });

    return React.createClass({

        getInitialState: function () {
            return {selectedUser: null}
        },

        componentWillMount: function () {

        },

        componentDidMount: function () {
            NanoFlux.getStore('userStore').subscribe(this, this.onSelectedUser);
        },

        componentWillUnmount: function () {
        },

        onSelectedUser : function(users, selectedUser){
            this.setState({selectedUser:selectedUser});
        },

        mountDetailList: function () {
            return (
                !this.state.selectedUser ?
                    <ul ref="list" className="list-group">
                        <UserDetailItem name="" value="Please select a user"/>
                    </ul>
                        :
                    <ul ref="list" className="list-group">
                        <UserDetailItem name="Username" value={this.state.selectedUser.name}/>
                        <UserDetailItem name="First Name" value={this.state.selectedUser.firstName}/>
                        <UserDetailItem name="Last Name" value={this.state.selectedUser.lastName}/>
                    </ul>
            );
        },

        render: function () {

            return (
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">User Detail</h3>
                    </div>
                    <div className="panel-body">

                        {this.mountDetailList()}

                    </div>
                </div>
            )
        }
    })
});
