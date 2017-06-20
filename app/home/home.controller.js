(function () {

  'use strict';

  angular
    .module('app')
    .controller('HomeController', homeController);



  homeController.$inject = ['authService','$scope','$http','$mdDialog','$interval','$rootScope'];

  function homeController(authService,$scope,$http,$mdDialog,$interval,$rootScope) {

    var vm = this;
    vm.auth = authService;
    $scope.theme = 'red';
    $scope.i=0;
    $scope.user_stats =function()
  {
    $http.get('/api/users1').success(function(data){
      console.log(data);
        $rootScope.countUsers1 = data[0].ut;
        });
    $http.get('/api/users2').success(function(data){
        $rootScope.countUsers2 = data[0].uy;
        });
    $http.get('/api/usersRechargedTod').success(function(data){
        $rootScope.usersRechargedTod = data[0].a;
        });
    $http.get('/api/usersRechargedYest').success(function(data){
        $rootScope.usersRechargedYest = data[0].a;
        });

    $http.get('/api/usersBilledTod').success(function(data){
        $rootScope.usersBilledTodCount = data[0].billed_users;
        $rootScope.usersBilledTodAmount = data[0].amount;
        });

    $http.get('/api/usersBilledYest').success(function(data){
        $rootScope.usersBilledYestCount = data[0].billed_users;
        $rootScope.usersBilledYestAmount = data[0].amount;
        $scope.i=1;
        });
  }
  $scope.user_stats();

    //$scope.imagePath = 'img/washedout.png';

  // $scope.showAdvanced = function(ev) {

  //   $mdDialog.show({
  //     controller: DialogController,
  //     templateUrl: 'pages/orders/orders.tmpl.html',
  //     parent: angular.element(document.body),
  //     targetEvent: ev,
  //     clickOutsideToClose:true,

  //   })
  //   .then(function(answer) {
  //     $scope.status = 'You said the information was "' + answer + '".';
  //   }, function() {
  //     $scope.status = 'You cancelled the dialog.';
  //   });
  // };

$scope.showTabDialog = function(ev) {
    $mdDialog.show({
      controller: DialogController,
      templateUrl: 'pages/orders/orders.tmpl.html',
      //parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true
    })
        .then(function(answer) {
          $scope.status = 'You said the information was "' + answer + '".';
        }, function() {
          $scope.status = 'You cancelled the dialog.';
        });
  };
  function DialogController($scope, $mdDialog,$rootScope) {

    $scope.user_added_labels = ["Users added Today", "Users added Yesterday"];
    $scope.user_added_data = [$rootScope.countUsers1, $rootScope.countUsers2];
  

    $scope.user_rech_labels = ["Users Recharged Today", "Users Recharged Yesterday"];
    $scope.user_rech_data = [$rootScope.usersRechargedTod, $rootScope.usersRechargedYest];


      $scope.hide = function() {
        $mdDialog.hide();
      };

      $scope.cancel = function() {
        $mdDialog.cancel();
      };

      $scope.answer = function(answer) {
        $mdDialog.hide(answer);
      };
    }

    

}
})();

