'use strict';

var Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
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
