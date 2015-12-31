"use strict";

var app = angular.module("app", []);

app.controller("personeditorController", function($scope, $http){

    $scope.person = {
        firstName : "",
        lastName : "",
        email : ""
    };

    $scope.save = function(event){

        var req = {
            method: 'POST',
            url: 'http://example.com',
            headers: {
                'Content-Type': 'application/json'
            },
            data: $scope.person
        };

        $http(req).then(function(){
            // handle response
        }, console.error);

    }
});

