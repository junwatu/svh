SVH (Node Serve Here)
=====================

Simple file server for web client app development.

Svh will serve html, js, css or image files. It work more less like static file server but
it has auto restart feature for file changes.


Usage
-----

Install svh via the awesome npm

```
$ npm install svh
```

help

```
$ svh serve --help

Usage: serve [options] [path]

  Options:

    -h, --help                output usage information
    -p,--port <port>          startServer port, default to 3113
    -m, --main <homepage>     main page to render (fill without file extension, support html only).
    -w, --watch <isWatching>  watch project root directory for file changes.

```

to run svh server on default port 3113

```
$ svh serve your_project_dir
```

or customize the port with `-p` option

```
$ svh serve -p 3003 your_project_dir
```

svh will pickup `index.html` file by default but you can customize it with `-m` option.
For example to pickup `main.html` as startup page, type this command

```
$ svh serve -m main  your_project_dir
```

svh will watch project directory and auto restart it if there are any files changes.
To disable auto watch use `-w` option

```
$ svh server -w false your_project_dir
```


That's it!


LICENSE
-------

The MIT License (MIT)

Copyright (c) 2013 Equan Pr.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
documentation files (the "Software"), to deal in the Software without restriction, including without limitation
the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and
to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of
the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO
THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS
OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT
OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.