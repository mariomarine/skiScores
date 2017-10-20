var express = require('express');
var racemodel = require('./models/RaceModel');
var resultmodel = require('./models/Results');
var config = require('./config/config.js');
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
db.race = require('./models/RaceModel')(sequelize, Sequelize);
db.results = require('./models/Results')(sequelize, Sequelize);
db.person = require('./models/Person')(sequelize, Sequelize);
// Commented for reference when testing
// sequelize.sync()
//     .then(() => db.person.create({
//     personid: 101010,
//     gender: 'U',
//     first:   'jo',
//     last:    'crafty',
//     graduation: 12
// }))
// .then(person => {
//     console.log(person.get({
//     plain: true
// }));
// });
// sequelize.sync({}).then(() => {
//     // Table created
//     return resultmodel.resultModel.create({
//         resultID: 123456,
//         personID: 774477,
//         raceID:   123456789,
//         grade:    12,
//         team:     'Varisity City Team',
//         place:    123456
//     });
// });

// sequelize.sync()
//     .then(() => db.race.create({
//     raceId: 101 ,
//     location: 'Austin Tx',
//     class:    'junior',
//     level: '123'
// }))
// .then(race => {
//     console.log(person.get({
//     plain: true
// }));
// });

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
// May have to alter by allowing the variable to take a users input
var raceid = 123;

// Race data endpoint
// Used to display individual race data given the variable raceid
router.get('/race', function(req, res) {
    db.race.findAll(
        {
          where: {
            raceId: raceid
          }
        }
    ).then(function(race) {
        res.json(race);
    });
});

// Querying ALL of the races
// Races data endpoint
// Pagination?
router.get('/races', function(req, res){
    db.race.findAll().then(function(races){res.json(races);})
});

// Results data endpoint
// @var: raceid ^^ possibly change to accept user input?
router.get('/result', function(req, res){
raceid = req.query.raceID;	
	db.results.findAll(
        {
            where: {
                raceId: raceid 
            }
        }
    ).then(function(results) {
        res.json(results);
    });
});

// 
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
        console.log('Magic happens on port ' + config.port);
});
