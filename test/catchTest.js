var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server.js');
var should = chai.should();

chai.use(chaiHttp);

describe('CatchTest', function() {
    it('Should add ProfHours', function(done) {

        chai.request(server)
            .get('/caught')
            .type('form')
            .send({
                'prof_fname':'Bobby',
                'prof_id': 'BOBBY_CHAN',
                'prof_lname': 'Chan'
            })
            .end(function(err, res) {

                res.should.have.status(200);
                done();
        });
    })
});
