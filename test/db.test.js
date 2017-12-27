var expect = require('chai');
var app = require('../index.js');
var request = require('supertest');
var db = require('../models/');

before(function(done){
    db.sequelize.sync({force: true})
    .then(function(){
        done();
    });
});

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

describe('POST /pokemon', function(){
    it('Should add a pokemon to the table', function(done){
        request(app).post('/pokemon')
        .type('form')
        .send({
            name: 'Pokemon',
            imgId: '/5'
        })
        .expect(302, done);
    });
});

// describe('GET /pokemon/1', function(){
//     it('Should return a specific pokemon', function(done){
//         request(app).get('/pokemon/1')
//     })
// })

