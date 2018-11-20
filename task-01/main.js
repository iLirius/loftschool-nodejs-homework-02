#!/usr/bin/env node

const http = require('http');
var path = require('path');
const optimist = require('optimist');
var scriptName = path.basename(__filename);

const argv = optimist.usage(`Usage: ${scriptName} [options]`)
  .demand(['i', 't'])
  .options('i', {
    alias: 'interval'
  }).describe('i', 'интервал повторения сообщения в консоли [num ms]')
  .options('t', {
    alias: 'timeout'
  }).describe('t', 'время через которое отобразить сообщение веб клиенту [num ms]')
  .options('p', {
    alias: 'port'
  }).describe('p', 'http-server listen port')
  .default('p', 3000)
  .argv;

console.log('Starting');
const requestHandler = (request, response) => {
  if (request.url !== '/favicon.ico') {
    response.writeHead(404, {
      'Content-type': 'text/plain; charset=utf-8'
    });

    let intervallId = setInterval(() => {
      console.log(new Date().toString());
    }, argv.interval);

    setTimeout(() => {
      clearInterval(intervallId);
      response.write(new Date().toString());
      response.end();
    }, argv.timeout);

  } else {
    response.end();
  }
};

http.createServer(requestHandler).listen(argv.port, (err) => {
  if (err) {
    return console.log('something bad happened', err);
  }
  console.log(`Server is listening on ${argv.port}`);
});
