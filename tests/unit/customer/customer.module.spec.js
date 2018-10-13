var chai = require('chai');
var expect = chai.expect;

var CustomerModule = require('../../../modules/customer/customer.module');

describe('CustomerModule', () => {
	describe('customer.module file', () => {
		it('should confirm CustomerModule function exist', () => {
			expect(CustomerModule).to.be.a('function');
		});

		it('should confirm CustomerModule function returns an object', () => {
			expect(CustomerModule()).to.be.a('object');
		});

		it('should confirm CustomerController function exist', () => {
			expect(CustomerModule().CustomerController).to.be.a('function');
		});

		it('should confirm CustomerMiddleware object exist', () => {
			expect(CustomerModule().CustomerMiddleware).to.be.a('object');
		});

		it('should confirm CustomerService object exist', () => {
			expect(CustomerModule().CustomerService).to.be.a('object');
		});

		it('should confirm CustomerModel function exist', () => {
			expect(CustomerModule().CustomerModel).to.be.a('function');
		});
	});
});
