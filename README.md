# redact-url [![Build Status](https://travis-ci.org/zeke/redact-url.png?branch=master)](https://travis-ci.org/zeke/redact-url)

Redact or remove authentication data from URLs


## Installation

Download node at [nodejs.org](http://nodejs.org) and install it, if you haven't already.

```sh
npm install redact-url --save
```

## Usage

```js
require('redact-url')('https://suzy:secrets@example.com')
// https://REDACTED@example.com
```

## Tests

```sh
npm install
npm test
```

## License

MIT

Zeke Sikelianos &lt;zeke@sikelianos.com&gt; (http://zeke.sikelianos.com/)
