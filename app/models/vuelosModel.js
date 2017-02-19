// grab the mongoose module
var mongoose = require('mongoose');

// define our nerd model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('vuelosModel', {
	//_id: {type: mongoose.Schema.Types.ObjectId, required: false},
	_id: Number,
    aerolinea: String,
    ciudadOrigen: String,
     ciudadDestino: String,
    departureDate: {type: Date, default: Date.Now+1},
    arrivalDate: {type: Date, default: Date.Now+1},
});
