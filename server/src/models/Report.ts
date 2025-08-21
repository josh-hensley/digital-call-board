import { DataTypes, Model } from "sequelize";
import db from "../config/connection.js"

class Report extends Model {
    id!: string;
    createdAt!: Date;
    updatedAt!: Date;
    
}

Report.init(
    {
        reason: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    },
    {
        sequelize: db,
        modelName: 'Report'
    });

export default Report;