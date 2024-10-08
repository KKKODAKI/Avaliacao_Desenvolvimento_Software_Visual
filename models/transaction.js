// models/transaction.js
const Sequelize = require('sequelize');
module.exports = (sequelize) => {
    const Transaction = sequelize.define('Transaction', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        valorTotal: {
            type: Sequelize.FLOAT,
            allowNull: false
        },
        metodoPagamento: {
            type: Sequelize.STRING,
            allowNull: false
        },
        status: {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: 'pendente'
        }
    });

    return Transaction;
};
