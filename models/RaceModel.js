'use strict';

var Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    var raceModel = sequelize.define('raceModel', {
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

    raceModel.sync({}).then(function () {
        // Table created
        return raceModel.create({
            raceId: 'onetwothree',
            location: 'landerwy'
        });
    });
};