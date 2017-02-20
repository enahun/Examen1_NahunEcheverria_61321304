// agregar en la ruta routes/vuelos o nombre decidio por programaodor
var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");

// server routes ===========================================================
// handle things like api calls
// authentication routes
router.use(bodyParser.json());
router.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
router.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
var vuelo = require('../models/vuelo');

router.get('/', function (req, res) {
    vuelo.find(function (err, vuelos) {
        if (err)
            res.status(500).send('Error en la base de datos');
        else
            var id = req.query.id;
        res.status(200).json(vuelos);
    });
});
//Guardar data en DB
router.post('/', function (req, res) {
    var vuelosDB = new vuelo({
        _id: req.body.id,
        aerolinea: req.body.aerolinea,
        ciudadOrigen: req.body.ciudadOrigen,
        ciudadDestino: req.body.ciudadDestino,
        fechaSalida: req.body.fechaSalida,
        fechaLlegada: req.body.fechaLlegada
    });
    //guarda un vuelo en la base de datos
    vuelosDB.save(function (error, vuelosDB) {
        if (error) {
            res.status(500).send('Error, no se pudo guardar en DB');
        }
        else {
            res.status(200).send('guardado');
        }
    });
});
//Consulta de vuelos que estén entre dos fechas de salida (desde – hasta)
router.get('/fechasalida', function (req, res) {

    vuelo.find({ fechaSalida: { $gte: req.query.desde, $lte: req.query.hasta } }, function (err, vuelos) {
        if (err)
            res.status(500).send('Error en DB' + err);
        else {
            if (vuelos != null) {
                res.status(200).json(vuelos);
            }

        }
    });
});
//Consulta de vuelos que estén entre dos fechas de llegada (desde – hasta)
router.get('/fechallegada', function (req, res) {

    vuelo.find({ fechaLlegada: { $gte: req.query.desde, $lte: req.query.hasta } }, function (err, vuelos) {
        if (err)
            res.status(500).send('Error en DB' + err);
        else {
            if (vuelos != null) {
                res.status(200).json(vuelos);
            }

        }
    });
});
// Consulta de vuelos que sean de una fecha X o más reciente
router.get('/xfecha', function (req, res) {
    vuelo.findOne({ 'fechaSalida': req.param('fechaSalida') }, function (err, vuelo) {
        if (err)
            res.status(500).send('Error en DB');
        else {
            if (vuelo != null) {
                res.status(200).json(vuelo);
            }
            else
                res.status(404).send('No se encontro vuelo');
        }
    });
});
// Modificar un vuelo por ID
router.put('/:id', function (req, res) {
    vuelo.findById(req.params.id, function (err, vuelos) {
        if (err)
            res.status(500).send('Error en DB');
        else {
            if (vuelos != null) {
                vuelos.aerolinea = req.body.aerolinea;
                vuelos.ciudadOrigen = req.body.ciudadOrigen;
                vuelos.ciudadDestino = req.body.ciudadDestino;
                vuelos.fechaSalida = req.body.fechaSalida;
                vuelos.fechaLlegada = req.body.fechaLlegada;
                vuelo.save(function (error, vuelo) {
                    if (error)
                        res.status(500).send('Error en DB');
                    else {
                        res.status(200).send('Registro actualizado');
                    }
                });
            }

        }
    });
});
// Eliminar un vuelo por ID
router.delete('/:id', function (req, res) {
    //Eliminar con Find ID
    vuelo.findById(req.params.id, function (err, vuelos) {
        if (err)
            res.status(500).send('Error en DB');
        else {
            if (vuelo != null) {
                vuelo.remove(function (error, result) {
                    if (error)
                        res.status(500).send('Error en DB');
                    else {
                        res.status(200).send('Registro eliminado');
                    }
                });
            }
           
        }
    });
});


module.exports = router;