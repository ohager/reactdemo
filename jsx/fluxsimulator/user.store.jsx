define(function (require) {

    return {
        _users : [],
        _selectedUser : null,
        _propagateChanges: function () {
            this.notify(this._users, this._selectedUser);
        },
        onInit : function(){
            if(this._users.length > 0) return;
            this._users = [
                {
                    id : 1,
                    name : 'ohager',
                    firstName : 'Oliver',
                    lastName : 'Häger'
                },
                {
                    id : 2,
                    name : 'danger',
                    firstName : 'Austin',
                    lastName : 'Powers'
                }];
            this._propagateChanges();
        },
        onAddUser: function (user) {
            this._users.push(user);
            this._propagateChanges();
        },
        onRemoveUser: function (userId) {
            this._users.splice(userId, 1);
            this._propagateChanges();
        },
        onUpdateUser: function (updatedUser) {
            var index = this._users.findIndex( function(user){
                return user.id === updatedUser.id;
            });
            if(index !== -1){
                this._users[index] = updatedUser;
                this._propagateChanges();
            }
        },
        getUserById: function(userId){
            var index = this._users.findIndex( function(user){
                return user.id === userId;
            });
            if(index !== -1){
                return this._users[index];
            }
        },
        getSelectedUser : function(){
            var selectedUserId = this._selectedUser;
            var index = this._users.findIndex( function(user){
                return user.id === selectedUserId;
            });
            return index === -1 ? null : this._users[index];
        },
        onSelectUser : function(selectedUserId){
            var index = this._users.findIndex( function(user){
                return user.id === selectedUserId;
            });

            if(index !== -1){
                this._selectedUser = this._users[index];
                this._propagateChanges();
            }
        }
    }
});
