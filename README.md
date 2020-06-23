# MM 2.0 - Redesigning my website

## Install dependencies

**Install yarn and node**

Using [homebrew](https://brew.sh/) to install node and yarn.

Install brew by running the following in a terminal:

```
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

```
brew install yarn
```

This will automatically install node if it is not already installed.

Navigate to the directory this repo is located in then run:

```
yarn install
```

This will install the package dependencies.

## Run server

While in the project directory, run this in a terminal

```
yarn start
```

Output line:

```
[Browsersync] Access URLs:
 ------------------------------------
       Local: http://localhost:7000
```

Load up http://localhost:7000 to view the project.

## Project structure

```
Gulpfile.js
src/
  assets/
  data/
  pages/
dist/
```

`Gulpfile.js` is the task runner. It contains all the tasks available to be run.

`src/` contains the working files relevant to the site.

* `assets/` contains fonts and images
* `data/` contains json files to be used by page templates
* `pages/` contains the html, css, and js

`dist/` contains the final compiled files. It is created after running any of the gulp tasks.

## Resources and reminders

### Note to self

Use [ImageOptim](https://imageoptim.com/mac) for all assets. Under Preferences, enable the SVG options. Run all images through ImageOptim to minimize file sizes.

### Build notes

CSS - Everything is compiled down to one css file. The entry point is `src/pages/index.css`.

JS - Each main directory of the site has an `index.js` that is rendered out separately. There is one for home, project, and about. None for play.

HTML - Each page of the site has an `index.html` entry point that is compiled. With the exception of `home/index.html`, the directory path of any index.html will mimic the url path. For example, the `index.html` file for the Ritual case study is `projects/ritual/index.html`.

### Links for self

[Nunjucks Docs](https://mozilla.github.io/nunjucks/templating.html),
