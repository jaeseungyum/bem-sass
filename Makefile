test:
	mocha ./tests/**.js
	mocha ./tests/**/**.js
	sass ./demo/src/test.scss ./demo/public/test-rubysass.css
	node-sass ./demo/src/test.scss ./demo/public/test-libsass.css
