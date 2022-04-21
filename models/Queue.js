const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Queue extends Model {};

Queue.init (
    {
        id: {
            type: DataTypes.INTEGER,  
            allowNull: false,
            primaryKey: true,
            autoIncrement: true 
        },
        show_id: {
            type: DataTypes.INTEGER,  
            allowNull: false,
        },
        show_title: {
            type: DataTypes.STRING, 
            allowNull: false,
        },
        show_img: {
            type: DataTypes.STRING,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    }, {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'queue'
    }
);

module.exports = Queue;