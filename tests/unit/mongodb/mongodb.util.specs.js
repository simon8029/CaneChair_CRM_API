var chai = require('chai');
var expect = chai.expect;

var MongoDBUtil = require('../../../modules/mongodb/mongodb.module')
	.MongoDBUtil;

describe('MongoDBUtil', () => {
	describe('mongodb.util file', () => {
		it('should read the mongodb.module file', () => {
			expect(MongoDBUtil).to.be.a('object');
		});

		it('should confirm init function exists', () => {
			expect(MongoDBUtil.init).to.be.a('function');
		});
	});
});
