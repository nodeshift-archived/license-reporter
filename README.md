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
  --whitelist             file containing licenses that are white-listed
                                                                [default: false]
  --blacklist             file containing licenses that are black-listed
                                                                [default: false]
  --unifiedlist           will use the default unified list containing licenses
                          approved or not                       [default: false]
  --merge                 merge license.xml files               [default: false]
  --merge-product-name    the name the product which the license.xml are part of
                                                                [default: false]
  --merge-license-xmls    a comma separated list of license.xml files to merge
                                                                [default: false]
  --merge-output          file to write the merged license info to
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
<szero>
    <license>
        <name>node-builtins</name>
        <version>0.1.1</version>
        <license>Apache-2.0</license>
        <file>
        Copyright 2016 Red Hat, Inc.
        
        Licensed under the Apache License, Version 2.0 (the "License");
        you may not use this file except in compliance with the License.
        You may obtain a copy of the License at
        
        http://www.apache.org/licenses/LICENSE-2.0
        Unless required by applicable law or agreed to in writing, software
        distributed under the License is distributed on an "AS IS" BASIS,
        WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
        See the License for the specific language governing permissions and
        limitations under the License.
        </file>
    </license>
    <license>
        <name>roi</name>
        <version>0.15.0</version>
        <license>Apache-2.0</license>
        <file>/home/hf/d/szero/node_modules/roi/README.md</file>
    </license>
</szero>
```

> Example using this project: https://github.com/bucharest-gold/genet

```
$ https://github.com/bucharest-gold/genet.git
$ cd genet ; npm install
$ license-reporter --file=license2.xml
```

```xml
<?xml version='1.0'?>
<genet>
    <license>
        <name>cli-table2</name>
        <version>0.2.0</version>
        <license>MIT</license>
        <file>/home/hf/d/genet/node_modules/cli-table2/README.md</file>
    </license>
    <license>
        <name>fidelity</name>
        <version>4.2.0</version>
        <license>MIT</license>
        <file>Copyright (c) 2015, Lance Ball
        
        
        
        Permission is hereby granted, free of charge, to any person obtaining a copy
        of this software and associated documentation files (the "Software"), to deal
        in the Software without restriction, including without limitation the rights
        to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
        copies of the Software, and to permit persons to whom the Software is
        furnished to do so, subject to the following conditions:
        
        
        
        The above copyright notice and this permission notice shall be included in
        all copies or substantial portions of the Software.
        
        
        
        THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
        IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
        FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
        AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
        LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
        OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
        THE SOFTWARE.
        </file>
    </license>
    <license>
        <name>huilu</name>
        <version>0.1.3</version>
        <license>Apache-2.0</license>
        <file>Copyright 2016 Red Hat, Inc.
        
        Licensed under the Apache License, Version 2.0 (the "License");
        you may not use this file except in compliance with the License.
        You may obtain a copy of the License at
        
            http://www.apache.org/licenses/LICENSE-2.0
        
        Unless required by applicable law or agreed to in writing, software
        distributed under the License is distributed on an "AS IS" BASIS,
        WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
        See the License for the specific language governing permissions and
        limitations under the License.
        
        
        Portions of this software derive from tlorienz/flamegraph.
        The flamegraph license appears below.
        ==========================================================
        
        Copyright 2014 Thorsten Lorenz. 
        All rights reserved.
        
        Permission is hereby granted, free of charge, to any person
        obtaining a copy of this software and associated documentation
        files (the "Software"), to deal in the Software without
        restriction, including without limitation the rights to use,
        copy, modify, merge, publish, distribute, sublicense, and/or sell
        copies of the Software, and to permit persons to whom the
        Software is furnished to do so, subject to the following
        conditions:
        
        The above copyright notice and this permission notice shall be
        included in all copies or substantial portions of the Software.
        
        THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
        EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
        OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
        NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
        HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
        WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
        FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
        OTHER DEALINGS IN THE SOFTWARE.
        </file>
    </license>
</genet>
```

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
                <file>
                        Copyright 2016 Red Hat, Inc.
                        
                        Licensed under the Apache License, Version 2.0 (the "License");
                        you may not use this file except in compliance with the License.
                        You may obtain a copy of the License at
                        
                        http://www.apache.org/licenses/LICENSE-2.0
                        Unless required by applicable law or agreed to in writing, software
                        distributed under the License is distributed on an "AS IS" BASIS,
                        WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
                        See the License for the specific language governing permissions and
                        limitations under the License.
                        </file>
            </license>
            <license>
                <name>roi</name>
                <version>0.15.0</version>
                <license>Apache-2.0</license>
                <file>/home/hf/d/szero/node_modules/roi/README.md</file>
            </license>
        </szero>
    </project>
    <project>
        <genet>
            <license>
                <name>cli-table2</name>
                <version>0.2.0</version>
                <license>MIT</license>
                <file>/home/hf/d/genet/node_modules/cli-table2/README.md</file>
            </license>
            <license>
                <name>fidelity</name>
                <version>4.2.0</version>
                <license>MIT</license>
                <file>Copyright (c) 2015, Lance Ball
                        
                        
                        
                        Permission is hereby granted, free of charge, to any person obtaining a copy
                        of this software and associated documentation files (the "Software"), to deal
                        in the Software without restriction, including without limitation the rights
                        to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
                        copies of the Software, and to permit persons to whom the Software is
                        furnished to do so, subject to the following conditions:
                        
                        
                        
                        The above copyright notice and this permission notice shall be included in
                        all copies or substantial portions of the Software.
                        
                        
                        
                        THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
                        IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
                        FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
                        AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
                        LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
                        OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
                        THE SOFTWARE.
                        </file>
            </license>
            <license>
                <name>huilu</name>
                <version>0.1.3</version>
                <license>Apache-2.0</license>
                <file>Copyright 2016 Red Hat, Inc.
                        
                        Licensed under the Apache License, Version 2.0 (the "License");
                        you may not use this file except in compliance with the License.
                        You may obtain a copy of the License at
                        
                            http://www.apache.org/licenses/LICENSE-2.0
                        
                        Unless required by applicable law or agreed to in writing, software
                        distributed under the License is distributed on an "AS IS" BASIS,
                        WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
                        See the License for the specific language governing permissions and
                        limitations under the License.
                        
                        
                        Portions of this software derive from tlorienz/flamegraph.
                        The flamegraph license appears below.
                        ==========================================================
                        
                        Copyright 2014 Thorsten Lorenz. 
                        All rights reserved.
                        
                        Permission is hereby granted, free of charge, to any person
                        obtaining a copy of this software and associated documentation
                        files (the "Software"), to deal in the Software without
                        restriction, including without limitation the rights to use,
                        copy, modify, merge, publish, distribute, sublicense, and/or sell
                        copies of the Software, and to permit persons to whom the
                        Software is furnished to do so, subject to the following
                        conditions:
                        
                        The above copyright notice and this permission notice shall be
                        included in all copies or substantial portions of the Software.
                        
                        THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
                        EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
                        OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
                        NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
                        HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
                        WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
                        FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
                        OTHER DEALINGS IN THE SOFTWARE.
                        </file>
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

## Contributing
Please read the [contributing guide](./CONTRIBUTING.md)
