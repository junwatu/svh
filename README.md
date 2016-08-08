# SVH (Node Serve Here)


[![Build Status](https://travis-ci.org/junwatu/svh.png?branch=master)](https://travis-ci.org/junwatu/svh)

Simple file server for web.

## Features

- Configurable via cli options.
- Auto watch files.
- Auto reload browser.
- Public site support through ngrok.
- Files filter.

## Usage

Install svh via the awesome npm

```
$ sudo npm install -g svh
```

help command

```
$ svh serve --help

Usage: serve [options] [path]

  Options:

    -h, --help                    output usage information
    -l, --log                     default is disabled
    -d, --domain <domain>         domain or hostname. default to localhost
    -p, --port <port>             startServer port. default port is 3113
    -m, --main <homepage>         index file to start. no extension (html only)
    -w, --watch                   watch project root directory for file changes. default is enabled
    -f, --files <files>           comma separated files extension to watch. default is all file types
    -n, --ngrok                   using ngrok to expose local web server to internet. default is disabled
    -N, --ngrok-path <ngrokpath>  ngrok binary path. default path is local install
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

svh will pickup `index.html` file by default but you can customize it with `-m` option, for example to pickup `main.html` as startup page type this command

```
$ svh serve -m main  your_project_dir
```

svh will watch project directory and auto reload browser if there are any files changes.
To disable auto watch use `-w` option

```
$ svh serve -w your_project_dir
```
### Filter

From version 0.1.0 you can use files filter through comma separated extension list by add `--files` command option

```
$ svh serve --files=html,css,js,jsx your_project_dir
```

by default svh will ignore `node_modules` directory.

### ngrok 2

svh can expose your project to public via [ngrok][1]. svh  will auto download ngrok binary and install it in `vendor` folder. 
 For example to expose `your_project_dir` to public internet just type this command

```
$ svh serve --ngrok your_project_dir

```

If you want to use ngrok 2 but other version than local installed, you should pass ngrok path via `-N` option

```
$ svh serve -n -N /home/angel/bin/ngrok project_dir
```

To expose your local project to public internet but with basic authentication just type this command

```
$ svh serve -n -a user:password project_dir
``` 
> Custom domain only for paid user

You can pass custom subdomain name via `-s` option. For example if you type this command

```
$ svh serve -n  -a shoot:angel -s cross-finger your_project_dir
```
then you can access your local project on address

```
http://cross-finger.ngrok.io
```

> Please note that only simple ngrok options that supported 

Currently only support `http` tunneling, `--auth` and `--subdomain`.


## Contribute

Please feel free to fork and pull any request.

Thank's


## LICENSE

The MIT License (MIT)

Copyright (c) 2016 Equan Pr.

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
