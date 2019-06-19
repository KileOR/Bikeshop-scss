# Webpack Simple Start

A simple project structure for promo-sites or multi-page applications. Provides a starter pack with ready-to-use environment.
NOTE: all run command need execute from a project root folder. The project uses Webpack 4. Server address: http://localhost:8080/.

## Features

* Uses ES6 - make your code more modern and more readable.
* Uses SASS framework for stylesheets.
* Allows to get the dist version in one command (NOTE: configurable).
* And many others!

## Get started

* Checkout this repository to your hard drive.
* Download and install the latest version of [node.js](http://nodejs.org).
* Run `npm init` to set name, version, keywords of the project.
* Run `npm i && npm audit fix` to install node modules and fix vulnerabilities.
* Run `npm start` to start the server.

NOTE: the project uses SASS for CSS styles, that is compiled in runtime.
If you run this website on the file system, it is highly recommended to use Google Chrome with flag __--disable-web-security__.
As an option, you can also host the website on any server (IIS, node.js, Apache etc.).

## Commands

* Run `npm start` to start the server.
* Run `npm run build` to compile your project as a dist version (minified and uglified) in dist folder.

## Folder structure

* src - contains static files (fonts, images, documents, swf etc.).
	* html - contains all components and views.
	* fonts - contains all fonts elements.
	* img - contains all images elements.
	* js - contains all custom Javascript code.
	* js/index.js - file that consist of imports of style files and all js files(there you can add new js files or disable css frameworks).
	* scss - contains all sass files.
	* dist - this folder contain release or development version of site (to compile project into dist version use `npm run build`).

## Contact

Author: Vladislav Markus.
Email: [v.markus@itransition.com](mailto:v.markus@itransition.com).
Skype: vlad_markus
