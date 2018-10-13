(function() {
	var mongoose = require('mongoose');
	var Schema = mongoose.Schema;

	var CustomerSchema = new Schema({
		firstName: {
			type: String,
			required: true
		},
		lastName: {
			type: String,
			required: true
		},
		email: {
			type: String,
			required: true
		},
		phoneNumber: {
			type: Number,
			required: true
		},
		address: String,
		city: String,
		province: String,
		postCode: String,
		country: String
	});

	try {
		customers = mongoose.model('customers', CustomerSchema);
	} catch (e) {
		customers = mongoose.model('customers');
	}

	module.exports = customers;
})();
