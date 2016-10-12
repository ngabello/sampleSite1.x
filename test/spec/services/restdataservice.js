'use strict';

describe('Service: Restdataservice', function () {

  // load the service's module
  beforeEach(module('webQuoteAngApp'));

  // instantiate service
  var Restdataservice;
  beforeEach(inject(function (_Restdataservice_) {
    Restdataservice = _Restdataservice_;
  }));

  it('should do something', function () {
    expect(!!Restdataservice).toBe(true);
  });

});
