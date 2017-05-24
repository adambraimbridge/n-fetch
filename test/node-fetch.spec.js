const chai = require('chai');
const expect = chai.expect;
const nock = require('nock');
const proxyquire = require('proxyquire');
const fetch = proxyquire('../fetch', {'@financial-times/n-logger': {}});

const fakedotcom = nock('http://www.fake.com')
	.get('/text')
	.reply(200, 'some text')
	.get('/json')
	.reply(200, {'some':'json'});

describe('node-fetch', () => {
	it('handles json responses', () => {
		return fetch('http://www.fake.com/json')
			.then(response => {
				expect(response).to.deep.equal({'some':'json'});
			});
	});
	it('handles text responses', () => {
		return fetch('http://www.fake.com/text')
			.then(response => {
				expect(response).to.equal('some text');
			});
	});
});
