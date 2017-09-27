'use strict';

var Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    var RaceModel = sequelize.define('RaceModel', {
        raceId: {
            type: Sequelize.STRING,
            unique: true,
            primaryKey: true

        },
        location: {
            type: Sequelize.STRING(10)
        }
    }, {
        freezeTableName: true // Model tableName will be the same as the model name
    });

    RaceModel.sync({}).then(function () {
        // Table created
        return RaceModel.create({
            raceId: 'onetwothree',
            location: 'landerwy'
        });
    });
};