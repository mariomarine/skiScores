'use strict';

var Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    var results = sequelize.define('resultModel', {
        resultId: {
            type: Sequelize.STRING,
            unique: true,
            primaryKey: true
        },
        personId: {
            type: Sequelize.STRING(10)
        },
        date: {
            type: Sequelize.DATE
        },
        class: {
            type: Sequelize.STRING(10)
        },
        level: {
            type: Sequelize.STRING(3)
        }
    }, {
        freezeTableName: true // Model tableName will be the same as the model name
    });

    return raceModel;
};
