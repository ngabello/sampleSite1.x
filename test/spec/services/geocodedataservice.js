'use strict';

describe('Service: Geocodedataservice', function () {

  // load the service's module
  beforeEach(module('webQuoteAngApp'));

  // instantiate service
  var Geocodedataservice;
  beforeEach(inject(function (_Geocodedataservice_) {
    Geocodedataservice = _Geocodedataservice_;
  }));

  it('should do something', function () {
    expect(!!Geocodedataservice).toBe(true);
  });

});
