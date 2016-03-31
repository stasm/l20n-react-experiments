export SHELL := /bin/bash
export PATH  := node_modules/.bin:$(PATH)

build:
	rollup -c base/rollup.config.js
	rollup -c components/rollup.config.js
	rollup -c mutable-state/rollup.config.js
	rollup -c declarative-state/rollup.config.js
	rollup -c declarative-property/rollup.config.js
	rollup -c context/rollup.config.js
	rollup -c components-context/rollup.config.js
	rollup -c componentDidUpdate/rollup.config.js
	rollup -c mutation/rollup.config.js

watch:
	ls **/*.{js,html} | entr make build

clean:
	rm -rf **/bundle.js
