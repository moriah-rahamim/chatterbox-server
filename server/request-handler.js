// var fs = require('fs');
var utils = require('./utils');
/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/

var objectId = 1;
var messages = [
  // {
  //   username: 'testname',
  //   text: 'testtext',
  //   objectId: 0
  // }
];

var actions = {
  'GET': function(request, response) {
    utils.sendResponse(response, {results: messages});
  },
  'POST': function(request, response) {
    utils.collectData(request, function(message) {
      message.timestamp = (new Date()).toString();
      message.objectId = ++objectId;
      messages.push(message);
      utils.sendResponse(response, message, 201);
    });
  },
  'OPTIONS': function(request, response) {
    console.log('hello world');
  }
};

var requestHandler = function(request, response) {

  console.log('Serving request type ' + request.method + 
    ' for url ' + request.url);

  var action = actions[request.method];
  if (action) {
    action(request, response);
  } else {
    utils.sendResponse(response, 'Not Found', 404);
  }

  // if (request === undefined || typeof request.method !== 'string' || typeof request.url !== 'string') {
  //   console.error('bad request!');
  //   response.statusCode = 400;
  //   response.end();
  // }
 
  // else {
  //   statusCode = 404;
  // }
};

exports.requestHandler = requestHandler;
