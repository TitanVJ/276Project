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

describe('Login', function() {
    it('should log the user in and render the game page', function(done) {

        chai.request(server)
            .post('/login')
            .type('form')
            .send({
                'username':'testing',
                'password':'pass'

            }).end(function(err, res) {

                res.should.have.status(200);
                done();
        });
    })
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

// describe('Delete Professor', function() {
//     it('should delete a professor from the profDex table in the database', function(done) {
//
//         chai.request(server).get('/dataProfDex').end(function(err, res_1) {     // Get num professors
//             var num_profs = res_1.body.results.length;
//
//             console.log("FIRST: ", res_1.body.results);
//
//             let profName = 'Delete Test';
//             let fname = 'Delete';
//             let lname = 'Test';
//
//
//             chai.request(server)
//                 .post(`/addProfDex/${profName}?fname=${fname}&lname=${lname}`)          // Add professor
//                 .end(function(err, res) {
//
//                     chai.request(server).get('/dataProfDex').end(function(err_1, res_2) {
//                         if(err_1) {
//                             console.log(err);
//                         }
//
//                         let testPersonID = "";
//
//                         for(var i = 0; i < res_1.body.results.length; i++) {
//                             if(res_1.body.results[i].prof_fname == "Delete") {
//                                 testPersonID = res_1.body.results[i].prof_id;
//                                 break;
//                             }
//                         }
//
//                         chai.request(server)
//                             .post('/removeProf/'+testPersonID)              // Remove professor
//                             .end(function(err, res) {
//
//                                 chai.request(server).get('/dataProfDex').end(function(err_2, res_2) {   // get num professors
//                                     console.log("SECOND: ", res_2.body.results);
//
//                                     if(err_2) {
//                                         console.log(err);
//                                     }
//
//                                     var num_profs_2 = res_2.body.results.length;
//
//                                     (num_profs_2 - num_profs).should.equal(0);
//                                     res.should.have.status(200);
//                                     done();
//
//                                 });
//                             });
//
//                         done();
//
//                     });
//                 });
//         });
//     })
// });
