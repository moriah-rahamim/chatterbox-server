var headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/plain'
};

exports.sendResponse = function(response, data, statusCode) {
  statusCode = statusCode || 200; // default to 200
  response.writeHead(statusCode, headers);
  response.statusCode = statusCode;
  response.end(JSON.stringify(data));
};

exports.collectData = function(request, callback) {
  // web requests are asynchronous- not all data is available at once
  var data = '';
  request.on('data', function(chunk) {
    data += chunk;
  });

  // all data intended to receive is complete
  request.on('end', function() {
    callback(JSON.parse(data));
  });
};