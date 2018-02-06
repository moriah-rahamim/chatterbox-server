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

var messages = [];

var requestHandler = function(request, response) {
  console.log('Serving request type ' + request.method + ' for url ' + request.url);
  var headers = defaultCorsHeaders;
  var statusCode = 200;
  var responseData;

  // If the request throws an error,
  //  * log the error info to the console
  //  * set a 400 status
  //  * end execution
  if (request === undefined || typeof request.method !== 'string' || typeof request.url !== 'string') {
    console.error('bad request!');
    response.statusCode = 400;
    response.end();
  }

  // // If the response throws an error,
  // //  * log the error
  // response.on('error', (error) => {
  //   console.error(error);
  // });

  // NOTE TO SELF:
  // refactor to include support for GET and PUSH to/from rooms
  if (request.url === '/classes/messages') {
    if (request.method === 'GET') {
      var body = {
        results: messages
      };
      responseData = JSON.stringify(body);
      headers['Content-Type'] = 'application/json';
    }

    if (request.method === 'POST') {
      // Array to hold data chunks as they come in
      var message = [];

      // If the request has data, push the chunk into the message
      // Ongoing, until we have all the data
      request.on('data', (chunk) => {
        message.push(chunk.toString());
      });
      request.on('end', () => {
        // Re-combine the data and stringify it
        message = message.join('');
        // Parse the json string and add to messages
        responseData = JSON.parse(message);
        messages.push(responseData);
      });

      statusCode = 201;
    } 
  } else {
    statusCode = 404;
  }

  response.writeHead(statusCode, headers);
  
  response.end(responseData);
};

exports.requestHandler = requestHandler;
