'use strict';

var Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const person = sequelize.define('person', {
        gender: {
            type: Sequelize.STRING(1) // M, F, U
        },
        first: {
            type: Sequelize.STRING(15) // M, F, U
        },
        last: {
            type: Sequelize.STRING(15)
        },
        graduation: {
            type: Sequelize.INTEGER
        }
    }, {
        freezeTableName: true // Model tableName will be the same as the model name
    });

    return person
};

