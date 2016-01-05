define(function (require) {

    require('component/fluxsimulator/fluxconfig');
    var React = require('react');
    var NanoFlux = require('nanoflux');

    var UserItem = React.createClass({

        propTypes: {
            user: React.PropTypes.shape({
                id: React.PropTypes.number,
                name: React.PropTypes.string,
                firstName: React.PropTypes.string,
                lastName: React.PropTypes.string
            }).isRequired,
            onClick : React.PropTypes.func,
            onRemove : React.PropTypes.func
        },

        render: function () {
            return (
                <li className="list-group-item" onClick={this.props.onClick.bind(null,this.props.user.id)}>
                        <span className="glyphicon glyphicon-remove-circle pull-right" aria-hidden="true"
                              onClick={this.props.onRemove.bind(null,this.props.user.id)}/>
                    <h4 className="list-group-item-heading">{this.props.user.name}</h4>
                </li>
            );
        }
    });

    return React.createClass({

        userStore: NanoFlux.getStore('userStore'),
        userActions : NanoFlux.getActions('userActions'),

        getInitialState: function () {
            return {text: '', userItems: this.userStore.getUserList()}
        },

        onUsersChanged: function (userList) {
            if(this.isMounted()) {
                this.setState({userItems: userList});
            }
        },

        componentWillMount: function () {
            this.userStore.subscribe(this, this.onUsersChanged);
        },

        componentDidMount: function () {
        },

        componentWillUnmount: function () {
        },


        addItem: function (event) {
        },

        removeItem: function (id) {
            console.log("removeItem: Implement me!");
        },

        selectItem : function(userId){
            this.userActions.selectUser(userId);
        },

        render: function () {

            return (
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">Users</h3>
                    </div>
                    <div className="panel-body">
                        <ul ref="list" className="list-group">
                            {
                                this.state.userItems.map(function(userItem, index){
                                    return <UserItem key={index} user={userItem} onClick={this.selectItem}
                                                     onRemove={this.removeItem}/>
                                    }.bind(this))
                                }
                        </ul>
                    </div>
                </div>
            )
        }
    })
});
