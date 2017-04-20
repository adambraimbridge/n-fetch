const logger = require('@financial-times/n-logger').default;
const fetch = require('fetch-ponyfill')().fetch;
const httpError = require('http-errors');

module.exports = (input, init) => {
	return fetch(input, init)
		.then(response => {
			if (response.ok) {
				return response.json();
			} else {
				logger.warn({
					event: 'N_FETCH_ERROR',
					statusCode: response.status,
					statusText: response.statusText,
				});
				return response.text()
					.then((text) => {
						throw httpError(response.status, text);
					});
			}
		});
};
