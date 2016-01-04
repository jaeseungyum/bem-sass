test:
	mocha ./tests/**.js
	mocha ./tests/**/**.js
	sass -v
	sass --trace ./demo/src/test.scss ./demo/compiled/test-rubysass.css
	node-sass -v
	node-sass ./demo/src/test.scss ./demo/compiled/test-libsass.css
