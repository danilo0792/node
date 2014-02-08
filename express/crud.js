var express = require('express');
var app = express();

app.configure(function(){
  app.use(express.json()); 
  app.use(express.urlencoded());
  app.use(express.methodOverride());
});

var clientes = [];

app.get('/', function(request, response){
	html = '<html><body>';
	html += '<form action="/cliente" method="post">';
	html += '<label>Nome:<input type="text" name="cliente[nome]" /> </label><br />';
	html += '<label>Idade:<input type="text" name="cliente[idade]" /> </label><br />';
	html += '<button type="submit">Enviar</button>';
	html += '</form>';
	html += '<br />';
	html += '<h1>Lista de clientes</h1>';
	html += '<ul>';

	for (var i = 0; i < clientes.length; i++) {
		html += '<li>' + clientes[i].nome +' | '+clientes[i].idade + '</li>';
		html += '<a href="/cliente/'+ i + '/editar">Editar</a> | ';
		html += '<a href="/cliente/'+ i + '/">Excluir</a></li>';
	};
	
	html += '</ul></body></html>';
	response.send(html);
});

app.post('/cliente', function(request, response){
	var cliente = request.body.cliente;
	clientes.push(cliente);
	response.redirect('/');
});

app.get('/cliente/:id/editar', function(request, response){
	var id = request.params.id;
	var html = '<html><body>';
	html += '<h1>Editar dados do cliente:'+ clientes[id].nome + '</h1>';
	html += '<form action="/cliente/' + id +'" method="post">';
	html += '<input type="hidden" name="_method" value="put" />'; // Força o formulário realizar um comando PUT no submit.
	html += '<label>Nome: <input type="text" name="cliente[nome]" value="' + clientes[id].nome + '" /> </label>';
	html += '<label>Idade: <input type="text" name="cliente[idade]" value="' + clientes[id].idade + '" /> </label>';
	html += '<button type="submit">Enviar</button>';
	html += '</form>';
	html += '</html>';
	response.send(html);
});

app.put('/cliente/:id', function(request, response){
	var id = request.params.id;
	clientes[id] = request.body.cliente;
	response.redirect('/');
});

app.del('/cliente/:id', function(request, response){
	var id = request.params.id;
	clientes.splice(id, 1);
	response.redirect('/');
});

app.listen(3000);