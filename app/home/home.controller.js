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

    var unix_seconds_tod = ((new Date()).getTime());
    var diff = ((new Date()).getTime()) % 100000;
    unix_seconds_tod = unix_seconds_tod - diff ;
    var dateTod = { date : unix_seconds_tod };

    var yesterday = new Date(new Date().setDate(new Date().getDate()-1));
    var unix_seconds_yest = yesterday.getTime();
    var diff = (yesterday.getTime()) % 100000;
    unix_seconds_yest = unix_seconds_yest - diff ;
    var dateYest = { date : unix_seconds_yest };

    $http.post('http://production.dailyninja.in:8080/analytics',dateTod)
        .success(function (data,status) {
          $rootScope.totalAmountAnalyticsTod = data['totalAmountAnalytics'];
          $rootScope.totalUserTod = data['totalUser'];
          $rootScope.totalOrdersTod = data['totalOrders'];
          $rootScope.milkRevenueTod = data['analyticsCategoryList'][0]['total'] + data['analyticsCategoryList'][4]['total'];
          $rootScope.nonmilkRevenueTod = $rootScope.totalAmountAnalyticsTod - $rootScope.milkRevenueTod ;

        });


    $http.post('http://production.dailyninja.in:8080/analytics',dateYest)
        .success(function (data,status) {
          $rootScope.totalAmountAnalyticsYest = data['totalAmountAnalytics'];
          $rootScope.totalUserYest = data['totalUser'];
          $rootScope.totalOrdersYest = data['totalOrders'];
          $rootScope.milkRevenueYest = data['analyticsCategoryList'][0]['total'] + data['analyticsCategoryList'][4]['total'];
          $rootScope.nonmilkRevenueYest = $rootScope.totalAmountAnalyticsYest - $rootScope.milkRevenueYest ;
          $scope.i=1;
        });

    $http.get('/api/users1').success(function(data){
        $rootScope.countUsers1 = data[0].ut;
        });
    $http.get('/api/users2').success(function(data){
        $rootScope.countUsers2 = data[0].uy;
        });
    // $http.get('/api/usersRechargedTod').success(function(data){
    //     $rootScope.usersRechargedTod = data[0].a;
    //     });
    // $http.get('/api/usersRechargedYest').success(function(data){
    //     $rootScope.usersRechargedYest = data[0].a;

    //     });
     $http.get('/api/downloadsTod').success(function(data){
        $rootScope.downloadsTod = data[0].downloadCount;

        });
      $http.get('/api/downloadsYest').success(function(data){
        $rootScope.downloadsYest = data[0].downloadCount;

        });
       $http.get('/api/subscriptionsTod').success(function(data){
        $rootScope.subscriptionsTod = data[0].subscriptionCount;

        });
        $http.get('/api/subscriptionsYest').success(function(data){
        $rootScope.subscriptionsYest = data[0].subscriptionCount;

        });

    // $http.get('/api/usersBilledTod').success(function(data){
    //     $rootScope.usersBilledTodCount = data[0].billed_users;
    //     $rootScope.usersBilledTodAmount = data[0].amount;
    //     });

    // $http.get('/api/usersBilledYest').success(function(data){
    //     $rootScope.usersBilledYestCount = data[0].billed_users;
    //     $rootScope.usersBilledYestAmount = data[0].amount;
        
    //     });
  }
  $scope.user_stats();


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

