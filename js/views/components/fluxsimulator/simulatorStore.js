define(function (require) {

    return {
        _triggeredAction : null,
        onActionTriggered: function (action) {
            this._triggeredAction = action;
            this.notify();
        }
    }
});
