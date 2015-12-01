var io = require('socket.io-client');
var os = require("os");
process.stdin.resume();
process.stdin.setEncoding('utf8');
client = io.connect('http://server:8080');
var data = '';

client.on('connect',function() {
    console.log('Connected as '+ os.hostname());
    client.emit('adduser',os.hostname());
}); 
client.on('disconnect',function() {
    console.log('Disconnected');
}); 
process.stdin.on('data', function (text) {
    data = text.replace(/\n|\r/g, "");
    console.log('('+new Date()+') CID: ', data);
    if (/^\d+\n$/.test(text)){
      client.emit('cid',data);
    } else {
      client.emit('cid',0);
    } 
    if (text === 'quit\n') {
      process.exit();
    }
  });
