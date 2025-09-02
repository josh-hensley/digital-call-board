import { DataTypes, Model } from "sequelize";
import db from "../config/connection.js"

class Event extends Model {
    id!: string;
    createdAt!: Date;
    updatedAt!: Date;
    date!: string;
    time!: string;
    description!: string;
}

Event.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        date: {
            type: DataTypes.STRING,
            allowNull: false
        },
        time: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize: db,
        modelName: 'Event'
    });

export default Event;