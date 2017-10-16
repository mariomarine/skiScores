'use strict';

var Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const raceModel = sequelize.define('races', {
        location: {
            type: Sequelize.STRING(10)
        },
        date: {
            type: Sequelize.DATEONLY
        },
        class: {
            type: Sequelize.STRING(10)
        },
        level: {
            type: Sequelize.STRING(3)
        },
        distance: {
            type: Sequelize.STRING(3)
        },
        gender: {
            type: Sequelize.STRING(9)
        }
    }, {
        freezeTableName: true // Model tableName will be the same as the model name
    });
/*
    // Here for documentation
    raceModel.sync({}).then(function () {
        // Table created
        return raceModel.create({
            location: 'casper'
        });
    });
*/

    return raceModel;
};
