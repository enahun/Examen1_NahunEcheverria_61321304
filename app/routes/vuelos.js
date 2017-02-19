
var express = require('express');
var router = express.Router();

// server routes ===========================================================
// handle things like api calls
// authentication routes

//tomando el modelo
var vuelos = require('../models/vuelosModel');

router.get('/',function (req, res){
    Persona.find(function (err, vuelosModel) {
        if (err)
            res.status(500).send('Error en la base de datos');
        else
            res.status(200).json(vuelosModel);
    });
});

router.get('/:id',function(req,res){
    Persona.findById(req.params.id,function(err, persona) {
        if (err)
            res.status(500).send('Error en la base de datos');
        else{
            if (persona != null) {
                res.status(200).json(persona);
            }
            else
                res.status(404).send('No se encontro esa persona');
        }
    });
});

router.post('/',function(req,res){
    //crea un objeto pero del modelo Persona

    var persona1 = new Persona({
		nombres: {nombre: req.body.nombres.nombre, apellido: req.body.nombres.apellido},
		edad: req.body.edad,
		ciudad: req.body.ciudad,
		fechan: req.body.fechan,
		intereses: req.body.intereses
	});

    //guarda una persona en la base de datos
    persona1.save(function (error, persona1) {
        if (error) {
            res.status(500).send('No se ha podido agregar.');
        }
        else {
            res.status(200).json({_id: persona1._id}); //envía al cliente el id generado
        }
    });
});

router.put('/:id',function(req,res){

    //Modificar con Find ID
    Persona.findById(req.params.id,function(err, persona) {
        if (err)
            res.status(500).send('Error en la base de datos');
        else{
            if (persona != null){

                persona.nombres.nombre = req.body.nombres.nombre;
				persona.nombres.apellido = req.body.nombres.apellido;
				persona.edad = req.body.edad;
				persona.ciudad = req.body.ciudad;
				persona.fechan = req.body.fechan;
				persona.intereses = req.body.intereses;

                persona.save(function (error, persona1) {
                    if (error)
                        res.status(500).send('Error en la base de datos');
                    else {
                        res.status(200).send('Modificado exitosamente');
                    }
                });
            }
            else
                res.status(404).send('No se encontro esa persona');
        }
    });
});

router.delete('/:id',function(req,res){
    //Eliminar con Find ID
    Persona.findById(req.params.id,function(err, persona) {
        if (err)
            res.status(500).send('Error en la base de datos');
        else{
            if (persona != null) {
                persona.remove(function (error, result) {
                    if (error)
                        res.status(500).send('Error en la base de datos');
                    else {
                        res.status(200).send('Eliminado exitosamente');
                    }
                });
            }
            else
                res.status(404).send('No se encontro esa persona');
        }
    });
});

module.exports = router;