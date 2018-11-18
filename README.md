# three.js template

Template for a three.js project.

[ECMAScript 2015](https://babeljs.io/docs/en/learn/) enabled with [Babel](https://babeljs.io/).

No [grunt](https://gruntjs.com/)s, no [gulp](https://gulpjs.com/)s.

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Dependencies](#dependencies)
- [Scripts](#scripts)
    - [`npm run-script build`](#npm-run-script-build)
    - [`npm run-script start`](#npm-run-script-start)
- [Template](#template)
- [Screenshot](#screenshot)

## Dependencies

- babelify
- browserify
- serve
- stats.js
- three
- uglify-js
- watchify

## Scripts

### `npm run-script build`

Bundles the project into a single *uglified* JavaScript file.

`browserify src/index.js | uglifyjs --compress --mangle > public/js/bundle.js`

### `npm run-script start`

Starts a local server and watches any changes to the codebase.  
Just edit your code, save the changes, and refresh your browser page.

`watchify src/index.js -o public/js/bundle.js -dv & serve public`

## Template

The template includes a simple three.js scene with lights, shadows, automatic window resizing, and support for both orbit controls and gamepad controls — such as an Xbox Wireless Controller.

## Screenshot

![Screenshot 1](img/Screenshot&#32;from&#32;2018-11-18&#32;18-13-46.png)
