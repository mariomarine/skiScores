/*
Create connection to db
*/
var db = {};
const Sequelize = require('sequelize');
const sequelize = new Sequelize('skiscores', 'root', '', {
    host: 'localhost',
    dialect: 'sqlite',

    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    storage: '../skiscores'
    // storage: './testscores'
});
sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch(err => {
    console.error('Unable to connect to authenticate sequelize: ', err);
});
db.race = require('../models/RaceModel')(sequelize, Sequelize);
db.results = require('../models/Results')(sequelize, Sequelize);
db.person = require('../models/Person')(sequelize, Sequelize);
db.race.sync({force: false});
db.results.sync({force: false});
db.person.sync({force: false});

/*
Build functions
*/
var prompt = require('prompt');
var csv = require('csvtojson');

var getFileName = function () {
    prompt.start();
    var filename;
    prompt.get(['filename'], function (err, result) {
        if (err) {
            console.log(err);
            return 1;
        }
        filename = result.filename;
        main(filename);
    });
}

var getDataFromFile = function (filename) {
}

async function handleData (data, filename) {
    var personObject, resultObject, raceid, personid;
    race_params = getRaceParams(filename);
    savedRace = await buildRace(race_params);
    raceid = savedRace[0].dataValues.id
    for (var i = 0; i < data.length; i++) {
        let result = data[i];
        savedPerson = await buildPerson(result, race_params.gender);
        personid = savedPerson[0].dataValues.id;
        resultObject = await buildResult(result, raceid, personid);
    }
}

var getRaceParams = function (filename) {
    filename = filename.split('/'); // Break out path
    filename = filename[filename.length - 1]; // Remove path
    filename = filename.split('.')[0]; // Remove extension
    var arr = filename.split('_')

    // Order is important
    var date = arr.pop();
    var distance = arr.pop();
    var style = arr.pop();
    var location = arr.pop();
    var group = arr.pop()
    var gender = arr.pop()

    var race_params = {
        location: location,
        date: date,
        class: style,
        level: group,
        gender: gender,
        distance: distance,
    }
    return race_params;
}

var buildRace = function (race_params) {
    return db.race.findOrCreate({where: {
        location: race_params.location,
        date: race_params.date,
        class: race_params.class,
        level: race_params.level,
        distance: race_params.distance,
        gender: race_params.gender
    }})
}

var buildPerson = function (result, gender) {
    person_params = {
        gender: gender,
        first: result.first,
        last: result.last
    }
    // Could find out graduation with if (result.grade)
    return db.person.findOrCreate({where: person_params});
}

var buildResult = function (result, raceid, personid) {
    return db.results.findOrCreate({where: {
        raceid: raceid,
        personid: personid,
        time: getNumSeconds(result.time)
    }});
}

var getNumSeconds = function (timeStr) {
    timeArr = timeStr.split(':');
    return timeArr[0]*3600 + timeArr[1]*60 + timeArr[2]*1
}

/*
Start of Script
*/

var main = function (filename) {
    csv().fromFile(filename)
    .on('end_parsed', function (jsonArrayObj) {
        handleData(jsonArrayObj, filename);
    });
}

getFileName(); // Will call main in callback
//main('./test/boys_ms_casper_skate_4k_2017-02-18.csv')

