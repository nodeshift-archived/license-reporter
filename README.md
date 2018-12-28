# license-reporter

[![Build Status](https://travis-ci.org/nodeshift/license-reporter.svg?branch=master)](https://travis-ci.org/nodeshift/license-reporter)
[![Coverage Status](https://coveralls.io/repos/github/nodeshift/license-reporter/badge.svg?branch=master&foo=bar)](https://coveralls.io/github/nodeshift/license-reporter?branch=master)

## Installation

```console
$ npm install license-reporter -g
```

## Usage

> Example using https://github.com/chalk/chalk

```console
$ git clone https://github.com/chalk/chalk.git
$ cd chalk ; npm install
$ license-reporter console 
========= APPROVED LICENSES        ==========
name: ansi-styles , version: 3.2.1 , licenses: MIT License
name: escape-string-regexp , version: 1.0.5 , licenses: MIT License
name: supports-color , version: 6.0.0 , licenses: MIT License
========= APPROVED LICENSES        ==========
<?xml version='1.0'?>
<licenseSummary>
    <project>chalk</project>
    <version>2.4.1</version>
    <license>MIT</license>
    <dependencies>
        <dependency>
            <packageName>ansi-styles</packageName>
            <version>3.2.1</version>
            <licenses>
                <license>
                    <name>MIT License</name>
                    <url>http://www.opensource.org/licenses/MIT</url>
                </license>
            </licenses>
        </dependency>
        <dependency>
            <packageName>escape-string-regexp</packageName>
            <version>1.0.5</version>
            <licenses>
                <license>
                    <name>MIT License</name>
                    <url>http://www.opensource.org/licenses/MIT</url>
                </license>
            </licenses>
        </dependency>
        <dependency>
            <packageName>supports-color</packageName>
            <version>6.0.0</version>
            <licenses>
                <license>
                    <name>MIT License</name>
                    <url>http://www.opensource.org/licenses/MIT</url>
                </license>
            </licenses>
        </dependency>
    </dependencies>
</licenseSummary>
```

## More commands

```
license-reporter --help
Usage: license-reporter <command> [options]

Commands:
  license-reporter console  Shows license information on standard output.
  license-reporter merge    Merge license XML files.
  license-reporter report   Creates a HTML report.
  license-reporter save     Saves license information to a file.

Options:
  --help     Show help                                                 [boolean]
  --version  Show version number                                       [boolean]
  --cwd      Change the current working directory
```

## Save

```
~/Desktop$ mkdir foo
~/Desktop$ cd foo
~/Desktop/foo$ npm init -y
~/Desktop/foo$ npm install express -S

~/Desktop/foo$ license-reporter save --xml license1.xml
========= APPROVED LICENSES        ==========
name: express , version: 4.16.4 , licenses: MIT License
========= APPROVED LICENSES        ==========

~/Desktop/foo$ cat licenses/license1.xml 
<?xml version='1.0'?>
<licenseSummary>
    <project>foo</project>
    <version>1.0.0</version>
    <license>ISC</license>
    <dependencies>
        <dependency>
            <packageName>express</packageName>
            <version>4.16.4</version>
            <licenses>
                <license>
                    <name>MIT License</name>
                    <url>http://www.opensource.org/licenses/MIT</url>
                </license>
            </licenses>
        </dependency>
    </dependencies>
</licenseSummary>
```

```
~/Desktop$ mkdir bar
~/Desktop$ cd bar
~/Desktop/bar$ npm init -y
~/Desktop/bar$ npm install request -S

~/Desktop/bar$ license-reporter save --xml license2.xml
========= APPROVED LICENSES        ==========
name: request , version: 2.88.0 , licenses: Apache License 2.0
========= APPROVED LICENSES        ==========

~/Desktop/bar$ cat licenses/license2.xml 
<?xml version='1.0'?>
<licenseSummary>
    <project>bar</project>
    <version>1.0.0</version>
    <license>ISC</license>
    <dependencies>
        <dependency>
            <packageName>request</packageName>
            <version>2.88.0</version>
            <licenses>
                <license>
                    <name>Apache License 2.0</name>
                    <url>http://www.apache.org/licenses/LICENSE-2.0</url>
                </license>
            </licenses>
        </dependency>
    </dependencies>
</licenseSummary>
```

## XML merging example

The intention for this functionality is to be able to create an xml file that contains all the licenses for a project that is made up of two or more projects.

So we are going to merge both `license1.xml` and `license2.xml` files created by the previous examples.

Inside the example foo root directory run:

```console
~/Desktop/foo$ license-reporter merge --merge-project-name="UberProject" --merge-license-xmls="./licenses/license1.xml,../bar/licenses/license2.xml" --merge-output="merged.xml"


~/Desktop/foo$ cat licenses/merged.xml 
<?xml version='1.0'?>
<UberProject>
    <project>
        <licenseSummary>
            <project>foo</project>
            <version>1.0.0</version>
            <license>ISC</license>
            <dependencies>
                <dependency>
                    <packageName>express</packageName>
                    <version>4.16.4</version>
                    <licenses>
                        <license>
                            <name>MIT License</name>
                            <url>http://www.opensource.org/licenses/MIT</url>
                        </license>
                    </licenses>
                </dependency>
            </dependencies>
        </licenseSummary>
    </project>
    <project>
        <licenseSummary>
            <project>bar</project>
            <version>1.0.0</version>
            <license>ISC</license>
            <dependencies>
                <dependency>
                    <packageName>request</packageName>
                    <version>2.88.0</version>
                    <licenses>
                        <license>
                            <name>Apache License 2.0</name>
                            <url>http://www.apache.org/licenses/LICENSE-2.0</url>
                        </license>
                    </licenses>
                </dependency>
            </dependencies>
        </licenseSummary>
    </project>
</UberProject>
```

## How licenses are found in files

We are using [license-checker](https://github.com/davglass/license-checker) tool to search licenses inside files.

The order in which `license-checker` tool looks for the licenses is:

1. package.json
2. Try to identify the license with the spdx module to see if it has a valid SPDX license attached.
If that fails, we then look into the module for the following files: LICENSE & COPYING.

A decision was made to not check the README for license information. Although the functionality is present, it wanders into natural language processing to try and infer the license type. If you discover that license information is in a README, we would encourage you to submit a PR to the appropriate repository to ensure the license information is in a more appropriate place.

> More details here: https://github.com/davglass/license-checker#how-licenses-are-found

## License Metadata - "unified list"

The project allows you to specify metadata about licenses and a file can be found in: `license-reporter/lib/resources/default-unified-list.json`.

This list serves a number of roles as the metadata can be used to control what is outputted. Three areas of interest are controlled by:

- It provides the capability or white listing licenses via an `approved` toggle. This allows you fine grain what licenses are acceptable to be used or not
- Long (`fedora_name`) and short (`fedora_abbrev`) abbreviations are possible allowing you customise the naming convention as you see fit
- A `URL` reference to point towards the license text associated with the given license

You can use a custom license list. For this, we recommend that the default file be used and modified (only the values) for your need. We are using a verifier to validate the unified-list JSON schema. If any errors are found, (at the moment) you will see error messages like these:

```
Item: 2 - instance.id is not of a type (s) string
Item: 3 - instance.id is not of a type (s) string
Item: 3 - instance.approved is not of a type (s) string
```

So to use, just add the `--unified-list` parameter with the value of the file path.

```console
$ license-reporter --unified-list=/full_path_here/my-unified-list.json
```

## WARNING about unknown licenses

Sometimes some warning messages may appear on the output. This happens when the license-report can not find an appropriate license for a particular dependency. This will include instances where the license information is stored in the README.

```console
========= WARNING UNKNOWN LICENSES ==========
name: dep-foo, version: file:../dep-foo, licenses: UNKNOWN
========= WARNING UNKNOWN LICENSES ==========
```

The other cases where a license can be `UNKNOWN`, is when the license name has the value 'UNKNOWN' or license name begins with the word 'Custom' or empty ''.

## Proprietary Licenses

Some dependencies, which may be internal components that are not open source, may need to be considered seperately. The recommendation here is to not flag those licenses as UNKNOWN, but rather flag them as `Proprietary`. The `unified-list` could be the most appropriate way of handling this where an entry could be provided for licenses that fall into this category with additional metadata to be consistent with other license types encouraged. The tool cannot infer such cases and the end users best judgement is the way to proceed here. We welcome PRs if this is a requirement that you are trying to solve.

## XMl, JSON, YAML and HTML

It is possible to generate `.json` `.xml` and `.yaml` files by using the arguments:

```
license-reporter save --xml licenses.xml --json licenses.json --yaml licenses.yaml --silent
```

In the case of `html` a report will be generated, and you can specify a `css` file to apply the style.

```
license-reporter --html --css /path_to_my_css/foo.css --silent
```

## Asterisk (*) in license name
In the console output you may come across a license name which contains an asterisk, for example:

```console
========= WARNING WHITE-LISTED LICENSES ==========
name: express-bunyan-logger , version: 1.3.1 , licenses: BSD*
name: fh-cluster , version: 0.3.0 , licenses: Apache-2.0
```

Notice the `BSD*` which means the license name was deduced from an other file than package.json

## EMFile Error

The license reporter may hit an issue in relation to the max number of concurrent files it can have opened. In order to output local license files for the generation of the HTML, we face a a scenario where multiple files are open at the same time. Some repositories with a lot of dependencies may result in hitting an EMFile with respect to too many files open. The error will have a message similar to:

```
UnhandledPromiseRejectionWarning: Unhandled promise rejection (rejection id: 1): Error: EMFILE: too many open files
```

The solution to this is Operating System specific, whereby you need to raise the maxfile limit. It is particularly prevalent on OSX where the maxfile limit is low by default. More information can be found on this [stackoverflow thread](https://stackoverflow.com/questions/19981065/nodejs-error-emfile-too-many-open-files-on-mac-os) which may be a good starting point for your particular Operating System.

## How to automatically run license-reporter

The tool is designed to make it invisible working with it, as the license report generation can be easily automated leveraging the `preshrinkwrap` and `postshrinkwrap` scripts directly in the `package.json` file. This also means that all the dependencies in the `npm-shrinkwrap.json` file will be processes and reported.

See the following snippet of a `package.json` file using the license-reporter tool:

```
{
  "name": "...",
  "version": "...",
  "license": "...",
  ...
  "scripts": {
    "preshrinkwrap": "npm cache clean && npm ls",
    "postshrinkwrap": "license-reporter save --full-dependency-tree --xml licenses.xml && license-reporter report --full-dependency-tree --silent"
  },
  "dependencies": {
    ...
  },
  "devDependencies": {
    ...
    "license-reporter": "1.0.2",
    ...
 },
  "engines": {
    ...
  },
  "preferGlobal": ...
}
```

## Contributing
Please read the [contributing guide](./CONTRIBUTING.md)
