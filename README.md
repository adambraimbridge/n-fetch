# n-fetch [![CircleCI](https://circleci.com/gh/Financial-Times/n-fetch.svg?style=svg&circle-token=33bcf2eb98fe2e875cc66de93d7e4a50369c952d)](https://github.com/Financial-Times/n-fetch)

This package is a wrapper for [node-fetch](https://www.npmjs.com/package/node-fetch) and provides an interface for fetching resources server side.

Additional features:
- If the resouce returns JSON, then the response will be sent as JSON automatically
- Errors are logged to the console using [n-logger](https://github.com/Financial-Times/n-logger)


## Requirements

* Node 8.10.x


## Installation

```sh
git clone git@github.com:Financial-Times/n-fetch.git
cd n-fetch
make install
```


## Development

### Testing

In order to run the tests locally you'll need to run:

```sh
make test
```

### Install from NPM

```sh
npm install --save @financial-times/n-fetch
```

### Usage

```js
const fetch = require('@financial-times/n-fetch');

fetch('https://api.fastly.com/public-ip-list', {
    method: 'GET',
    headers: {},        // request headers. format is the identical to that accepted by the Headers constructor (see below)
    body: null,         // request body. can be null, a string, a Buffer, a Blob, or a Node.js Readable stream
    redirect: 'follow', // set to `manual` to extract redirect headers, `error` to reject redirect
    signal: null,       // pass an instance of AbortSignal to optionally abort requests
    follow: 20,         // maximum redirect count. 0 to not follow redirect
    timeout: 0,         // req/res timeout in ms, it resets on redirect. 0 to disable (OS limit applies). Signal is recommended instead.
    compress: true,     // support gzip/deflate content encoding. false to disable
    size: 0,            // maximum response body size in bytes. 0 to disable
    agent: null         // http(s).Agent instance or function that returns an instance (see below)
}).then((data) => {
    console.log(data);
}).catch((error) => {
    console.log(error);
});
```

### Documentation

This library exports a single default method with the following arguments and returns a promise.
- `input` - A string representing the URL for fetching
- `init` - an object with the [request options](https://www.npmjs.com/package/node-fetch#options)
