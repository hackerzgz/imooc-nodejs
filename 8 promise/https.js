'use stript'

var https = require('https');
var fs    = require('fs');

var options = (
	key: fs.readFileSync('ssh_key.gem'),
	cert:fs.readFileSync('ssh_cert.gem')
)

https
	.createServer(options, function(req, res) {
		res.writeHead(200);
		res.end('Hello HackerZ!');
	})
	.listen(8090)