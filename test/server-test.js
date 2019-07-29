var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server.js');
var assert = require('assert');
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
                    'username':'testing',
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

describe("Change User's Status", function() {
    it("should change a user's status from 'user' to 'admin'", function(done) {

        chai.request(server)
            .get('/data').end(function(err, res) {
                let testUserIndex = res.body.results.findIndex(i => i.user_name === "testing");
                assert.equal(res.body.results[testUserIndex].status, "user");

                chai.request(server)
                    .get('/changeUserStatus?user=testing').end(function(err2, res2) {
                        chai.request(server)
                            .get('/data').end(function(err3, res3) {
                                testUserIndex = res.body.results.findIndex(i => i.user_name === "testing");
                                assert.equal(res3.body.results[testUserIndex].status, "admin");
                                done();
                            });
                    });
        });
    });
});

describe('Login', function() {
    it('should log the user in and render the admin page', function(done) {

        chai.request(server)
            .post('/login')
            .type('form')
            .send({
                'username':'testing',
                'password':'pass'

            }).end(function(err, res) {

            chai.request(server)
                .delete('/removeUser/' + 'testing')
                .end(function (err_2, res_2) {

                    res_2.should.have.status(200);
                    done();


                });
        });
    });
});

describe('Create Professor', function() {
    it('should add a professor to the profDex table in the database', function(done) {

        chai.request(server).get('/dataProfDex').end(function(err, res_1) {
            var num_profs = res_1.body.results.length;


            let profName = 'Test Professor';
            let fname = 'Test';
            let lname = 'Professor';

            chai.request(server)
                .post(`/addProfDex/${profName}?fname=${fname}&lname=${lname}`)
                .end(function(err, res) {

                chai.request(server).get('/dataProfDex').end(function(err, res_2) {
                    if(err) {
                        console.log(err);
                    }
                    var num_profs_2 = res_2.body.results.length;

                    (num_profs_2 - num_profs).should.equal(1);
                    res.should.have.status(200);
                    done();

                });
            });
        });
    })
});

describe('Delete Professor', function() {
    it('should delete a professor from the profDex table in the database', function(done) {

        chai.request(server).get('/dataProfDex').end(function(err, res_1) {     // Get num professors
            var num_profs = res_1.body.results.length;

            let profName = 'Delete Test';
            let fname = 'Delete';
            let lname = 'Test';


            chai.request(server)
                .post(`/addProfDex/${profName}?fname=${fname}&lname=${lname}`)
                .end(function(err, res) {

                    chai.request(server).get('/dataProfDex').end(function(err_1, res_2) {
                        if(err_1) {
                            console.log(err);
                        }

                        let testPersonID = res_2.body.results.findIndex(i => i.prof_fname === "Delete");

                        chai.request(server)
                            .delete('/removeProf/'+res_2.body.results[testPersonID].prof_id)
                            .end(function(err, res) {

                                chai.request(server).get('/dataProfDex').end(function(err_2, res_3) {

                                    if(err_2) {
                                        console.log(err);
                                    }

                                    (res_3.body.results.length - num_profs).should.equal(0);
                                    res.should.have.status(200);
                                    done();

                                });
                            });
                    });
                });
        });
    });
});


