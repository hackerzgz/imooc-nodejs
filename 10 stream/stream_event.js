var fs = require('fs');

var readStream = fs.createReadStream('stream_copy_logo.js');
var n = 0;

readStream
	.on('data', function(chunk) {
		n++;
		// data 事件 -> 当有数据流动
		console.log('data emits');
		console.log(Buffer.isBuffer(chunk));
		// console.log(chunk.toString('utf8'));

		readStream.pause();
		setTimeout(function() {
			console.log('data stram pause!');
			readStream.resume();
		}, 2000)
	})
	.on('readable', function() {
		// readable 事件 -> 这个文件是可读的
		console.log('data readable!');
	})
	.on('end', function() {
		// end 事件 -> 数据流传递完毕
		// 传递完毕，文件状态就会变成不可写
		console.log('data ends!');
		console.log('n --> ' + n);
	})
	.on('close', function() {
		console.log('data close!');
	})
	.on('error', function(e) {
		console.log('data read error --> ' + e);
	})