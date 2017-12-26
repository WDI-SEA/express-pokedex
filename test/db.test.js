var expect = require('chai');
var app = require('../index.js');
var request = require('supertest');
var db = require('../models/');


describe('GET /sadf', function() {
  it('Should return a 404 resp', function(done) {
    request(app).get('/asdf')
      .expect(404, done);
  });
});

describe('GET /pokemon', function() {
  it('Should return a 200 resp',
    function(done) {
      request(app).get('/pokemon')
        .expect(200, done);
    });
});
