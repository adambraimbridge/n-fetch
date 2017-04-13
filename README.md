# n-fetch

### Installation

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
