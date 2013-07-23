'use strict';

/* jasmine specs for controllers go here */

  describe("App controller", function () {
  var ctrl, scope;

  beforeEach(module('app'));

  beforeEach(inject(function ($rootScope, $controller) {
    scope = $rootScope.$new();
    ctrl = $controller('AppCtrl', {$scope: scope});
  }));

  it("has repeats attribute set to 5", function () {
    expect(scope.add).toBe('Add');
  });
  var value, flag;
  it("has repeats attribute set to 5", function () {
  
  runs(function() {
      flag = false;
      value = 0;
		scope.getCustomer();
     
    });
	waitsFor(function() {
      value++;
      return scope.customers.length==2;
    }, "The Value should be incremented", 750);
	
	runs(function() {
      expect(scope.customers.length).toEqual(2);
    });
    
  
    
  });
  it("has repeats attribute set to 5", function () {
  	
  	scope.addCustomer('rahul','');
    expect(scope.customers.length).toEqual(1);
  });
   it("has repeats attribute set to 5", function () {
  	
	scope.addCustomer('rahul','');
  	scope.addCustomer('rahul mehta',1);
    expect(scope.customers.length).toEqual(1);
  });
  it("has repeats attribute set to 5", function () {
  	scope.addCustomer('rahul','');
  	scope.delCustomer('1');
    expect(scope.customers.length).toEqual(0);
  });
  


});
