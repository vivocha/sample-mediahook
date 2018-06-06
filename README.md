# Sample WebHook Application

The **Sample WebHook Application** is a simple example of how to setup a MediaHook handler for the agent status related to a Campaign.

### Installation
From NPM
```bash
$ npm install vivocha@sample-mediahook
```
From sources
```bash
$ git clone [git-repo-url] sample-mediahook
$ cd sample-mediahook
$ npm run build:all
```

### Usage:
```sh
./vvc-mediahook [-s <default-status>] [-p <port>] [-k <key file>] [-c <cert file>]
```

### More:
For a list of all available options run `vvc-mediahook -h`:
```sh
$ ./vvc-mediahook --help

  Usage: vvc-mediahook [options]

  Options:

    -V, --version               output the version number
    -s, --status <config-file>  Starting Agent Status (default: default.json)
    -p, --port [port]           Webhook port (default: 80, 443 if https is enabled)
    -k, --key <key>             HTTPS key file (if key and certificate are provided the server will listen in HTTPS mode)
    -c, --cert <cert>           HTTPS certificate file (if key and certificate are provided the server will listen in HTTPS mode)
    -h, --help                  output usage information
```
