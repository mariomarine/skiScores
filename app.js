var path = require('path');
var express = require('express');
var app = express();
var router = express.Router();

// Potentially necessary? Harmless to leave until the end of our testing...
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
router.get('/', function(req, res) {
    res.json({message: 'hoorway! welcome to our api!'});
});

// SQL section for connecting to database
const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./db/skiscores.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the skiscores database.');
});
db.serialize(() => { // Example query
    db.each('Select id, location, date from races', (err, row) => { 
        if (err) {
            console.error(err.message);
        }
        console.log(row.id + '\t' + row.location + '\t' + row.name);
    });
});
db.close((err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Closed the database connection.');
});

// Finalize API settings and initialize
app.use('/api', router);
app.set('port', 8000);
var server = app.listen(app.get('port'), function() {
        var port = server.address().port;
        console.log('Magic happens on port ' + port);
});
