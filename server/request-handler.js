/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/

var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};

var requestHandler = function(request, response) {
  var headers = defaultCorsHeaders;
  var statusCode = 200;

  if (request.url === '/classes/messages') {
    if (request.method === 'GET') {
      var body = {};
      body.results = [];
      var bodyString = JSON.stringify(body);
      headers['Content-Type'] = 'application/json';
    }


    if (request.method === 'POST') {
      statusCode = 201;
    }

    // if (request.method === 'PUT') {
    
    // }
  }

  console.log('Serving request type ' + request.method + ' for url ' + request.url);
  console.log('request', request.headers);

  response.writeHead(statusCode, headers);
  
  response.end(bodyString);
};

module.exports = requestHandler;
