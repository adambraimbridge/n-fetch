const proxyquire = require('proxyquire');
const nock = require('nock');
const sinon = require('sinon');
const { expect } = require('chai');

const sandbox = sinon.sandbox.create();

const stubs = {
	logger: {
		warn: sandbox.stub()
	}
};

const fetch = proxyquire('../fetch', {
	'@financial-times/n-logger': { default: stubs.logger }
});

describe('fetch', () => {
	afterEach(() => {
		nock.cleanAll();
		sandbox.reset();
	});

	context('when the request succeeds', () => {
		beforeEach(() => {
			nock('https://www.teddy.com')
				.get('/status')
				.reply(200, { foo: 'bar' });
		});

		it('fetches and parses data', () => (
			fetch('https://www.teddy.com/status').then((data) => {
				expect(data).to.deep.equal({ foo: 'bar' });
			})
		));
	});

	context('when the request fails', () => {
		beforeEach(() => {
			nock('https://www.teddy.com')
				.get('/status')
				.query(true)
				.reply(500, 'Oh dear!');
		});

		it('returns a HTTP error for a bad HTTP response', () => (
			fetch('https://www.teddy.com/status')
				.then(() => {
					throw new Error('This should not be called');
				})
				.catch((error) => {
					expect(error.name).to.equal('InternalServerError');
					expect(error.message).to.equal('Oh dear!');
				})
		));

		it('logs the bad request', () => (
			fetch('https://www.teddy.com/status')
				.then(() => {
					throw new Error('This should not be called');
				})
				.catch(() => {
					sinon.assert.calledWith(
						stubs.logger.warn,
						sinon.match({
							event: 'N_FETCH_ERROR',
							statusCode: 500
						})
					);
				})
		));

		it('strips the request query string when logging the error', () => (
			fetch('https://www.teddy.com/status?id=123&key=abc')
				.then(() => {
					throw new Error('This should not be called');
				})
				.catch(() => {
					sinon.assert.calledWith(
						stubs.logger.warn,
						sinon.match({
							input: 'https://www.teddy.com/status'
						})
					);
				})
		));
	});
});
