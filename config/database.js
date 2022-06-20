const { Sequelize } = require('sequelize');

const sequelize = new Sequelize("postgres://testTwo:Watterbeitslit25!@127.0.0.1:8080/codegig");

module.exports = sequelize;