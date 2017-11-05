'use strict';

var Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const resultModel = sequelize.define('result', {
        id: {
            type: Sequelize.INTEGER,
            unique: true,
            primaryKey: true
        },
        personid: {
            type: Sequelize.INTEGER,
        },
        raceid: {
            type: Sequelize.INTEGER,
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
            type: Sequelize.INTEGER
        }
    }, {
        freezeTableName: true // Model tableName will be the same as the model name
    });
    return resultModel
};


