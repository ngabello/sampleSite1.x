'use strict';

describe('Service: Quotedataservice', function () {

  // load the service's module
  beforeEach(module('webQuoteAngApp'));

  // instantiate service
  var Quotedataservice;
  beforeEach(inject(function (_Quotedataservice_) {
    Quotedataservice = _Quotedataservice_;
  }));

  it('should do something', function () {
    expect(!!Quotedataservice).toBe(true);
  });

});
