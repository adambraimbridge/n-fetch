const fetch = require('fetch-ponyfill')().fetch;
const httpError = require('http-errors');

module.exports = (input, init) => {
	return fetch(input, init)
		.then(response => {
			if (response.ok) {
				return response.json();
			} else {
/*				logger.warn({
					event: 'FT_FETCH_FAIL',
					statusCode: response.status,
					statusText: response.statusText,
				});*/

				return response.text()
					.then((text) => {
						throw httpError(response.status, text);
					});
			}
		});
};
