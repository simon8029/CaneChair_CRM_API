'use strict';
console.log(
	`require('./new-customer.json'):`,
	require('../../fixture/customer/new-customer.json')
);
var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
var mongoose = require('mongoose');

var CustomerModule = require('../../../modules/customer/customer.module')();
var CustomerModel = CustomerModule.CustomerModel;
var CustomerService = CustomerModule.CustomerService;

var Fixtures = require('../../fixture/fixtures');
console.log(`Fixtures:`, Fixtures);
var CustomerFixture = Fixtures.CustomerFixture;
var ErrorFixture = Fixtures.ErrorFixture;

var CustomerModelMock;

describe('CustomerService', () => {
	beforeEach(() => {
		CustomerModelMock = sinon.mock(CustomerModel);
	});

	afterEach(() => {
		CustomerModelMock.restore();
		mongoose.models = {};
		mongoose.modelSchemas = {};

		return mongoose.connection.close();
	});

	describe('createCustomer', () => {
		var newCustomer, expectedCreatedCustomer, expectedError;

		it('should successfully create new customer', () => {
			newCustomer = CustomerFixture.newCustomer;
			expectedCreatedCustomer = CustomerFixture.createdCustomer;

			CustomerModelMock.expects('create')
				.withArgs(newCustomer)
				.resolves(expectedCreatedCustomer);

			CustomerService.createCustomer(newCustomer).then(function(data) {
				CustomerModelMock.verify();
				console.log(`data:`, data);
				expect(data).to.deep.equal(expectedCreatedCustomer);
			});
		});

		it('should throw error while crateing customer', () => {
			expectedError = ErrorFixture.unknownError;
			console.log(`expectedError:`, expectedError);
			newCustomer = CustomerFixture.newCustomer;

			CustomerModelMock.expects('create')
				.withArgs(newCustomer)
				.rejects(expectedError);

			CustomerService.createCustomer(newCustomer).catch(error => {
				console.log(`error:`, error);
				console.log(`expectedError:`, expectedError);
				CustomerModelMock.verify();
				expect(error).to.deep.equal(expectedError);
			});
		});
	});
});
