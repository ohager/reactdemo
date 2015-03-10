define(  function () {
    var TOKEN_KEY = 'auth';

    return new function(){
	    var self = this;
        this.setAuthToken = function(token){
            window.localStorage.setItem(TOKEN_KEY, token);
        };
        this.getAuthToken = function(){
            return window.localStorage.getItem(TOKEN_KEY);
        };

	    this.applyAuth = function(xhr){
			var auth = 'NA-AUTH ' + self.getAuthToken();
			xhr.setRequestHeader('Authorization', auth);
		}
    }
});