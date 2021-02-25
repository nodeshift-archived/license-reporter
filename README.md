# license-reporter

![Node.js CI](https://github.com/nodeshift/license-reporter/workflows/Node.js%20CI/badge.svg)
[![Coverage Status](https://coveralls.io/repos/github/nodeshift/license-reporter/badge.svg?branch=main&foo=bar)](https://coveralls.io/github/nodeshift/license-reporter?branch=main)

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

Extra information can be found [here](https://github.com/nodeshift/license-reporter/wiki)


## Contributing
Please read the [contributing guide](./CONTRIBUTING.md)
