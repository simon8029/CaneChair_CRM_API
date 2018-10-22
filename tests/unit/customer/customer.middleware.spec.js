'use strict';

var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
var httpMocks = require('node-mocks-http');
var bluebird = require('bluebird');
var Promise = bluebird.Promise;

var CustomerModule = require('../../../modules/customer/customer.module');
var CustomerMiddleware = CustomerModule().CustomerMiddleware;
var CustomerService = CustomerModule().CustomerService;
var Fixtures = require('../../fixture/fixtures');
var CustomerFixture = Fixtures.CustomerFixture;
var ErrorFixture = Fixtures.ErrorFixture;

var req, res, next;

describe('Customer Middleware', () => {
	beforeEach(function() {
		req = httpMocks.createRequest();
		res = httpMocks.createResponse();
		next = sinon.spy();
	});

	describe('Add Customer', () => {
		var createCustomer,
			createCustomerPromise,
			expectedCreatedCustomer,
			expectedError;

		beforeEach(function() {
			createCustomer = sinon.stub(CustomerService, 'createCustomer');
			req.body = CustomerFixture.newCustomer;
		});

		afterEach(function() {
			createCustomer.restore();
		});

		it('should successfully create new customer', () => {
			expectedCreatedCustomer = CustomerFixture.createdCustomer;
			createCustomerPromise = Promise.resolve(expectedCreatedCustomer);
			createCustomer.withArgs(req.body).returns(createCustomerPromise);

			CustomerMiddleware.addCustomer(req, res, next);

			sinon.assert.callCount(createCustomer, 1);

			return createCustomerPromise.then(function() {
				expect(req.response).to.be.a('object');
				expect(req.response).to.deep.equal(expectedCreatedCustomer);
				sinon.assert.callCount(next, 1);
			});
		});

		it('should throw error while createing the new customer', () => {
			expectedError = ErrorFixture.unknownError;
			createCustomerPromise = Promise.reject(expectedError);
			createCustomer.withArgs(req.body).returns(createCustomerPromise);

			CustomerMiddleware.addCustomer(req, res, next);

			sinon.assert.callCount(createCustomer, 1);

			return createCustomerPromise.catch(function(err) {
				expect(err).to.be.a('object');
				expect(err).to.deep.equal(expectedError);
			});
		});
	});

	describe('Get All Customers', () => {
		var getAllCustomers,
			getAllCustomersPromise,
			expectedCustomers,
			expectedError;

		beforeEach(() => {
			getAllCustomers = sinon.stub(CustomerService, 'getAllCustomers');
			req.body = {};
		});
		afterEach(() => {
			getAllCustomers.restore();
		});

		it('should successfully get all customers', () => {
			expectedCustomers = CustomerFixture.customers;
			getAllCustomersPromise = Promise.resolve(expectedCustomers);
			getAllCustomers.returns(getAllCustomersPromise);

			CustomerMiddleware.getAllCustomers(req, res, next);
			sinon.assert.callCount(getAllCustomers, 1);

			getAllCustomersPromise.then(() => {
				expect(req.response).to.be.a('array');
				expect(req.response.length).to.equal(expectedCustomers.length);
				expect(req.response).to.deep.equal(expectedCustomers);
				sinon.assert.callCount(next, 1);
			});
		});

		it('should throw error while getting all customers', () => {
			expectedError = ErrorFixture.unknownError;
			getAllCustomersPromise = Promise.reject(expectedError);
			getAllCustomers.returns(getAllCustomersPromise);
			CustomerMiddleware.getAllCustomers(req, res, next);

			sinon.assert.callCount(getAllCustomers, 1);

			getAllCustomersPromise.catch(error => {
				expect(error).to.be.a('object');
				expect(error).to.deep.equal(expectedError);
			});
		});
	});

	describe('Get Customer By ID', () => {
		var getCustomerById,
			getCustomerByIdPromise,
			expectedCustomer,
			expectedError;

		beforeEach(() => {
			getCustomerById = sinon.stub(CustomerService, 'getCustomerById');
		});

		afterEach(() => {
			getCustomerById.restore();
		});

		it('should successfully get the customer by id', () => {
			expectedCustomer = CustomerFixture.createdCustomer;
			getCustomerByIdPromise = Promise.resolve(expectedCustomer);

			getCustomerById
				.withArgs(req.params.CustomerId)
				.returns(getCustomerByIdPromise);

			CustomerMiddleware.getCustomerById(req, res, next);

			sinon.assert.callCount(getCustomerById, 1);

			getCustomerByIdPromise.then(() => {
				expect(req.response).to.be.a('object');
				expect(req.response).to.deep.equal(expectedCustomer);

				sinon.assert.callCount(next, 1);
			});
		});

		it('should throw error while getting customer by id', () => {
			expectedError = ErrorFixture.unknownError;
			getCustomerByIdPromise = Promise.reject(expectedError);

			getCustomerById
				.withArgs(req.params.customerId)
				.returns(getCustomerByIdPromise);

			CustomerMiddleware.getCustomerById(req, res, next);

			sinon.assert.callCount(getCustomerById, 1);

			getCustomerByIdPromise.catch(error => {
				expect(error).to.be.a('object');
				expect(error).to.deep.equal(expectedError);
			});
		});
	});

	describe('Update Customer', function() {
		var updateCustomer,
			updateCustomerPromise,
			expectedUpdatedCustomer,
			expectedError;

		beforeEach(function() {
			updateCustomer = sinon.stub(CustomerService, 'updateCustomer');

			req.body = CustomerFixture.updatedCustomer;
			req.params.customerId = req.body._id;
		});

		afterEach(function() {
			updateCustomer.restore();
		});

		it('should successfully modify the customer details', function() {
			expectedUpdatedCustomer = CustomerFixture.updatedCustomer;

			updateCustomerPromise = Promise.resolve(expectedUpdatedCustomer);
			updateCustomer
				.withArgs(req.params.customerId, req.body)
				.returns(updateCustomerPromise);

			CustomerMiddleware.updateCustomer(req, res, next);

			sinon.assert.callCount(updateCustomer, 1);

			return updateCustomerPromise.then(function() {
				expect(req.response).to.be.a('object');
				expect(req.response).to.deep.equal(expectedUpdatedCustomer);
				sinon.assert.callCount(next, 1);
			});
		});

		it('should throw error while modifying customer details', function() {
			expectedError = ErrorFixture.unknownError;

			updateCustomerPromise = Promise.reject(expectedError);
			updateCustomer
				.withArgs(req.params.customerId, req.body)
				.returns(updateCustomerPromise);

			CustomerMiddleware.updateCustomer(req, res, next);

			sinon.assert.callCount(updateCustomer, 1);

			return updateCustomerPromise.catch(function(error) {
				expect(error).to.be.a('object');
				expect(error).to.deep.equal(expectedError);
			});
		});
	});

	describe('Delete Customer', function() {
		var deleteCustomer,
			deleteCustomerPromise,
			expectedCustomer,
			expectedError;

		beforeEach(function() {
			deleteCustomer = sinon.stub(CustomerService, 'deleteCustomer');
		});

		afterEach(function() {
			deleteCustomer.restore();
		});

		it('should successfully remove the customer', function() {
			expectedCustomer = CustomerFixture.createdCustomer;

			deleteCustomerPromise = Promise.resolve(expectedCustomer);
			deleteCustomer
				.withArgs(req.params.customerId)
				.returns(deleteCustomerPromise);

			CustomerMiddleware.deleteCustomer(req, res, next);

			sinon.assert.callCount(deleteCustomer, 1);

			return deleteCustomerPromise.then(function() {
				expect(req.response).to.be.a('object');
				expect(req.response).to.deep.equal(expectedCustomer);
				sinon.assert.callCount(next, 1);
			});
		});

		it('should throw error while removing customer', function() {
			expectedError = ErrorFixture.unknownError;

			deleteCustomerPromise = Promise.reject(expectedError);
			deleteCustomer
				.withArgs(req.params.customerId)
				.returns(deleteCustomerPromise);

			CustomerMiddleware.deleteCustomer(req, res, next);

			sinon.assert.callCount(deleteCustomer, 1);

			return deleteCustomerPromise.catch(function(error) {
				expect(error).to.be.a('object');
				expect(error).to.deep.equal(expectedError);
			});
		});
	});
});
