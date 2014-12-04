/* global expect */
var context = describe,
	path = require('path'),
	async = require('async'),
	user_service = require(path.resolve(process.cwd(), 'lib/user_service'));


describe('The User Service: ', function () {

	it('should return the correct user after waterfalling', function (done) {
		user_service(function (err, results) {
			expect(results.name).to.be.eql('Junta');
			done();
		});
	});
});
