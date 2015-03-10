define(['common/http', 'app/config'], function ($http, $config) {
    function AuthService() {
        var rootPath = $config.webserviceRoot;

        this.login = function (userid, password) {
            var authData = {
                user: userid,
                password: password
            };
            return $http.post(rootPath + '/auth/login', authData, {authRequired:false});
        };

        this.logout = function () {
            return $http.post(rootPath + '/auth/logout');
        };
    }

    return AuthService;
});

