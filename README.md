# license-reporter

[![Greenkeeper badge](https://badges.greenkeeper.io/bucharest-gold/license-reporter.svg)](https://greenkeeper.io/)
[![Build Status](https://travis-ci.org/bucharest-gold/license-reporter.svg?branch=master)](https://travis-ci.org/bucharest-gold/license-reporter)
[![Coverage Status](https://coveralls.io/repos/github/bucharest-gold/license-reporter/badge.svg?branch=master&foo=bar)](https://coveralls.io/github/bucharest-gold/license-reporter?branch=master)

## Installation

```console
$ npm install license-reporter -g
```

## Usage

```console
$ license-reporter --help
Commands:
  console  Shows license information on standard output.
  merge    Merge license XML files.
  report   Creates a HTML report.
  save     Saves license information to a file.

Options:
  --version  Show version number                                       [boolean]
  --help     Show help                                                 [boolean]
  --cwd      Change the current working directory
```

```console
$ license-reporter console --help

Options:
  --version                       Show version number                  [boolean]
  --help                          Show help                            [boolean]
  --cwd                           Change the current working directory
  --name-map, --nm                 Pass the name map file.              
  --unified-list, --ul             Pass the unified (approved/not-approved)
                                  license list.                        
  --include-license-content, --ilc  Includes the license content in the xml.
                                                                [default: false]
```

```console
$ license-reporter merge --help

Options:
  --version                    Show version number                     [boolean]
  --help                       Show help                               [boolean]
  --cwd                        Change the current working directory
  --merge-project-name, --mpn  The name the project which the license.xml are
                               part of.                               [required]
  --merge-license-xmls, --mlx  A comma separated list of license.xml files to
                               merge.                                 [required]
  --merge-output, --mo         File to write the merged license info to.
                                                                      [required]
```

```console
$ license-reporter report --help

Options:
  --version             Show version number                            [boolean]
  --help                Show help                                      [boolean]
  --cwd                 Change the current working directory
  --name-map, --nm      Pass the name map file.                        
  --unified-list, --ul  Pass the unified (approved/not-approved) license list.
  --css                 CSS file to apply style on html report.        
```

```console
$ license-reporter save --help

Options:
  --version             Show version number                            [boolean]
  --help                Show help                                      [boolean]
  --cwd                 Change the current working directory
  --name-map, --nm      Pass the name map file.                        
  --unified-list, --ul  Pass the unified (approved/not-approved) license list.
  --xml                 Saves as XML.                                   [string]
  --json                Saves as JSON.                                  [string]
  --yaml                Saves as YAML.                                  [string]
```

## Example output

> Example using this project: https://github.com/feedhenry-raincatcher/raincatcher-portal

```console
$ git clone https://github.com/feedhenry-raincatcher/raincatcher-portal.git
$ cd raincatcher-portal ; npm install
$ license-reporter save --xml license1.xml
```

```xml
<?xml version='1.0'?>
<licenseSummary>
    <project>@raincatcher/demo-portal</project>
    <version>1.0.0</version>
    <dependencies>
        <dependency>
            <packageName>@raincatcher-examples/angularjs-extensions</packageName>
            <version>1.0.0</version>
            <licenses>
                <license>
                    <name>MIT License</name>
                    <url>http://www.opensource.org/licenses/MIT</url>
                </license>
            </licenses>
        </dependency>
        <dependency>
            <packageName>@raincatcher-examples/step-accident</packageName>
            <version>1.0.0</version>
            <licenses>
                <license>
                    <name>MIT License</name>
                    <url>http://www.opensource.org/licenses/MIT</url>
                </license>
            </licenses>
        </dependency>
        <dependency>
            <packageName>@raincatcher-examples/step-vehicle-inspection</packageName>
            <version>1.0.0</version>
            <licenses>
                <license>
                    <name>MIT License</name>
                    <url>http://www.opensource.org/licenses/MIT</url>
                </license>
            </licenses>
        </dependency>
        <dependency>
            <packageName>@raincatcher/angularjs-auth-keycloak</packageName>
            <version>1.0.0</version>
            <licenses>
                <license>
                    <name>MIT License</name>
                    <url>http://www.opensource.org/licenses/MIT</url>
                </license>
            </licenses>
        </dependency>
        <dependency>
            <packageName>@raincatcher/angularjs-auth-passport</packageName>
            <version>1.0.0</version>
            <licenses>
                <license>
                    <name>MIT License</name>
                    <url>http://www.opensource.org/licenses/MIT</url>
                </license>
            </licenses>
        </dependency>
        <dependency>
            <packageName>@raincatcher/angularjs-http</packageName>
            <version>1.0.0</version>
            <licenses>
                <license>
                    <name>MIT License</name>
                    <url>http://www.opensource.org/licenses/MIT</url>
                </license>
            </licenses>
        </dependency>
        <dependency>
            <packageName>@raincatcher/angularjs-workflow</packageName>
            <version>1.0.0</version>
            <licenses>
                <license>
                    <name>MIT License</name>
                    <url>http://www.opensource.org/licenses/MIT</url>
                </license>
            </licenses>
        </dependency>
        <dependency>
            <packageName>@raincatcher/angularjs-workorder</packageName>
            <version>1.0.0</version>
            <licenses>
                <license>
                    <name>MIT License</name>
                    <url>http://www.opensource.org/licenses/MIT</url>
                </license>
            </licenses>
        </dependency>
        <dependency>
            <packageName>@raincatcher/logger</packageName>
            <version>1.0.0</version>
            <licenses>
                <license>
                    <name>MIT License</name>
                    <url>http://www.opensource.org/licenses/MIT</url>
                </license>
            </licenses>
        </dependency>
        <dependency>
            <packageName>@raincatcher/step-signature</packageName>
            <version>1.0.0</version>
            <licenses>
                <license>
                    <name>MIT License</name>
                    <url>http://www.opensource.org/licenses/MIT</url>
                </license>
            </licenses>
        </dependency>
        <dependency>
            <packageName>@raincatcher/wfm</packageName>
            <version>1.0.0</version>
            <licenses>
                <license>
                    <name>MIT License</name>
                    <url>http://www.opensource.org/licenses/MIT</url>
                </license>
            </licenses>
        </dependency>
        <dependency>
            <packageName>angular</packageName>
            <version>1.6.1</version>
            <licenses>
                <license>
                    <name>MIT License</name>
                    <url>http://www.opensource.org/licenses/MIT</url>
                </license>
            </licenses>
        </dependency>
        <dependency>
            <packageName>angular-animate</packageName>
            <version>1.5.3</version>
            <licenses>
                <license>
                    <name>MIT License</name>
                    <url>http://www.opensource.org/licenses/MIT</url>
                </license>
            </licenses>
        </dependency>
        <dependency>
            <packageName>angular-aria</packageName>
            <version>1.5.3</version>
            <licenses>
                <license>
                    <name>MIT License</name>
                    <url>http://www.opensource.org/licenses/MIT</url>
                </license>
            </licenses>
        </dependency>
        <dependency>
            <packageName>angular-material</packageName>
            <version>1.0.7</version>
            <licenses>
                <license>
                    <name>MIT License</name>
                    <url>http://www.opensource.org/licenses/MIT</url>
                </license>
            </licenses>
        </dependency>
        <dependency>
            <packageName>angular-ui-router</packageName>
            <version>0.4.2</version>
            <licenses>
                <license>
                    <name>MIT License</name>
                    <url>http://www.opensource.org/licenses/MIT</url>
                </license>
            </licenses>
        </dependency>
        <dependency>
            <packageName>async</packageName>
            <version>1.5.2</version>
            <licenses>
                <license>
                    <name>MIT License</name>
                    <url>http://www.opensource.org/licenses/MIT</url>
                </license>
            </licenses>
        </dependency>
        <dependency>
            <packageName>c3</packageName>
            <version>0.4.11</version>
            <licenses>
                <license>
                    <name>MIT License</name>
                    <url>http://www.opensource.org/licenses/MIT</url>
                </license>
            </licenses>
        </dependency>
        <dependency>
            <packageName>cors</packageName>
            <version>2.8.3</version>
            <licenses>
                <license>
                    <name>MIT License</name>
                    <url>http://www.opensource.org/licenses/MIT</url>
                </license>
            </licenses>
        </dependency>
        <dependency>
            <packageName>d3</packageName>
            <version>3.5.16</version>
            <licenses>
                <license>
                    <name>BSD 3-clause "New" or "Revised" License</name>
                    <url>http://www.opensource.org/licenses/BSD-3-Clause</url>
                </license>
            </licenses>
        </dependency>
        <dependency>
            <packageName>debug</packageName>
            <version>2.6.3</version>
            <licenses>
                <license>
                    <name>MIT License</name>
                    <url>http://www.opensource.org/licenses/MIT</url>
                </license>
            </licenses>
        </dependency>
        <dependency>
            <packageName>express</packageName>
            <version>4.15.3</version>
            <licenses>
                <license>
                    <name>MIT License</name>
                    <url>http://www.opensource.org/licenses/MIT</url>
                </license>
            </licenses>
        </dependency>
        <dependency>
            <packageName>fh-js-sdk</packageName>
            <version>2.18.6</version>
            <licenses>
                <license>
                    <name>UNKNOWN</name>
                    <url>UNKNOWN</url>
                </license>
            </licenses>
        </dependency>
        <dependency>
            <packageName>grunt-cli</packageName>
            <version>1.2.0</version>
            <licenses>
                <license>
                    <name>MIT License</name>
                    <url>http://www.opensource.org/licenses/MIT</url>
                </license>
            </licenses>
        </dependency>
        <dependency>
            <packageName>lodash</packageName>
            <version>4.7.0</version>
            <licenses>
                <license>
                    <name>MIT License</name>
                    <url>http://www.opensource.org/licenses/MIT</url>
                </license>
            </licenses>
        </dependency>
        <dependency>
            <packageName>ng-sortable</packageName>
            <version>1.3.4</version>
            <licenses>
                <license>
                    <name>MIT License</name>
                    <url>http://www.opensource.org/licenses/MIT</url>
                </license>
            </licenses>
        </dependency>
        <dependency>
            <packageName>q</packageName>
            <version>1.4.1</version>
            <licenses>
                <license>
                    <name>MIT License</name>
                    <url>http://www.opensource.org/licenses/MIT</url>
                </license>
            </licenses>
        </dependency>
        <dependency>
            <packageName>rx</packageName>
            <version>4.1.0</version>
            <licenses>
                <license>
                    <name>Apache License 2.0</name>
                    <url>http://www.apache.org/licenses/LICENSE-2.0</url>
                </license>
            </licenses>
        </dependency>
        <dependency>
            <packageName>underscore</packageName>
            <version>1.8.3</version>
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

> Example using this project: https://github.com/feedhenry-raincatcher/raincatcher-server

```console
$ git clone https://github.com/feedhenry-raincatcher/raincatcher-server.git
$ cd raincatcher-server ; npm install
$ license-reporter save --xml license2.xml
```

```xml
<?xml version='1.0'?>
<licenseSummary>
    <project>@raincatcher/demo-server</project>
    <version>1.0.0</version>
    <dependencies>
        <dependency>
            <packageName>@raincatcher/auth-passport</packageName>
            <version>1.0.0</version>
            <licenses>
                <license>
                    <name>MIT License</name>
                    <url>http://www.opensource.org/licenses/MIT</url>
                </license>
            </licenses>
        </dependency>
        <dependency>
            <packageName>@raincatcher/datasync-cloud</packageName>
            <version>1.0.0</version>
            <licenses>
                <license>
                    <name>MIT License</name>
                    <url>http://www.opensource.org/licenses/MIT</url>
                </license>
            </licenses>
        </dependency>
        <dependency>
            <packageName>@raincatcher/express-auth</packageName>
            <version>1.0.0</version>
            <licenses>
                <license>
                    <name>MIT License</name>
                    <url>http://www.opensource.org/licenses/MIT</url>
                </license>
            </licenses>
        </dependency>
        <dependency>
            <packageName>@raincatcher/logger</packageName>
            <version>1.0.0</version>
            <licenses>
                <license>
                    <name>MIT License</name>
                    <url>http://www.opensource.org/licenses/MIT</url>
                </license>
            </licenses>
        </dependency>
        <dependency>
            <packageName>@raincatcher/wfm-demo-data</packageName>
            <version>1.0.0</version>
            <licenses>
                <license>
                    <name>MIT License</name>
                    <url>http://www.opensource.org/licenses/MIT</url>
                </license>
            </licenses>
        </dependency>
        <dependency>
            <packageName>@raincatcher/wfm-rest-api</packageName>
            <version>1.0.0</version>
            <licenses>
                <license>
                    <name>MIT License</name>
                    <url>http://www.opensource.org/licenses/MIT</url>
                </license>
            </licenses>
        </dependency>
        <dependency>
            <packageName>@raincatcher/wfm-user</packageName>
            <version>1.0.0</version>
            <licenses>
                <license>
                    <name>MIT License</name>
                    <url>http://www.opensource.org/licenses/MIT</url>
                </license>
            </licenses>
        </dependency>
        <dependency>
            <packageName>connect-redis</packageName>
            <version>3.0.0</version>
            <licenses>
                <license>
                    <name>MIT License</name>
                    <url>http://www.opensource.org/licenses/MIT</url>
                </license>
            </licenses>
        </dependency>
        <dependency>
            <packageName>cookie-parser</packageName>
            <version>1.4.3</version>
            <licenses>
                <license>
                    <name>MIT License</name>
                    <url>http://www.opensource.org/licenses/MIT</url>
                </license>
            </licenses>
        </dependency>
        <dependency>
            <packageName>cors</packageName>
            <version>2.8.4</version>
            <licenses>
                <license>
                    <name>MIT License</name>
                    <url>http://www.opensource.org/licenses/MIT</url>
                </license>
            </licenses>
        </dependency>
        <dependency>
            <packageName>express-handlebars</packageName>
            <version>3.0.0</version>
            <licenses>
                <license>
                    <name>BSD 3-clause "New" or "Revised" License</name>
                    <url>http://www.opensource.org/licenses/BSD-3-Clause</url>
                </license>
            </licenses>
        </dependency>
        <dependency>
            <packageName>jsonwebtoken</packageName>
            <version>7.4.3</version>
            <licenses>
                <license>
                    <name>MIT License</name>
                    <url>http://www.opensource.org/licenses/MIT</url>
                </license>
            </licenses>
        </dependency>
        <dependency>
            <packageName>keycloak-connect</packageName>
            <version>3.2.1</version>
            <licenses>
                <license>
                    <name>Apache License 2.0</name>
                    <url>http://www.apache.org/licenses/LICENSE-2.0</url>
                </license>
            </licenses>
        </dependency>
        <dependency>
            <packageName>lodash</packageName>
            <version>4.17.4</version>
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

### Asterisk (*) in license name
In the console output you may come across a license name which contains an asterisk, for example:

```console
========= WARNING WHITE-LISTED LICENSES ==========
name: express-bunyan-logger , version: 1.3.1 , licenses: BSD*
name: fh-cluster , version: 0.3.0 , licenses: Apache-2.0
```

Notice the `BSD*` which means the license name was deduced from an other file than package.json

## XML merging example

The intention for this functionality is to be able to create an xml file that contains all the licenses for a project that is made up of two or more projects.

So we are going to merge both `license1.xml` and `license2.xml` files created by the previous examples.

Inside the example raincatcher-server root directory run:

```console
$ license-reporter merge --merge-project-name="UberProject" --merge-license-xmls="./licenses/license1.xml, ../raincatcher-server/licenses/license2.xml" --merge-output="merged.xml"
$ cat licenses/merged.xml
```

or

```console
$ license-reporter merge --mpn UberProject --mlx="./licenses/license1.xml, ../raincatcher-server/licenses/license2.xml" --mo merged.xml
$ cat licenses/merged.xml
```

```xml
<?xml version='1.0'?>
<UberProject>
    <project>
        <licenseSummary>
            <project>@raincatcher/demo-portal</project>
            <version>1.0.0</version>
            <dependencies>
                <dependency>
                    <packageName>@raincatcher-examples/angularjs-extensions</packageName>
                    <version>1.0.0</version>
                    <licenses>
                        <license>
                            <name>MIT License</name>
                            <url>http://www.opensource.org/licenses/MIT</url>
                        </license>
                    </licenses>
                </dependency>
                <dependency>
                    <packageName>@raincatcher-examples/step-accident</packageName>
                    <version>1.0.0</version>
                    <licenses>
                        <license>
                            <name>MIT License</name>
                            <url>http://www.opensource.org/licenses/MIT</url>
                        </license>
                    </licenses>
                </dependency>
                <dependency>
                    <packageName>@raincatcher-examples/step-vehicle-inspection</packageName>
                    <version>1.0.0</version>
                    <licenses>
                        <license>
                            <name>MIT License</name>
                            <url>http://www.opensource.org/licenses/MIT</url>
                        </license>
                    </licenses>
                </dependency>
                <dependency>
                    <packageName>@raincatcher/angularjs-auth-keycloak</packageName>
                    <version>1.0.0</version>
                    <licenses>
                        <license>
                            <name>MIT License</name>
                            <url>http://www.opensource.org/licenses/MIT</url>
                        </license>
                    </licenses>
                </dependency>
                <dependency>
                    <packageName>@raincatcher/angularjs-auth-passport</packageName>
                    <version>1.0.0</version>
                    <licenses>
                        <license>
                            <name>MIT License</name>
                            <url>http://www.opensource.org/licenses/MIT</url>
                        </license>
                    </licenses>
                </dependency>
                <dependency>
                    <packageName>@raincatcher/angularjs-http</packageName>
                    <version>1.0.0</version>
                    <licenses>
                        <license>
                            <name>MIT License</name>
                            <url>http://www.opensource.org/licenses/MIT</url>
                        </license>
                    </licenses>
                </dependency>
                <dependency>
                    <packageName>@raincatcher/angularjs-workflow</packageName>
                    <version>1.0.0</version>
                    <licenses>
                        <license>
                            <name>MIT License</name>
                            <url>http://www.opensource.org/licenses/MIT</url>
                        </license>
                    </licenses>
                </dependency>
                <dependency>
                    <packageName>@raincatcher/angularjs-workorder</packageName>
                    <version>1.0.0</version>
                    <licenses>
                        <license>
                            <name>MIT License</name>
                            <url>http://www.opensource.org/licenses/MIT</url>
                        </license>
                    </licenses>
                </dependency>
                <dependency>
                    <packageName>@raincatcher/logger</packageName>
                    <version>1.0.0</version>
                    <licenses>
                        <license>
                            <name>MIT License</name>
                            <url>http://www.opensource.org/licenses/MIT</url>
                        </license>
                    </licenses>
                </dependency>
                <dependency>
                    <packageName>@raincatcher/step-signature</packageName>
                    <version>1.0.0</version>
                    <licenses>
                        <license>
                            <name>MIT License</name>
                            <url>http://www.opensource.org/licenses/MIT</url>
                        </license>
                    </licenses>
                </dependency>
                <dependency>
                    <packageName>@raincatcher/wfm</packageName>
                    <version>1.0.0</version>
                    <licenses>
                        <license>
                            <name>MIT License</name>
                            <url>http://www.opensource.org/licenses/MIT</url>
                        </license>
                    </licenses>
                </dependency>
                <dependency>
                    <packageName>angular</packageName>
                    <version>1.6.1</version>
                    <licenses>
                        <license>
                            <name>MIT License</name>
                            <url>http://www.opensource.org/licenses/MIT</url>
                        </license>
                    </licenses>
                </dependency>
                <dependency>
                    <packageName>angular-animate</packageName>
                    <version>1.5.3</version>
                    <licenses>
                        <license>
                            <name>MIT License</name>
                            <url>http://www.opensource.org/licenses/MIT</url>
                        </license>
                    </licenses>
                </dependency>
                <dependency>
                    <packageName>angular-aria</packageName>
                    <version>1.5.3</version>
                    <licenses>
                        <license>
                            <name>MIT License</name>
                            <url>http://www.opensource.org/licenses/MIT</url>
                        </license>
                    </licenses>
                </dependency>
                <dependency>
                    <packageName>angular-material</packageName>
                    <version>1.0.7</version>
                    <licenses>
                        <license>
                            <name>MIT License</name>
                            <url>http://www.opensource.org/licenses/MIT</url>
                        </license>
                    </licenses>
                </dependency>
                <dependency>
                    <packageName>angular-ui-router</packageName>
                    <version>0.4.2</version>
                    <licenses>
                        <license>
                            <name>MIT License</name>
                            <url>http://www.opensource.org/licenses/MIT</url>
                        </license>
                    </licenses>
                </dependency>
                <dependency>
                    <packageName>async</packageName>
                    <version>1.5.2</version>
                    <licenses>
                        <license>
                            <name>MIT License</name>
                            <url>http://www.opensource.org/licenses/MIT</url>
                        </license>
                    </licenses>
                </dependency>
                <dependency>
                    <packageName>c3</packageName>
                    <version>0.4.11</version>
                    <licenses>
                        <license>
                            <name>MIT License</name>
                            <url>http://www.opensource.org/licenses/MIT</url>
                        </license>
                    </licenses>
                </dependency>
                <dependency>
                    <packageName>cors</packageName>
                    <version>2.8.3</version>
                    <licenses>
                        <license>
                            <name>MIT License</name>
                            <url>http://www.opensource.org/licenses/MIT</url>
                        </license>
                    </licenses>
                </dependency>
                <dependency>
                    <packageName>d3</packageName>
                    <version>3.5.16</version>
                    <licenses>
                        <license>
                            <name>BSD 3-clause "New" or "Revised" License</name>
                            <url>http://www.opensource.org/licenses/BSD-3-Clause</url>
                        </license>
                    </licenses>
                </dependency>
                <dependency>
                    <packageName>debug</packageName>
                    <version>2.6.3</version>
                    <licenses>
                        <license>
                            <name>MIT License</name>
                            <url>http://www.opensource.org/licenses/MIT</url>
                        </license>
                    </licenses>
                </dependency>
                <dependency>
                    <packageName>express</packageName>
                    <version>4.15.3</version>
                    <licenses>
                        <license>
                            <name>MIT License</name>
                            <url>http://www.opensource.org/licenses/MIT</url>
                        </license>
                    </licenses>
                </dependency>
                <dependency>
                    <packageName>fh-js-sdk</packageName>
                    <version>2.18.6</version>
                    <licenses>
                        <license>
                            <name>UNKNOWN</name>
                            <url>UNKNOWN</url>
                        </license>
                    </licenses>
                </dependency>
                <dependency>
                    <packageName>grunt-cli</packageName>
                    <version>1.2.0</version>
                    <licenses>
                        <license>
                            <name>MIT License</name>
                            <url>http://www.opensource.org/licenses/MIT</url>
                        </license>
                    </licenses>
                </dependency>
                <dependency>
                    <packageName>lodash</packageName>
                    <version>4.7.0</version>
                    <licenses>
                        <license>
                            <name>MIT License</name>
                            <url>http://www.opensource.org/licenses/MIT</url>
                        </license>
                    </licenses>
                </dependency>
                <dependency>
                    <packageName>ng-sortable</packageName>
                    <version>1.3.4</version>
                    <licenses>
                        <license>
                            <name>MIT License</name>
                            <url>http://www.opensource.org/licenses/MIT</url>
                        </license>
                    </licenses>
                </dependency>
                <dependency>
                    <packageName>q</packageName>
                    <version>1.4.1</version>
                    <licenses>
                        <license>
                            <name>MIT License</name>
                            <url>http://www.opensource.org/licenses/MIT</url>
                        </license>
                    </licenses>
                </dependency>
                <dependency>
                    <packageName>rx</packageName>
                    <version>4.1.0</version>
                    <licenses>
                        <license>
                            <name>Apache License 2.0</name>
                            <url>http://www.apache.org/licenses/LICENSE-2.0</url>
                        </license>
                    </licenses>
                </dependency>
                <dependency>
                    <packageName>underscore</packageName>
                    <version>1.8.3</version>
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
            <project>@raincatcher/demo-server</project>
            <version>1.0.0</version>
            <dependencies>
                <dependency>
                    <packageName>@raincatcher/auth-passport</packageName>
                    <version>1.0.0</version>
                    <licenses>
                        <license>
                            <name>MIT License</name>
                            <url>http://www.opensource.org/licenses/MIT</url>
                        </license>
                    </licenses>
                </dependency>
                <dependency>
                    <packageName>@raincatcher/datasync-cloud</packageName>
                    <version>1.0.0</version>
                    <licenses>
                        <license>
                            <name>MIT License</name>
                            <url>http://www.opensource.org/licenses/MIT</url>
                        </license>
                    </licenses>
                </dependency>
                <dependency>
                    <packageName>@raincatcher/express-auth</packageName>
                    <version>1.0.0</version>
                    <licenses>
                        <license>
                            <name>MIT License</name>
                            <url>http://www.opensource.org/licenses/MIT</url>
                        </license>
                    </licenses>
                </dependency>
                <dependency>
                    <packageName>@raincatcher/logger</packageName>
                    <version>1.0.0</version>
                    <licenses>
                        <license>
                            <name>MIT License</name>
                            <url>http://www.opensource.org/licenses/MIT</url>
                        </license>
                    </licenses>
                </dependency>
                <dependency>
                    <packageName>@raincatcher/wfm-demo-data</packageName>
                    <version>1.0.0</version>
                    <licenses>
                        <license>
                            <name>MIT License</name>
                            <url>http://www.opensource.org/licenses/MIT</url>
                        </license>
                    </licenses>
                </dependency>
                <dependency>
                    <packageName>@raincatcher/wfm-rest-api</packageName>
                    <version>1.0.0</version>
                    <licenses>
                        <license>
                            <name>MIT License</name>
                            <url>http://www.opensource.org/licenses/MIT</url>
                        </license>
                    </licenses>
                </dependency>
                <dependency>
                    <packageName>@raincatcher/wfm-user</packageName>
                    <version>1.0.0</version>
                    <licenses>
                        <license>
                            <name>MIT License</name>
                            <url>http://www.opensource.org/licenses/MIT</url>
                        </license>
                    </licenses>
                </dependency>
                <dependency>
                    <packageName>connect-redis</packageName>
                    <version>3.0.0</version>
                    <licenses>
                        <license>
                            <name>MIT License</name>
                            <url>http://www.opensource.org/licenses/MIT</url>
                        </license>
                    </licenses>
                </dependency>
                <dependency>
                    <packageName>cookie-parser</packageName>
                    <version>1.4.3</version>
                    <licenses>
                        <license>
                            <name>MIT License</name>
                            <url>http://www.opensource.org/licenses/MIT</url>
                        </license>
                    </licenses>
                </dependency>
                <dependency>
                    <packageName>cors</packageName>
                    <version>2.8.4</version>
                    <licenses>
                        <license>
                            <name>MIT License</name>
                            <url>http://www.opensource.org/licenses/MIT</url>
                        </license>
                    </licenses>
                </dependency>
                <dependency>
                    <packageName>express-handlebars</packageName>
                    <version>3.0.0</version>
                    <licenses>
                        <license>
                            <name>BSD 3-clause "New" or "Revised" License</name>
                            <url>http://www.opensource.org/licenses/BSD-3-Clause</url>
                        </license>
                    </licenses>
                </dependency>
                <dependency>
                    <packageName>jsonwebtoken</packageName>
                    <version>7.4.3</version>
                    <licenses>
                        <license>
                            <name>MIT License</name>
                            <url>http://www.opensource.org/licenses/MIT</url>
                        </license>
                    </licenses>
                </dependency>
                <dependency>
                    <packageName>keycloak-connect</packageName>
                    <version>3.2.1</version>
                    <licenses>
                        <license>
                            <name>Apache License 2.0</name>
                            <url>http://www.apache.org/licenses/LICENSE-2.0</url>
                        </license>
                    </licenses>
                </dependency>
                <dependency>
                    <packageName>lodash</packageName>
                    <version>4.17.4</version>
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

The project allows you specifcy metadata about licenses and a file can be found in: `license-reporter/lib/resources/default-unified-list.json`.

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
license-reporter --xml licenses.xml --json licenses.json --yaml licenses.yaml --silent
```

In the case of `html` a report will be generated, and you can specify a `css` file to apply the style.

```
license-reporter --html --css /path_to_my_css/foo.css --silent
```

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
