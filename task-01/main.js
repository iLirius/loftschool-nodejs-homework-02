#!/usr/bin/env node

const http = require('http');

const port = 3000;

console.log('Starting');

const requestHandler = (request, response) => {
  if (request.url !== '/favicon.ico') {
    response.writeHead(404, {
      'Content-type': 'text/plain; charset=utf-8'
    });

    let intrvalId = setInterval(() => {
      console.log(new Date());
    }, 1000);

    setTimeout(() => {
      clearInterval(intrvalId);
      response.write(new Date().toString());
      response.end();
    }, 10000);

  } else {
    response.end();
  }
};

http.createServer(requestHandler).listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err);
  }
  console.log(`Server is listening on ${port}`);
});
