/* global expect */
var context = describe,
  path = require('path'),
  factory = require(path.resolve(process.cwd(), "lib/user_crud_service"));


describe('The User Factory: ', function () {
  context('Methods', function () {

    it('should get a user object', function (done) {
      var user;
      factory.get(1, function (err, usr) {
        user = usr;
        expect(user).to.be.an('object');
        done();
      });
    });

    it('should return an error if not found', function (done) {
      factory.get(10, function (err, usr) {
        expect(err).to.be.an.instanceof(Error);
        done();
      });
    });
    it('should save a user object', function (done) {
      var d = new Date();
      var user = {
        3: {
          id: 3,
          name: "stub",
          timestamp: d.getTime()
        }
      };
      factory.save(3, user, function (err, usr) {
        expect(usr).to.be.eql(user);
        done();
      });
    });
    it('should change the timestamp property after save', function (done) {
      factory.get(1, function (err, usr) {
        var timestamp = usr.timestamp;
        var d = new Date();
        usr.timestamp = d;
        expect(usr.timestamp).to.not.equal(timestamp);
        done();
      });
    });
  });
});
