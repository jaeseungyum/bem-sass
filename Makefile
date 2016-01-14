test:
	mocha ./tests/**[tT]ests.js
	mocha ./tests/**/**[tT]ests.js
	sass -v
	sass --trace ./demo/src/test.scss ./demo/compiled/test-rubysass.css
	node-sass -v
	node-sass ./demo/src/test.scss ./demo/compiled/test-libsass.css

compile-node-sass:
	node-sass -v
	node-sass ./demo/src/test.scss ./demo/compiled/test-libsass.css

compile-ruby-sass:
	sass -v
	sass --trace ./demo/src/test.scss ./demo/compiled/test-rubysass.css
