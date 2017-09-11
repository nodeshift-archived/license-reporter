# license-reporter

[![Coverage Status](https://coveralls.io/repos/github/bucharest-gold/license-reporter/badge.svg?branch=master)](https://coveralls.io/github/bucharest-gold/license-reporter?branch=master)
[![Build Status](https://travis-ci.org/bucharest-gold/license-reporter.svg?branch=master)](https://travis-ci.org/bucharest-gold/license-reporter)
[![Code Climate](https://codeclimate.com/github/bucharest-gold/license-reporter/badges/gpa.svg)](https://codeclimate.com/github/bucharest-gold/license-reporter)

License-reporter is a tool that is intended to be used by Red Hat projects/products that require project dependency
licenses to be retrieved and reported in xml and html format.

## Installation

Clone this repo and then:
```
npm install
npm link
```

## Usage

```
$ license-reporter --help
Usage: license-reporter /path/to/project [options]

Options:
  --version               Show version number                          [boolean]
  --file                  file to store the license information in      [string]
  --all                   will list all production licenses for all modules
                                                                [default: false]
  --ignore-version-range  will list all licenses from declared package.json
                          dependencies ignoring version range   [default: false]
  --silent                hides the console output              [default: false]
  --html                  outputs the license in html format to license.html
                                                                [default: false]
  --css                   css file to apply style on html report
             [default: "license-reporter/lib/resources/licenses.css"]
  --unified-list          will use the default unified list containing licenses
                          approved or not                       [default: false]
  --merge                 merge license.xml files               [default: false]
  --merge-product-name    the name the product which the license.xml are part of
                                                                [default: false]
  --merge-license-xmls    a comma separated list of license.xml files to merge
                                                                [default: false]
  --merge-output          file to write the merged license info to
  --verbose               include the license content in the xml and not just
                          the path to the file                  [default: false]
  --name-map              a file/url containing a mapping of license names
                                                                       [default:
       "license-reporter/lib/resources/default-canonical-names.json"]
  --help                  Show help                                    [boolean]
```

## Example output

> Example using this project: https://github.com/bucharest-gold/szero

```
$ git clone https://github.com/bucharest-gold/szero.git
$ cd szero ; npm install
$ license-reporter --file=license1.xml
```

```xml
<?xml version='1.0'?>
<licenseSummary>
    <project>szero</project>
    <version>0.9.3</version>
    <dependencies>
        <dependency>
            <packageName>commander</packageName>
            <version>2.9.0</version>
            <licenses>
                <license>
                    <name>MIT</name>
                    <url>/work/bucharest-gold/szero/node_modules/commander/LICENSE</url>
                </license>
            </licenses>
        </dependency>
        <dependency>
            <packageName>node-builtins</packageName>
            <version>0.1.1</version>
            <licenses>
                <license>
                    <name>Apache-2.0</name>
                    <url>/work/bucharest-gold/szero/node_modules/node-builtins/LICENSE</url>
                </license>
            </licenses>
        </dependency>
        <dependency>
            <packageName>roi</packageName>
            <version>0.15.0</version>
            <licenses>
                <license>
                    <name>Apache-2.0</name>
                    <url>/work/bucharest-gold/szero/node_modules/roi/LICENSE</url>
                </license>
            </licenses>
        </dependency>
    </dependencies>
</licenseSummary>
```

> Example using this project: https://github.com/bucharest-gold/genet

```
$ https://github.com/bucharest-gold/genet.git
$ cd genet ; npm install
$ license-reporter --file=license2.xml
```

```xml
<?xml version='1.0'?>
<licenseSummary>
    <project>genet</project>
    <version>0.0.7</version>
    <dependencies>
        <dependency>
            <packageName>cli-table2</packageName>
            <version>0.2.0</version>
            <licenses>
                <license>
                    <name>MIT</name>
                    <url>/work/bucharest-gold/genet/node_modules/cli-table2/README.md</url>
                </license>
            </licenses>
        </dependency>
        <dependency>
            <packageName>fidelity</packageName>
            <version>4.2.0</version>
            <licenses>
                <license>
                    <name>MIT</name>
                    <url>/work/bucharest-gold/genet/node_modules/fidelity/LICENSE.txt</url>
                </license>
            </licenses>
        </dependency>
        <dependency>
            <packageName>huilu</packageName>
            <version>0.1.3</version>
            <licenses>
                <license>
                    <name>Apache-2.0</name>
                    <url>/work/bucharest-gold/genet/node_modules/huilu/LICENSE.txt</url>
                </license>
            </licenses>
        </dependency>
    </dependencies>
</licenseSummary>
```

### Asterisk (*) in license name
In the console output you may come across a license name which contains an asterisk, for example:

    ========= WARNING WHITE-LISTED LICENSES ==========
    name: express-bunyan-logger , version: 1.3.1 , licenses: BSD*
    name: fh-cluster , version: 0.3.0 , licenses: Apache-2.0

Notice the `BSD*` which means the license name was deduced from an other file than package.json 

## XML merging example

The intention for this functionality is to be able to create an xml file that contains all the licenses for a product (made up of one or more projects).

So we are going to merge both `license1.xml` and `license2.xml` files created by the previous examples.

```
$ license-reporter --merge --merge-product-name="UberProject" --merge-license-xmls="./szero/license1.xml, ./genet/license2.xml" --merge-output="merged.xml" --silent

$ cat merged.xml
```

```xml
<?xml version='1.0'?>
<UberProject>
    <project>
        <szero>
            <license>
                <name>node-builtins</name>
                <version>0.1.1</version>
                <license>Apache-2.0</license>
                <file>/path/szero/node_modules/node-builtins/LICENSE</file>
            </license>
            <license>
                <name>roi</name>
                <version>0.15.0</version>
                <license>Apache-2.0</license>
                <file>/path/szero/node_modules/roi/README.md</file>
            </license>
        </szero>
    </project>
    <project>
        <genet>
            <license>
                <name>cli-table2</name>
                <version>0.2.0</version>
                <license>MIT</license>
                <file>/path/genet/node_modules/cli-table2/README.md</file>
            </license>
            <license>
                <name>fidelity</name>
                <version>4.2.0</version>
                <license>MIT</license>
                <file>/path/genet/node_modules/fidelity/LICENSE.txt</file>
            </license>
            <license>
                <name>huilu</name>
                <version>0.1.3</version>
                <license>Apache-2.0</license>
                <file>/path/genet/node_modules/huilu/LICENSE.txt</file>
            </license>
        </genet>
    </project>
</UberProject>
```

## License-reporter --all

Also possible to generate a xml with licenses from all sub-modules:

> Note: szero is a small project but the generated xml has 664K size.

```
cd szero
$ license-reporter --all --file=all.xml
$ du -s -h all.xml
664K	all.xml
```

## How licenses are found in files

We are using [license-checker](https://github.com/davglass/license-checker) tool to search licenses inside files.

The order in which `license-checker` tool looks for the licenses is:

1. package.json
2. Try to identify the license with the spdx module to see if it has a valid SPDX license attached. 
If that fails, we then look into the module for the following files: LICENSE, COPYING & README.

> More details here: https://github.com/davglass/license-checker#how-licenses-are-found

## Contributing
Please read the [contributing guide](./CONTRIBUTING.md)
