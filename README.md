# n-fetch [![CircleCI](https://circleci.com/gh/Financial-Times/n-fetch.svg?style=svg&circle-token=33bcf2eb98fe2e875cc66de93d7e4a50369c952d)](https://github.com/Financial-Times/n-fetch)

The fetch logic we wanted


## Requirements

* Node 8.10.x


## Installation

```sh
git clone git@github.com:Financial-Times/n-fetch.git
cd n-fetch
make install
make test
```


## Development

### Install from NPM

```sh
npm install --save @financial-times/n-fetch
```

### Usage

```js
const fetch = require('@financial-times/n-fetch');

fetch('https://api.fastly.com/public-ip-list')
	.then((data) => {
		console.log(data);
	})
	.catch((error) => {
		console.log(error);
	});
```

### Documentation

This library is a wrapper for [node-fetch](https://www.npmjs.com/package/node-fetch).
It exports a single default method with the following arguments and returns a promise.
- `input` - A string representing the URL for fetching
- `init` - an object with the [request options](https://www.npmjs.com/package/node-fetch#options)
