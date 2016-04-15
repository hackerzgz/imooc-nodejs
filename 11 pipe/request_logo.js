var http = require('http');
var fs = require('fs');
var request = require('../../node_modules/request');

http
	.createServer(function(req, res) {
		// fs.readFile('../9\ buffer/logo.png', function(err, data) {
		// 	if (err) {
		// 		res.end('file not exist');
		// 	}
		// 	else {
		// 		res.writeHead(200, {'Context-type': 'text/html'});
		// 		res.end(data);
		// 	}
		// })

		// fs.createReadStream('../9\ buffer/logo.png').pipe(res);
		request('http://static.mukewang.com/static/img/common/logo.png')
			.pipe(res);
	})
	.listen(8090);