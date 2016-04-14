var fs = require('fs');

var readSteam = fs.createReadStream('../9\ buffer/logo.png');
var writeSteam = fs.createWriteStream('stream_copy_logo2.png');

/*
	需要注意的是，因为读取和写入的数据是不恒定的，如果读取的速度比写入的快，那么数据流内内部的缓存会被“爆仓”，所以我们要判断 write 方法。
	看一下传入的数据是否已经写入到目标了，如果还在缓存区，那么再根据可写流的 stream 方法，如果已经写入，那么就可以读取下一个数据块了。
*/ 
readSteam
	.on('data', function(chunk) {
		if(writeSteam.write(chunk) === false) {
			// false 证明数据还在缓存区
			console.log('data still cached');
			readSteam.pause();
		}
	})
	.on('end', function() {
		writeSteam.close();
	})

writeSteam
	.on('drain', function() {
		// drain 事件 -> 证明数据已经被消费完了
		console.log('data drain');
		readSteam.resume();
	})