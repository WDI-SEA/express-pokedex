/* globals it: true} */
/* globals describe: true} */
// --- Above are JSHint's Linter Settings for this particular file --- //

var expect = require('chai').expect;
var request = require('supertest');
var app = require('../index.js');



//describe('what are we testing', fx())
describe('GET /', function(){
  it('Should return a 200 resp', function(done){
    request(app).get('/')
      .expect(200, done);
  });
});


