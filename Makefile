test:
	mocha ./tests/**.js
	mocha ./tests/**/**.js
	sass ./demo/src/test.scss ./demo/compiled/test-rubysass.css
	node-sass ./demo/src/test.scss ./demo/compiled/test-libsass.css
