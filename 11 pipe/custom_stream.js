var stream = require('stream');
var util = require('util');

// 构造函数
function ReadStream() {
	// 调用 stream 包里的 Readable 构造方法
	stream.Readable.call(this);
}

// ReadStream 继承 stream.Readable
util.inherits(ReadStream, stream.Readable);

// 重写原型方法（私有）
ReadStream.prototype._read = function() {
	this.push('I ');
	this.push('Love ');
	this.push('Imooc \n');
	this.push(null);
};

function WritStream() {
	stream.Writable.call(this);
	this._cached = new Buffer('');
}

util.inherits(WritStream, stream.Writable);

WritStream.prototype._write = function(chunk, encode, cb) {
	console.log(chunk.toString());
	cb();
};

function TransformStream() {
	stream.Transform.call(this);
}

util.inherits(TransformStream, stream.Transform);

TransformStream.prototype._transform = function(chunk, encode, cb) {
	this.push(chunk);
	cb();
};

TransformStream.prototype._flush = function(cb) {
	this.push('Oh Yeah!');
	cb();
};


var rs = new ReadStream();
var ws = new WritStream();
var ts = new TransformStream();

rs.pipe(ts).pipe(ws);
