#!/usr/bin/env node

import * as fs from 'fs';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as program from 'commander';

const packageJSON = require('../package.json');

const app = express()
let mode = 'http';
let http;

function requiredArgument(arg) {
  console.error('\n  ' + arg + ' argument is required');
  program.help();
  process.exit(1);
}

program
  .version(packageJSON.version)
  .option('-s, --status <config-file>', 'Starting Agent Status (default: default.json)')
  .option('-p, --port [port]', 'Webhook port (default: 80, 443 if https is enabled)')
  .option("-k, --key <key>", 'HTTPS key file (if key and certificate are provided the server will listen in HTTPS mode)')
  .option('-c, --cert <cert>', 'HTTPS certificate file (if key and certificate are provided the server will listen in HTTPS mode)')
  .parse(process.argv);

if (program.key && program.cert) {
  mode = 'https';
  http = require('https').createServer(
    {
      key: fs.readFileSync(program.key),
      cert: fs.readFileSync(program.cert)
    }, app)
} else {
  http = require('http').Server(app)
}

// application global parameters
const __localport = program.port || (mode === 'http' ? 80 : 443);

let status = require(program.config || '../default.json');

app.use(express.static('views'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.get('/agentStatus', function (req, res, next) {
  console.log('agentStatus request:')
  console.log(' - Host', req.headers['x-vvc-host']);
  console.log(' - Account', req.headers['x-vvc-acct']);
  console.log(' - HMAC', req.headers[' x-vvc-hmac']);
  console.log(' - query', req.query);
  // place your agents availability code here
  res.jsonp(status);
});
app.post('/agentStatus', function (req, res, next) {
  console.log('Updating body', req.body);
  if (req.body) {
    status = req.body;
  }
  res.jsonp(status);
});

http.listen(__localport, function () {
  console.log('listening on ' + mode + ' *:' + __localport);
});