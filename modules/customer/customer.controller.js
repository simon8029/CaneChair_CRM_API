(function() {
	'use strict';
	var express = require('express');
	var router = express.Router();
	var CustomerMiddleware = require('./customer.module')().CustomerMiddleware;

	router.post('/', CustomerMiddleware.addCustomer, function(req, res) {
		res.status(201).json(req.response);
	});

	router.get('/', CustomerMiddleware.getAllCustomers, (req, res) => {
		res.status(200).json(req.response);
	});

	router.get(
		'/:customerId',
		CustomerMiddleware.getCustomerById,
		(req, res) => {
			res.status(200).json(req.response);
		}
	);

	router.put('/:customerId', CustomerMiddleware.updateCustomer, function(
		req,
		res
	) {
		res.status(200).json(req.response);
	});

	router.delete('/:customerId', CustomerMiddleware.deleteCustomer, function(
		req,
		res
	) {
		res.status(200).json(req.response);
	});

	module.exports = router;
})();
