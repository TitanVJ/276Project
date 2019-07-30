var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server.js');
var should = chai.should();

chai.use(chaiHttp);

describe('addCandy', function() {
    it('Should add ProfHours', function(done) {

        chai.request(server)
            .get('/addCandy') 
            .end(function(err, res) {

                res.should.have.status(200);
                done();
        });
    })
});
