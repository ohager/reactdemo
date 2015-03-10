define(['jquery', 'q', 'common/auth', 'common/route', 'common/messagehandler', 'common/event'], function ($, $q, $auth, $route, $messageHandler, $event) {

    function XhrParser(xhrObj) {
        var xhr = xhrObj;
        this.getError = function (context) {
            return {
                context: context,
                statusCode: xhr.status,
                message: xhr.statusText,
	            //authorizationFailed: false
                authorizationFailed: (xhr.readyState === 0 && xhr.status === 0) || xhr.status === 401
            }
        }
    }


    function Failure(deferred, url) {
        var d = deferred;
        var context = url;
        this.func = function (xhr) {
            var error = new XhrParser(xhr).getError(context);

            if (error.authorizationFailed) {
	            if(!$route.isLoginPage()) {
		            $route.storePage();
                    $route.gotoLoginPage();
	            }
            }
            else if (error.statusCode === 404)
            {
	            // noop
            }
            else{
	            console.error(error);
                $messageHandler.showError("Infelizmente houve uma falha na comunicação.");
            }



            d.reject(error);
        }
    }

    function HttpConfiguration(config) {

	    this.authRequired = config ? config : {authRequired: true};
        this.contentType = 'application/json'
    }

	function RequestInterceptor( config){

		this.intercept = function (xhr, obj) {
			$event.emitEvent('loading-started');
			if (config.authRequired) {
				$auth.applyAuth(xhr);
			}
		}

	}

    function ResponseInterceptor(deferred) {

        var _deferred = deferred;

	    this.success = function (data, status, xhr){
		    var xtoken = xhr.getResponseHeader('Authorization');
		    if (xtoken) {
			    $auth.setAuthToken(xtoken);
		    }
		    _deferred.resolve(data);
	    };

        this.finished = function (xhr, status) {
	        $event.emitEvent('loading-finished');
        }

    }


    return {


        get: function (url, params, config) {
            var deferred = $q.defer();

	        var httpConfiguration = new HttpConfiguration(config);
	        var requestInterceptor = new RequestInterceptor(httpConfiguration);
            var responseInterceptor = new ResponseInterceptor(deferred);

            $.ajax({
                url: url,
                type: 'GET',
                data: params,
                crossDomain: true,
                success: responseInterceptor.success,
	            complete: responseInterceptor.finished,
                beforeSend: requestInterceptor.intercept
            }).fail(new Failure(deferred, url).func);

            return deferred.promise;
        },
        post: function (url, data, config) {
            var deferred = $q.defer();

	        var httpConfiguration = new HttpConfiguration(config);
	        var requestInterceptor = new RequestInterceptor(httpConfiguration);
	        var responseInterceptor = new ResponseInterceptor(deferred);


	        $.ajax({
                url: url,
                type: 'POST',
                data: JSON.stringify(data),
                processData: false,
                success: responseInterceptor.success,
	            complete: responseInterceptor.finished,
                beforeSend: requestInterceptor.intercept,
                contentType: httpConfiguration.contentType
            }).fail(new Failure(deferred, url).func);

            return deferred.promise;
        },
        put: function (url, data, config) {
            var deferred = $q.defer();

	        var httpConfiguration = new HttpConfiguration(config);
	        var requestInterceptor = new RequestInterceptor(httpConfiguration);
	        var responseInterceptor = new ResponseInterceptor(deferred);

            $.ajax({
                url: url,
                type: 'PUT',
                data: JSON.stringify(data),
                processData: false,
	            success: responseInterceptor.success,
	            complete: responseInterceptor.finished,
	            beforeSend: requestInterceptor.intercept,
                contentType: httpConfiguration.contentType
            }).fail(new Failure(deferred, url).func);

            return deferred.promise;
        },
        remove: function (url, config) {
            var deferred = $q.defer();

	        var httpConfiguration = new HttpConfiguration(config);
	        var requestInterceptor = new RequestInterceptor(httpConfiguration);
	        var responseInterceptor = new ResponseInterceptor(deferred);

            $.ajax({
                url: url,
                type: 'DELETE',
	            success: responseInterceptor.success,
	            complete: responseInterceptor.finished,
	            beforeSend: requestInterceptor.intercept
            }).fail(new Failure(deferred, url).func);

            return deferred.promise;
        }
    }
});
