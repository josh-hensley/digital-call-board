import { DataTypes, Model } from "sequelize";
import db from "../config/connection.js"

type rehearsalBreak = { time: string, length: number }

class Report extends Model {
    id!: string;
    createdAt!: Date;
    updatedAt!: Date;
    date!: string;
    rehearsalStart!: string;
    breaks?: rehearsalBreak[];
    rehearsalEnd!: string
    present!: string[];
    absent?: string[];
    rehearsalNotes?: string;
    costumes?: string;
    lights?: string;
    properties?: string;
    sound?: string;
    scenery?: string;

}

Report.init(
    {
        date: {
            type: DataTypes.STRING,
            allowNull: false
        },
        rehearsalStart: {
            type: DataTypes.STRING,
            allowNull: false
        },
        rehearsalEnd: {
            type: DataTypes.STRING,
            allowNull: false
        },
        present: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false
        },
        absent: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: true
        },
        rehearsalNotes: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        costumes: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        lights: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        properties: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        sound: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        scenery: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    },
    {
        sequelize: db,
        modelName: 'Report'
    });

export default Report;