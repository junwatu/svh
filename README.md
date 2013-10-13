SVH (Node Serve Here)
=====================

[![Build Status](https://travis-ci.org/junwatu/svh.png?branch=master)](https://travis-ci.org/junwatu/svh)

Simple file server for web client app development.
It will serve html, js, css, image (any files actually except for dotfiles).


Features
-------

- Configurable via cli options.
- Auto watch files.
- Auto reload browser (from v0.0.3).
- Ngrok support (from v0.0.6).


###Note

> Tested only on UNIX/Linux based OS.


Usage
-----

Install svh via the awesome npm

```
$ sudo npm install -g svh
```

help

```
$ svh serve --help

Usage: serve [options] [path]

  Options:

    -h, --help                    output usage information
    -l, --log <log>               default is no
    -p, --port <port>             startServer port. default port is 3113
    -m, --main <homepage>         main page to render. fill without file extension. support html only
    -w, --watch <isWatching>      watch project root directory for file changes. default yes
    -n, --ngrok <ngrok>           using ngrok to expose local web server to internet. default no
    -N, --ngrok-path <ngrokpath>  ngrok binary path. default to /usr/bin/ngrok
    -s, --subdomain <subdomain>   subdomain for ngrok
    -a, --auth <auth>             simple auth for ngrok

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

svh will watch project directory and auto reload browser it if there are any files changes.
To disable auto watch use `-w` option

```
$ svh serve -w false your_project_dir
```
###Use with ngrok

svh `v0.0.6` will support [ngrok][1] it's awesome tool by the way, but make sure that it already installed in your system. The default path svh will recognize it is

```
/usr/bin/ngrok
```
other than that, you should pass ngrok path via `-N` option.

To use ngrok use command option `-n` and svh will create random subdomain for your project.

For example to expose `your_project_dir` to public internet just type this command

```
$ svh serve -n yes your_project_dir

```

To expose your local project to public internet but with basic authentication just type this command

```
$ svh serve -n yes -a user:password project_dir
```
You can pass custom subdomain name to via `-s` option. For example if you type this command

```
$ svh serve -n yes -a shoot:angel -s cross-finger your_project_dir
```
then you can access your local project on address

```
http://cross-finger.ngrok.com
```

If ngrok installed on custom path use `-N` option so svh will recognize it.

```
$ svh serve -n yes -N /home/angel/bin/ngrok -a shoot:angel project_dir
```

> svh currently doesn't support for ngrok configuration file

Contribute
----------

Please feel free to fork it and pull any request


----------


Thank's


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


  [1]: https://ngrok.com/