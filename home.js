var http = require('http');

var server = http.createServer(function(require, response){
	response.write("Hello World");
	response.end();
});

server.listen(3000, function(){
	console.log("Executando server HTTP");
});
