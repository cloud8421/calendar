.PHONY: all setup server watch-src watch-scss build-sass build-js build-html build

IMAGES_FOLDER = ./images
STYLES_FOLDER = ./styles
SRC_FOLDER = ./src

HTML_FILE = ./index.html
STYLES_FILE = $(STYLES_FOLDER)/app.scss
SRC_FILE = $(SRC_FOLDER)/app.js

BUILD_FOLDER = ./_build
BUILD_IMAGES_FOLDER = $(BUILD_FOLDER)/images

HTML_BUILD_FILE = $(BUILD_FOLDER)/index.html
JS_BUILD_FILE = $(BUILD_FOLDER)/app.js
STYLES_BUILD_FILE = $(BUILD_FOLDER)/app.css

JS_BUILD_FILE_URL = /app.js
STYLES_BUILD_FILE_URL = /app.css

JS_BUILD_OPTS = -t [ babelify --sourceMapRelative . ]

all: build-html build-images build-sass server watch-src watch-scss

$(BUILD_FOLDER):
	mkdir -p $@

$(BUILD_IMAGES_FOLDER):
	mkdir -p $@

setup:
	npm install -g browserify watchify
	brew install sassc fswatch
	npm install
	mkdir -p images
	mkdir -p styles
	mkdir -p src
	touch styles/app.scss
	touch src/app.js

server: $(BUILD_FOLDER)
	cd $(BUILD_FOLDER) && python -m SimpleHTTPServer > /dev/null 2>&1

watch-src: $(BUILD_FOLDER)
	watchify -d -e $(SRC_FILE) $(JS_BUILD_OPTS) --outfile $(JS_BUILD_FILE) --verbose

watch-scss: $(BUILD_FOLDER)
	fswatch --recursive --one-per-batch $(STYLES_FOLDER) | xargs -n1 -I{} sassc $(STYLES_FILE) $(STYLES_BUILD_FILE)

build-html: $(BUILD_FOLDER)
	sed -e 's/{JS}/\${JS_BUILD_FILE_URL}/g' ${HTML_FILE} |\
	sed -e 's/{STYLES}/\${STYLES_BUILD_FILE_URL}/g' \
	> ${HTML_BUILD_FILE}

build-images: $(BUILD_FOLDER) $(BUILD_IMAGES_FOLDER)
	cp ${IMAGES_FOLDER}/* $(BUILD_IMAGES_FOLDER)

build-js: $(BUILD_FOLDER)
	browserify -d -e $(SRC_FILE) $(JS_BUILD_OPTS) --outfile $(JS_BUILD_FILE)

build-sass: $(BUILD_FOLDER)
	sassc $(STYLES_FILE) $(STYLES_BUILD_FILE)

build: build-html build-js build-sass build-images
