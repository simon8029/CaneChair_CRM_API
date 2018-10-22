(function() {
	'user strict';

	module.exports = {
		createCustomer: createCustomer,
		getAllCustomers: getAllCustomers,
		getCustomerById: getCustomerById,
		updateCustomer: updateCustomer
	};

	var CustomerModel = require('./customer.module')().CustomerModel;

	function createCustomer(customer) {
		return CustomerModel.create(customer);
	}

	function getAllCustomers() {
		return CustomerModel.find({}).exec();
	}

	function getCustomerById(customerId) {
		return CustomerModel.findById(customerId).exec();
	}

	function updateCustomer(customerId, newCustomer) {
		return CustomerModel.findByIdAndUpdate(customerId, newCustomer, {
			new: true
		}).exec();
	}
})();
