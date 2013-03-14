var websocket = io.connect();

$(document).on("ready", inicio);

function inicio () {
	$("#frmChat").on("submit", enviarMensaje);

	websocket.on("nuevoMensaje", procesarMensaje)
};

function enviarMensaje (e) {
	e.preventDefault();
	mensaje = $("#mensaje").val();
	$("#mensaje").val("").focus();	
	websocket.emit("mensajeEnviado", mensaje);
};

function procesarMensaje (data){
	$("#mensajes").append(data+"<br>");	
};