# Vue Component Template Contributor Guide
Information for people wanting to contribute code to this project.

Firstly, thanks for taking the time to contribute!

## Build Commands
Run using `npm build <command>`.

| Command     | Description                                                                                  |
|-------------|----------------------------------------------------------------------------------------------|
| serve       | Runs a local development server using hot reload.                                            |
| test        | Runs all test types (currently only unit tests). Also builds code coverage report.           |
| test:unit   | Runs all unit test suites.                                                                   |
| lint        | Runs eslint on all .js and .vue files.                                                       |
| build       | Runs `lint`, `scanner` commands, and builds distributable production assets.                 |
| scanner     | Runs code vulnerability scanner, including checking for outdated NPM modules.                |
| make-badges | Updates README.md badges from README-template.md.                                            |
| release     | Bumps package version, create git tag, a new github release, merges `develop` into `master`. |

## Pre-commit hooks
When committing changes, the build commands `test`, `build` and `make-badges` are automatically run, and the
commit will fail if any of these commands fail.

## Code Style, Standards and Linting
This is open source software. While you might not agree 100% on the standards used, _something_ has to be put in place
to ensure consistency, and the aim is to make easily readable code. `eslint` is used to check for syntax errors and
basic formatting guidelines. `.editorconfig` contains a full formatting configuration - this file can be imported into 
IDEA IDE's (WebStorm for example) for automatic code formatting. **Pull requests may be rejected if no effort is made to
adhere to this coding style.**

Please read [Wiki Coding Standards] (docs/CODING-STANDARDS.md) the full coding style guidelines.

## Updating README
Please ensure any new features or relevant changes are reflected in the README.md file, by updating the 
README-template.md file. The build command `make-badges` creates the actual README.md file from README-template.md.

## Vulnerability scanning
The build command `scanner` uses [Hawkeye](https://github.com/hawkeyesec/scanner-cli) security scanner. CI builds will
fail if any vulnerabilities marked as `high` are found.
Configuration is in `.hawkeyerc` and includes the following scanner modules:

~~~
files-ccnumber
files-entropy
files-secrets
node-npmaudit
node-npmoutdated
~~~

### Outdated NPM modules
To update any outdated NPM modules, first install the NCU module globally:

~~~
npm install -g npm-check-updates
~~~

Then run `npm update` and `ncu -u` for each module to update, which will update the package.json and package-lock.json
files. E.g.:

~~~
npm update style-loader && ncu -u style-loader
~~~

Then finally run `npm install` to actually update your project dependency (this will update the package-lock.json file).

## Component Demo / Github Pages
The Vue component is showcased using a small demo app found in `src/demo`. The `serve` build command compiles this 
source into `dist/demo` and opens the browser to run this app. It uses [MiniCSS](https://minicss.org) for simple
responsive styling. (The packaged Vue component does not include this - only scoped styles included within the component).

The `build` command copies the demo app into the `docs` folder which is used by github pages to host the demo app.

## Branches
`develop` is the main / default branch. Create your working branch from `develop`. `master` is the primary release 
branch - tags and releases are created against this branch.

## Package Release
Repository owners can create new package releases by running the build command `release`. This script will:

- Bump the package.json version
- Merge `develop` branch into `master`
- Create a new git tag
- Create a new github release

A github action (triggered by a new github release) will publish a new NPM package. Depending on package.json 
configuration, this will be published to the github package registry (for private projects) or NPM registry for 
public projects.   