var path = require('path');
var express = require('express');
var app = express();

var router = express.Router();

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
router.get('/', function(req, res) {
    res.json({message: 'hoorway! welcome to our api!'});
});

app.use('/api', router);

app.set('port', 3000);

var server = app.listen(app.get('port'), function() {
        var port = server.address().port;
        console.log('Magic happens on port ' + port);
});
