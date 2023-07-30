var http = require('http');
var url = require("url");

http.createServer(function(request, response) {
  var pathname = url.parse(request.url).pathname;
  console.log(`url is ' ${url} path is ${pathname}`);
  var options = {
    port: 3000,
    host: 'test.ayush.com',
    method: request.method,
    path: pathname
    };

  if(request.url.includes('/api/')){
    options.port = 8080;
  }

  var proxy_request = http.request(options, res => {
    console.log(`statusCode: ${res.statusCode}`);

    res.on('data', d => {
      process.stdout.write(d);
      response.send(res.statusCode, res.headers);
    });
  });
  
  proxy_request.on('error', error => {
    console.error(error);
  });
  
  proxy_request.end();

}).listen(1000);