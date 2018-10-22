(function() {
	'use strict';

	module.exports = {
		addCustomer: addCustomer,
		getAllCustomers: getAllCustomers,
		getCustomerById: getCustomerById,
		updateCustomer: updateCustomer,
		deleteCustomer: deleteCustomer
	};

	var CustomerService = require('./customer.module')().CustomerService;

	function addCustomer(req, res, next) {
		CustomerService.createCustomer(req.body)
			.then(success)
			.catch(failure);

		function success(data) {
			req.response = data;
			next();
		}

		function failure(error) {
			next(error);
		}
	}

	function getAllCustomers(req, res, next) {
		CustomerService.getAllCustomers()
			.then(success)
			.catch(failure);

		function success(data) {
			req.response = data;
			next();
		}

		function failure(err) {
			next(err);
		}
	}

	function getCustomerById(req, res, next) {
		CustomerService.getCustomerById(req.params.customerId)
			.then(success)
			.catch(failure);

		function success(data) {
			req.response = data;
			next();
		}

		function failure(err) {
			next(err);
		}
	}

	function updateCustomer(req, res, next) {
		CustomerService.updateCustomer(req.params.customerId, req.body)
			.then(success)
			.catch(failure);

		function success(data) {
			req.response = data;
			next();
		}

		function failure(err) {
			next(err);
		}
	}

	function deleteCustomer(req, res, next) {
		CustomerService.deleteCustomer(req.params.customerId)
			.then(success)
			.catch(error);

		function success(data) {
			req.response = data;
			next();
		}

		function error(err) {
			next(err);
		}
	}
})();
