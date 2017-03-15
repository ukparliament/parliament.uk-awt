# Automated Web Test
Automated web testing using [Selenium][selenium], [Mocha][mochjs] and [SauceLabs][saucelabs].


## Requirements
This app requires the following:
* [Node][node]
* [NPM][npm]
* [SauceLabs account][saucelabs]


## Getting Started
Setup the main application repository:

```bash
git clone https://github.com/ukparliament/parliament.uk-awt.git
cd parliament.uk-awt
npm i
```

`./Makefile` requires your Saucelabs username and access key


## Running tests
This runs concurrent test
### `make sauce`


## Running incremental tests
### `make isauce`


## Contributing
If you wish to submit a bug fix or feature, you can create a pull request and it will be merged pending a code review.

1. Fork the repository
1. Create your feature branch (`git checkout -b my-new-feature`)
1. Commit your changes (`git commit -am 'Add some feature'`)
1. Push to the branch (`git push origin my-new-feature`)
1. Create a new Pull Request


[selenium]: http://docs.seleniumhq.org/
[sel-doc]: https://seleniumhq.github.io/selenium/docs/api/javascript/index.html
[mochjs]: http://mochajs.org/
[saucelabs]: https://saucelabs.com/
[node]: https://nodejs.org/en/
[npm]: https://www.npmjs.com
