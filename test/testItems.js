var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server.js');
var should = chai.should();

chai.use(chaiHttp);

describe('addCandy', function() {
    it('Should add ProfHours', function(done) {

        chai.request(server)
            .get('/addCandy')
            .type('form')
            .send({
                'username':'testing'

            })
            .end(function(err, res) {

                res.should.have.status(200);
                done();
        });
    })
});

describe('GrabItem', function() {
    it('it should remove prof hours', function(done) {

        chai.request(server)
            .get('/popAPill')
            .type('form')
            .send({
                'username':'testing'
            })
            .end(function(err, res) {

                res.should.have.status(200);
                done();
        });
    })
});
