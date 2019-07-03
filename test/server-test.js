var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server.js');
var should = chai.should();

chai.use(chaiHttp);

describe('Create Account', function() {
   it('should add a user to the user table in the database', function(done) {

        chai.request(server).get('/get-num-users').end(function(err, res_1) {
           var num_users = res_1.body.rowTotals;

            chai.request(server)
                .post('/sign-up')
                .type('form')
                .send({
                    'username':'test',
                    'password':'pass'

                }).end(function(err, res) {

                chai.request(server).get('/get-num-users').end(function(err, res_2) {
                    if(err) {
                        console.log(err);
                    }
                    var num_users_2 = res_2.body.rowTotals;

                    (num_users_2 - num_users).should.equal(1);
                    res.should.have.status(200);
                    done();

                });
            });
        });
   })
});

describe('Login', function() {
    it('should log the user in and render the game page', function(done) {

        chai.request(server)
            .post('/login')
            .type('form')
            .send({
                'username':'test',
                'password':'pass'

            }).end(function(err, res) {

                res.should.have.status(200);
                done();
        });
    })
});