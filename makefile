export SHELL := /bin/bash
export PATH  := node_modules/.bin:$(PATH)

build:
	rollup -c src/example/rollup.config.js
	rollup -c src/components/rollup.config.js
	rollup -c src/mutable-state/rollup.config.js
	rollup -c src/declarative-state/rollup.config.js
	rollup -c src/declarative-property/rollup.config.js
	rollup -c src/context/rollup.config.js
	rollup -c src/components-context/rollup.config.js
	rollup -c src/componentDidUpdate/rollup.config.js
	rollup -c src/mutation/rollup.config.js

watch:
	ls src/**/*.* | entr make build

clean:
	rm -rf dist/**/*.js
