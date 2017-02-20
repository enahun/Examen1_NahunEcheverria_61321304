var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");

app.use(express.static(path.join(__dirname, 'public', 'views')));

router.get('/', function (req, res) {
    // res.send('Pagina principal - GET');
    res.sendFile(path.join(__dirname, 'vuelos.html'));

});



module.exports = router;