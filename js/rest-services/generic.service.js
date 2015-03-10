define(['common/http', 'app/config'], function($http, $config) {


    function GenericService(basepath){

        this.Basepath = $config.webserviceRoot + basepath;

        this.getAll = function(filterDto){
            var url = this.Basepath + (filterDto ? '/?filtro=' + encodeURIComponent(JSON.stringify(filterDto)) : '');
            return $http.get(url);
        };

        this.getById = function(id){
            var url = this.Basepath + '/' + id;
            return $http.get(url);
        };

        this.create = function(dto) {
            var url = this.Basepath + '/';
            return $http.post(url, dto);
        };

        this.update = function(id, dto){
            var url = this.Basepath + '/' + id ;
            return $http.put(url, dto);
        };

        this.remove = function(id){
            var url = this.Basepath + '/' + id;
            return $http.remove(url);
        }
    }

    return GenericService;

});
