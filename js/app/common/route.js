define(function() {

    var PAGE_KEY = 'page';

    return{
        hasStoredPage: function(){
            return !!window.localStorage.getItem(PAGE_KEY);
        },
	    isLoginPage : function(){
		    return window.location.href == 'login.html';
	    },
        // TODO use on logout
        clearStoredPage : function(){
            window.localStorage.setItem(PAGE_KEY, window.location.href);
        },
        storePage : function(){
            window.localStorage.setItem(PAGE_KEY, window.location.href);
        },
        getStoredPage : function(){
            return  window.localStorage.getItem(PAGE_KEY);
        },
        gotoLoginPage : function(){
	        window.location.href = 'login.html';
        },
        gotoStartPage : function(){
            var defaultStartPage = 'service.html';
            window.location.href = this.hasStoredPage() ? this.getStoredPage() : defaultStartPage;
        }
    }
});
