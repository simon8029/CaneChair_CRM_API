(function() {
	'use strict';

	module.exports = {
		addCustomer: addCustomer,
		getAllCustomers: getAllCustomers
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
})();
