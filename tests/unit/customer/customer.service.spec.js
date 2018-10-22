'use strict';

var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
require('sinon-mongoose');
var mongoose = require('mongoose');

var CustomerModule = require('../../../modules/customer/customer.module');
var CustomerModel = CustomerModule().CustomerModel;
var CustomerService = CustomerModule().CustomerService;

var Fixtures = require('../../fixture/fixtures');
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

	describe('Create Customer', () => {
		var newCustomer, expectedCreatedCustomer, expectedError;

		it('should successfully create new customer', () => {
			newCustomer = CustomerFixture.newCustomer;
			expectedCreatedCustomer = CustomerFixture.createdCustomer;

			CustomerModelMock.expects('create')
				.withArgs(newCustomer)
				.resolves(expectedCreatedCustomer);

			CustomerService.createCustomer(newCustomer).then(function(data) {
				CustomerModelMock.verify();
				expect(data).to.deep.equal(expectedCreatedCustomer);
			});
		});

		it('should throw error while creating customer', () => {
			expectedError = ErrorFixture.unknownError;
			newCustomer = CustomerFixture.newCustomer;

			CustomerModelMock.expects('create')
				.withArgs(newCustomer)
				.rejects(expectedError);

			CustomerService.createCustomer(newCustomer).catch(error => {
				CustomerModelMock.verify();
				expect(error).to.deep.equal(expectedError);
			});
		});
	});

	describe('Get Customers', () => {
		var expectedCustomers, expectedError;
		it('should successful get all customers', () => {
			expectedCustomers = CustomerFixture.customers;
			CustomerModelMock.expects('find')
				.withArgs({})
				.chain('exec')
				.resolves(expectedCustomers);

			CustomerService.getAllCustomers().then(function(data) {
				// CustomerModelMock.verify();
				expect(data).to.deep.equal(expectedCustomers);
			});
		});
		it('should throw error while getting all customers', () => {
			expectedError = ErrorFixture.unknownError;
			CustomerModelMock.expects('find')
				.withArgs({})
				.chain('exec')
				.rejects(expectedError);

			CustomerService.getAllCustomers().catch(function(error) {
				// CustomerModelMock.verify();
				expect(error).to.deep.equal(expectedError);
			});
		});
	});

	describe('Get Customer By Id', () => {
		var expectedCustomer, customerId, expectedError;
		it('should successfully get the customer by id', () => {
			expectedCustomer = CustomerFixture.createdCustomer;
			customerId = expectedCustomer._id;

			CustomerModelMock.expects('findById')
				.withArgs(customerId)
				.chain('exec')
				.resolves(expectedCustomer);

			CustomerService.getCustomerById(customerId).then(data => {
				expect(data).to.deep.equal(expectedCustomer);
			});
		});

		it('should throw error while getting customer by id', () => {
			customerId = CustomerFixture.createdCustomer._id;
			expectedError = ErrorFixture.unknownError;

			CustomerModelMock.expects('findById')
				.withArgs(customerId)
				.chain('exec')
				.rejects(expectedError);
		});

		CustomerService.getCustomerById(customerId).catch(error => {
			expect(error).to.deep.equal(expectedError);
		});
	});

	describe('Update Customer', () => {
		var newCustomer, expectedUpdatedCustomer, expectedError;

		it('should successfully update customer', () => {
			expectedUpdatedCustomer = Fixtures.modifiedCustomer;
			newCustomer = CustomerFixture.createdCustomer;

			CustomerModelMock.expects('findByIdAndUpdate')
				.withArgs(newCustomer._id, newCustomer, { new: true })
				.chain('exec')
				.resolves(expectedUpdatedCustomer);

			CustomerService.updateCustomer(newCustomer._id, newCustomer).then(
				data => {
					expect(data).to.deep.equal(expectedUpdatedCustomer);
				}
			);
		});
	});

	describe('deleteCustomer', function() {
		var existingCustomer, expectedError;

		it('should successfully remove customer', function() {
			existingCustomer = CustomerFixture.createdCustomer;

			CustomerModelMock.expects('findByIdAndRemove')
				.withArgs(existingCustomer._id)
				.chain('exec')
				.resolves(existingCustomer);

			return CustomerService.deleteCustomer(existingCustomer._id).then(
				function(data) {
					CustomerModelMock.verify();
					expect(data).to.deep.equal(existingCustomer);
				}
			);
		});

		it('should throw error while removing customer', function() {
			expectedError = ErrorFixture.unknownError;
			existingCustomer = CustomerFixture.createdCustomer;

			CustomerModelMock.expects('findByIdAndRemove')
				.withArgs(existingCustomer._id)
				.chain('exec')
				.rejects(expectedError);

			return CustomerService.deleteCustomer(existingCustomer._id).catch(
				function(error) {
					CustomerModelMock.verify();
					expect(error).to.deep.equal(expectedError);
				}
			);
		});
	});
});
