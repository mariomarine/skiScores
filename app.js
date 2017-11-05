var express = require('express');
var normalizer = require('./normalizer.js');
var app = express();
var router = express.Router();
var db = {};

const Sequelize = require('sequelize');
// Attaching to to the database, and establishing a connection
const sequelize = new Sequelize('skiscores', 'root', '', {
    host: 'localhost',
    dialect: 'sqlite',

    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    storage: './skiscores'
});
// Create variables for each race use in endpoints
db.race = require('./models/race')(sequelize, Sequelize);
db.results = require('./models/result')(sequelize, Sequelize);
db.person = require('./models/person')(sequelize, Sequelize);
// Synchronize tables (commented out for reference)
// sequelize.sync().then(() =>{
   // app.listen(config.port || 8000);
   // console.log('server started on port ' + config.port);
// }).catch(err => {
    // console.log('failed to synchronize tables');
// });

// HuzaH! DB connection!
sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch(err => {
    console.error('Unable to connect to authenticate sequelize: ', err);
});

// Root endpoint
router.get('/', function(req, res) {
    res.json({message: 'hoorway! welcome to our api!'});
});

// Universal raceid used for calling a selection of races

// Race data endpoint
router.get('/races', function(req, res) {
    db.race.findAll(
        {
          where: normalizer.normalize_race(req.query)
        }
    ).then(function(race) {
        res.json(race);
    });
});

// Results data endpoint
router.get('/result', function(req, res){
    personid = req.query.personid;
	db.results.findAll(
        {
            where: {
                personid: personid 
            }
        }
    ).then(function(results) {
        res.json(results);
    });
});
// Results data endpoint
router.get('/results', function(req, res){
    db.race.findAll().then(function(races){
        res.json(races);
    })
});
// Potentially necessary? Harmless to leave until the end of our testing...
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// // Finalize API settings and initialize
app.use('/api', router);
app.set('port', 8000);
var server = app.listen(app.get('port'), function() {
        var port = server.address().port;
        console.log('Magic happens on port 8000');
});
