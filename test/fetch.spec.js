const proxyquire = require('proxyquire');
const expect = require('chai').expect;
const fetch = proxyquire('../fetch', {
	'fetch-ponyfill': () => ({ fetch: () => Promise.resolve({ ok: true, json: () => Promise.resolve({ foo: 'bar' }) }) })
});

describe('fetch', () => {
	it('fetches', () => {
		return fetch('https://www.teddy.com/status').then(data => {
			expect(data).to.deep.equal({ foo: 'bar' });
		});
	});
});
