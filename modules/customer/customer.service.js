(function() {
	'user strict';

	module.exports = {
		createCustomer: createCustomer,
		getAllCustomers: getAllCustomers
	};

	var CustomerModel = require('./customer.module')().CustomerModel;

	function createCustomer(customer) {
		return CustomerModel.create(customer);
	}

	function getAllCustomers() {
		return CustomerModel.find({}).exec();
	}
})();
