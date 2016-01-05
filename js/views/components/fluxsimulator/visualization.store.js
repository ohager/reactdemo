define(function (require) {

    return {
        _triggeredAction : null,
        onTriggerAction: function (action) {
            this._triggeredAction = action;
            this.notify(action);
        }
    }
});
