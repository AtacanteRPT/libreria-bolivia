'use strict';

var expect = require('chai').expect;

var home = require('../../../app/controladores/home');

describe('home routes', function() {
  it('should load', function() {
    expect(home).to.be.a('function');
  });
});
