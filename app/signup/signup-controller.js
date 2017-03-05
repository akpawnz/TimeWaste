(function(){
  angular.module('TimeWaste')
    .controller('SignupController', ['$scope', '$state', '$http', function($scope, $state, $http){

      $scope.createUser = function(){
        console.log($scope.newUser);
        $http.post('api/user/signup', $scope.newUser).then(function(response){

        }, function(error){
          console.log(error);
        });
      }

    }]);


}());
