# license-reporter

[![Coverage Status](https://coveralls.io/repos/github/bucharest-gold/license-reporter/badge.svg?branch=master)](https://coveralls.io/github/bucharest-gold/license-reporter?branch=master)
[![Build Status](https://travis-ci.org/bucharest-gold/license-reporter.svg?branch=master)](https://travis-ci.org/bucharest-gold/license-reporter)

License-reporter is a tool that is intended to be used by Red Hat projects/products that require project dependency
licenses to be retrieved and reported in xml and html format. Additions have been made to output in JSON and YAML format but the XML output is the most mature. We would welcome additional PRs in this area.

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
  --all                   will list all production licenses for all modules
                                                                [default: false]
  --ignore-version-range  will list all licenses from declared package.json
                          dependencies ignoring version range   [default: false]
  --silent                hides the console output              [default: false]
  --xml                   xml file to store the license information in  [string]
  --json                  json file to store the license information in [string]
  --yaml                  yaml file to store the license information in [string]
  --html                  outputs the license in html format to license.html
                                                                [default: false]
  --css                   css file to apply style on html report
             [default: "license-reporter/lib/resources/licenses.css"]
  --unified-list          will use the default unified list containing licenses
                          approved or not                              [default:
          "license-reporter/lib/resources/default-unified-list.json"]
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
  --metadata              includes metadata for the current project
                                                                [default: false]
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
    <version>1.0.0</version>
    <dependencies>
        <dependency>
            <packageName>node-builtins</packageName>
            <version>0.1.1</version>
            <licenses>
                <license>
                    <name>Apache License 2.0</name>
                    <url>http://www.apache.org/licenses/LICENSE-2.0</url>
                </license>
            </licenses>
        </dependency>
        <dependency>
            <packageName>roi</packageName>
            <version>0.15.0</version>
            <licenses>
                <license>
                    <name>Apache License 2.0</name>
                    <url>http://www.apache.org/licenses/LICENSE-2.0</url>
                </license>
            </licenses>
        </dependency>
    </dependencies>
</licenseSummary>
Dependencies found in package.json but not in xml: commander,decomment
Please run 'license-reporter --ignore-version-range' to show all declared dependencies on generated xml.
========= APPROVED LICENSES        ==========
name: node-builtins , version: 0.1.1 , licenses: Apache License 2.0
name: roi , version: 0.15.0 , licenses: Apache License 2.0
========= APPROVED LICENSES        ==========
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
                    <name>MIT License</name>
                    <url>http://www.opensource.org/licenses/MIT</url>
                </license>
            </licenses>
        </dependency>
        <dependency>
            <packageName>fidelity</packageName>
            <version>4.2.0</version>
            <licenses>
                <license>
                    <name>MIT License</name>
                    <url>http://www.opensource.org/licenses/MIT</url>
                </license>
            </licenses>
        </dependency>
        <dependency>
            <packageName>huilu</packageName>
            <version>0.1.3</version>
            <licenses>
                <license>
                    <name>Apache License 2.0</name>
                    <url>http://www.apache.org/licenses/LICENSE-2.0</url>
                </license>
            </licenses>
        </dependency>
    </dependencies>
</licenseSummary>
Dependencies found in package.json but not in xml: @risingstack/v8-profiler
Please run 'license-reporter --ignore-version-range' to show all declared dependencies on generated xml.
========= APPROVED LICENSES        ==========
name: huilu , version: 0.1.3 , licenses: Apache License 2.0
name: cli-table2 , version: 0.2.0 , licenses: MIT License
name: fidelity , version: 4.2.0 , licenses: MIT License
========= APPROVED LICENSES        ==========
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
        <licenseSummary>
            <project>szero</project>
            <version>1.0.0</version>
            <dependencies>
                <dependency>
                    <packageName>node-builtins</packageName>
                    <version>0.1.1</version>
                    <licenses>
                        <license>
                            <name>Apache License 2.0</name>
                            <url>http://www.apache.org/licenses/LICENSE-2.0</url>
                        </license>
                    </licenses>
                </dependency>
                <dependency>
                    <packageName>roi</packageName>
                    <version>0.15.0</version>
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
    <project>
        <licenseSummary>
            <project>genet</project>
            <version>0.0.7</version>
            <dependencies>
                <dependency>
                    <packageName>cli-table2</packageName>
                    <version>0.2.0</version>
                    <licenses>
                        <license>
                            <name>MIT License</name>
                            <url>http://www.opensource.org/licenses/MIT</url>
                        </license>
                    </licenses>
                </dependency>
                <dependency>
                    <packageName>fidelity</packageName>
                    <version>4.2.0</version>
                    <licenses>
                        <license>
                            <name>MIT License</name>
                            <url>http://www.opensource.org/licenses/MIT</url>
                        </license>
                    </licenses>
                </dependency>
                <dependency>
                    <packageName>huilu</packageName>
                    <version>0.1.3</version>
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

## License-reporter --all

Also possible to generate a xml with licenses from all sub-modules:

> Note: szero is a small project but the generated xml has 664K size.

```
cd szero
$ license-reporter --all --file=all.xml
$ du -s -h all.xml
188K    all.xml
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

The project allows you specifcy metadata about licenses and a file can be found in: `license-reporter/lib/resources/default-unified-list.json`.

This list serves a number of roles as the metadata can be used to control what is outputted. Three areas of interest are controlled by:

- It provides the capability or white listing licenses via an `approved` toggle. This allows you fine grain what licenses are acceptable to be used or not
- Long (`fedora_name`) and short (`fedora_abbrev`) abbreviations are possible allowing you customise the naming convention as you see fit
- A `URL` reference to point towards the license text associated with the given license

The JSON file is extensible and several additional metadata for use in Red Hat specific use cases are included. Additionally, you can use a custom license list. For this, we recommend that the default file be used and modified (only the values) for your need. We are using a verifier to validate the unified-list JSON schema. If any errors are found, (at the moment) you will see error messages like these:

```
Item: 2 - instance.id is not of a type (s) string
Item: 3 - instance.id is not of a type (s) string
Item: 3 - instance.approved is not of a type (s) string
```

So to use, just add the `--unified-list` parameter with the value of the file path.

```
$ license-reporter --unified-list=/full_path_here/my-unified-list.json
```

## WARNING about unknown licenses

Sometimes some warning messages may appear on the output. This happens when the license-report can not find an appropriate license for a particular dependency. This will include instances where the license information is stored in the README.

```
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
license-reporter --xml licenses.xml --json licenses.json --yaml licenses.yaml --silent
```

In the case of `html` a report will be generated, and you can specify a `css` file to apply the style.

```
license-reporter --html --css /path_to_my_css/foo.css --silent
```

## Contributing
Please read the [contributing guide](./CONTRIBUTING.md)
