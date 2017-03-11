(function() {
    angular.module('TimeWaste')
        .controller('MainController', ['$scope', '$http', '$interval',
                              function($scope,    $http,   $interval) {

            if(localStorage['User-Data'] !== undefined){
              $scope.user = JSON.parse(localStorage['User-Data']);
              console.log($scope.user);
            }

            $scope.sendWaste = function(event){
              if(event.which === 13){
                var request = {
                  user: $scope.user.username || $scope.user.email,
                  userId: $scope.user._id,
                  userImage: $scope.user.image,
                  content: $scope.newWaste
                }

                $http.post('api/waste/post', request).then(function(response){
                  console.log(response);
                  console.log("a");
                  $scope.wastes = response;
                }, function(error){
                  console.error(error);
                })
              }
            };

            function getWastes (initial){
              $http.get('api/waste/get').then(function(response){
                if(initial){
                  $scope.wastes = response;
                } else {
                  if (response.data.length > $scope.wastes.data.length){
                    $scope.incomingWastes = response;
                  }
                }
              }, function(error){})
            };

            $interval(function(){
                getWastes(false);
                if ($scope.incomingWastes){
                $scope.difference = $scope.incomingWastes.data.length - $scope.wastes.data.length;
                console.log($scope.difference);
                }
            }, 5000);

            $scope.setNewWastes = function () {
                $scope.wastes = angular.copy($scope.incomingWastes);
                $scope.incomingWastes = undefined;
            }

            //Init
            getWastes(true);
        }]);
}());
