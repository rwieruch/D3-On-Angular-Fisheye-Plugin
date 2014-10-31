'use strict';

describe('Service: fisheyeService', function () {

  // load the service's module
  beforeEach(module('d3OnAngularSeedApp'));

  // instantiate service
  var fisheyeService;
  beforeEach(inject(function (_fisheyeService_) {
    fisheyeService = _fisheyeService_;
  }));

  it('should do something', function () {
    expect(!!fisheyeService).toBe(true);
  });

});
