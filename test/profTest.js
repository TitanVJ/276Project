var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server.js');
var should = chai.should();


describe('prof', function() {
    it('Should display profDex', function(done) {

        chai.request(server)
            .get('/profPrev')

            .end(function(err, res) {

                res.should.have.status(200);
                done();
        });
    })
});
