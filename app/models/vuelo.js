// grab the mongoose module
var mongoose = require('mongoose');
module.exports = mongoose.model('vuelo', {
	_id : Number , 
	aerolinea: String , 
	ciudadOrigen: String,
	ciudadDestino: String, 
	fechaSalida: Date , 
	fechaLlegada: Date
});