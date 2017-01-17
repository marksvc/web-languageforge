var http = require('http');
var express = require('express');
var ShareDB = require('sharedb');
var richText = require('rich-text');
var WebSocket = require('ws');
var WebSocketJSONStream = require('websocket-json-stream');

ShareDB.types.register(richText.type);
var backend = new ShareDB();
var connection = backend.connect();

function WordFieldConcat(word, id){
  var a = word.concat('~',id);
  return a;
}

function GetIDfromWordFieldConcat(con){
  var a = con.split('~');
  return a[1];
}

startServer();

// Create initial document then fire callback
function createDoc(collection, id) {
  var doc = connection.get(collection, id);
  doc.fetch(function(err) {
    if (err) throw err;
    if (doc.type === null) {
      doc.create([{insert: ''}], 'rich-text');
    }
  });
}

function startServer() {
  // Create a web server to serve files and listen to WebSocket connections
  var app = express();
  app.use(express.static('static'));
  app.use(express.static('node_modules/quill/dist'));
  var server = http.createServer(app);

  // Connect any incoming WebSocket connection to ShareDB
  var wss = new WebSocket.Server({server: server});
  wss.on('connection', function(ws, req) {
    ws.on('message', function(msg) {
      // console.log(wss);
      var JSONMsg = JSON.parse(msg);
      if (typeof(JSONMsg.b) == "string") {
        createDoc(JSONMsg.c,JSONMsg.b);
        console.log("hello!" + JSONMsg.b);
        //ws.send(JSON.stringify({"status": "success", "id": JSONMsg.b, "collection": JSONMsg.c}));
        ws.send(JSON.stringify({"a": "bs", "b": JSONMsg.b, "c": JSONMsg.c, "d": "success"}));
      } else if (typeof(JSONMsg.b) == "object") {
        for (var i = 0; i<JSONMsg.b.length; i++) {      
          createDoc(JSONMsg.c,JSONMsg.b[i]);
          console.log("hello2");
          ws.send(JSON.stringify({"status": "success", "id": JSONMsg.b[i], "collection": JSONMsg.c, "d": "success"}));
        }
      } else {
        // console.log("not here");
      }
      //  else {
      //   throw "unknown type of id";
      // }
    // console.log("the message is",msg);
    });
    var stream = new WebSocketJSONStream(ws);
    backend.listen(stream);
  });

  server.listen(8080);
  console.log('Listening on http://localhost:8080');
}

function getJsonObjFromFile(sessionId){
  if(sessionId == null || sessionId == ""){
    return false;
  }
  var tmpDir = "/tmp";
  var filePath = tmpDir.concat("/jsonSessionData/", sessionId, ".json");
  try{
    var jsonObj = require(filePath);
  } catch (e) {
      return false;
  }
  return jsonObj;
}

//getJsonObjFromFile("t8vcdm2gb2235a88ps696liv35");
