var express	= require("express"),
	app 	= express(),
	server  = require("http").createServer(app),
	io 		= require("socket.io").listen(server),
	cons 	= require("consolidate"),
	styl 	= require("stylus");

server.listen(3000)

// View engine
app.engine(".jade", cons.jade);
app.set("view engine", "jade");
app.set("view", "./views");
app.use(styl.middleware("./public"));

// Static files
app.use(express.static("./public"));

// Index
app.get("/", function (req, res){
	res.render("index");
});

// Websockets
io.sockets.on("connection", function (socket) {
	socket.on("mensajeEnviado", function (datos) {
		io.sockets.emit("nuevoMensaje", datos);
	})
})