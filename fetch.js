const logger = require('@financial-times/n-logger').default;
const fetch = require('node-fetch');
const httpError = require('http-errors');

module.exports = (input, init) => {
	return fetch(input, init)
		.then(response => {
			if (response.ok) {
				let contentType;
				try {
					contentType = response.headers.get('content-type');
				}
				catch (error) {
					logger.warn(error);
				}

				return contentType && contentType.includes('json')
					? response.json()
					: response.text();
			} else {
				logger.warn({
					event: 'N_FETCH_ERROR',
					input: typeof input === 'string' ? input.replace(/\?.*$/, '') : `${typeof input} type`, // the URL without query string
					statusCode: response.status,
					statusText: response.statusText,
				});
				return response.text()
					.then((text) => {
						throw httpError(response.status, text);
					});
			}
		})
		.catch(error => {
			throw error;
		});
};
