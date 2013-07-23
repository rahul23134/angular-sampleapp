var app = angular.module('app', []);

app.config(function ($routeProvider, $locationProvider) { 
   $locationProvider.html5Mode(true); // enable pushState
   $routeProvider.when('/', { 
      templateUrl: '/app.html',
      controller: 'AppCtrl'
   });
   $routeProvider.when('/another/route', { 
      templateUrl: '/deep.html',
      controller: 'AppCtrl'
   });
});
app.factory('socket', ['$rootScope', function ($rootScope) {
  var socket = io.connect();

  return {
    on: function (eventName, callback) {
      function wrapper() {
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      }

      socket.on(eventName, wrapper);

      return function () {
        socket.removeListener(eventName, wrapper);
      };
    },

    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if(callback) {
            callback.apply(socket, args);
          }
        });
      });
    }
  };
}]);
Array.maxProp = function (array, prop) {
  var values = array.map(function (el) {
    return el[prop];
  });
  console.log(Math.max.apply(Math, values));
  return Math.max.apply(Math, values);
};


app.controller('AppCtrl', ['$scope', 'socket', function ($scope, socket) { 
    socket.on('sendCustomer', function (data) {
		console.log('send customer');
      $scope.customers=data;
    });
    $scope.model = { 
       message: 'Customer Data Management' 
    };
    $scope.customers = [];
    $scope.id = '';
    $scope.add = 'Add';
    $scope.name = '';

    $scope.getCustomer = function() {
		socket.emit('updateCustomer', $scope.customers);
		console.log("$scope.customers");
		console.log($scope.customers);
    };
	$scope.addCustomer = function(name, id) {
	 console.log(name);
	
		if(name==''){
			alert("name can't be blank");
			return;
			
		}
		if(id==''){
			var max_id = Array.maxProp($scope.customers, 'id');
			//~ console.log(max_id);
			//~ console.log(typeof(max_id));
			if(!isFinite(max_id))max_id=0;
			$scope.customers.push({"name":name,id:max_id+1});
		}else {
		console.log($scope.customers);
			for(var i=0; i<$scope.customers.length; i++) {
				if($scope.customers[i].id==id){
					$scope.customers[i].name=name;
				}
			}
			$scope.add="Add";
			$scope.id='';
		}
		console.log($scope.customers);
		$scope.name='';
		//~ console.log($scope.customers);
		socket.emit('updateCustomer', $scope.customers);
    };
	$scope.editCustomer = function(name, id) {
		$scope.name=name;
		$scope.id=id;
		$scope.add="Edit";
    };
	$scope.delCustomer = function(id) {
	    if( confirm('are you sure to delete')){
			for(var i=0; i<$scope.customers.length; i++) {
				if($scope.customers[i].id==id){
					$scope.customers.splice(i,1);
				}
			}
			socket.emit('updateCustomer', $scope.customers);
	   }
    };
	
}]);