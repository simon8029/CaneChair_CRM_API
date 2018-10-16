'use strict';

var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);

var expect = chai.expect;
var request = chai.request;

var app = require('../../app');

var Fixtures = require('../fixture/fixtures');
var CustomerFixture = Fixtures.CustomerFixture;

var baseUri = '/customers';

describe('Customer Controller', () => {
	describe('POST ' + baseUri, () => {
		it('should add new customer', done => {
			request(app)
				.post(baseUri)
				.send(CustomerFixture.newCustomer)
				.end(function(err, res) {
					expect(res.status).to.equal(201);
					expect(res.body).to.not.equal({});
					expect(res.body._id).to.not.equal(undefined);
					expect(res.body.firstName).to.equal(
						CustomerFixture.createdCustomer.firstName
					);

					done();
				});
		});
	});
});
