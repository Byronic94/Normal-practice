var dgram = require("dgram");
var message = new Buffer("你好！");
var client = dgram.createSocket("udp4");
client.send(message,0,message.length,41234,"localhost",function(err,bytes){
	if(err) console.log('发送数据失败。');
	else console.log("已发送%d字节数据。",bytes);
});
client.on("message", function(msg,rinfo) {
	console.log("已接收服务端发出的数据:%s"+msg);
	console.log("服务端地址为%s",rinfo.address);
	console.log("服务端所用端口为%s.",rinfo.port);
	client.close();
});
client.on("close",function(){
	console.log("socket端口被关闭");
});