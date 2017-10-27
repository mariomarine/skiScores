'use strict';

var Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
<<<<<<< HEAD
    const resultModel = sequelize.define('resultModel', {
        resultID: {
            type: Sequelize.INTEGER,
            unique: true,
            primaryKey: true
        },
        personID: {
            type: Sequelize.INTEGER,
            unique: true
        },
        raceID: {
            type: Sequelize.INTEGER,
            unique: true
        },
        grade: {
            type: Sequelize.INTEGER
        },
        team: {
            type: Sequelize.STRING(20)
        },
        place: {
            type: Sequelize.INTEGER
        },
        time: {
            type: Sequelize.STRING
        }
    }, {
        freezeTableName: true // Model tableName will be the same as the model name
    });
    return resultModel

    var results = sequelize.define('results', {
        personid: {
            type: Sequelize.INTEGER,
        },
        raceid: {
            type: Sequelize.INTEGER
        },
        time: {
            type: Sequelize.INTEGER // seconds
        },
    }, {
        freezeTableName: true // Model tableName will be the same as the model name
    });

    return results;
};


