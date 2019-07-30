var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server.js');
var should = chai.should();

chai.use(chaiHttp);

describe('PopTest', function() {
    it('Should Use ProfHours', function(done) {

        chai.request(server)
            .get('/popAPill')
            .end(function(err, res) {

                res.should.have.status(200);
                done();
        });
    })
});
