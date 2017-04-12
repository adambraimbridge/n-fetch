# fetch

### Installation

```sh
npm install --save @financial-times/fetch
```

### Usage

```js
const fetch = require('@financial-times/fetch');

fetch('https://api.fastly.com/public-ip-list')
	.then((data) => {
		console.log(data);
	})
	.catch((error) => {
		console.log(error);
	});
```
