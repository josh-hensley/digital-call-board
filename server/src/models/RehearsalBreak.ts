import { DataTypes, Model } from "sequelize";
import db from "../config/connection.js"

class RehearsalBreak extends Model {
    id!: string;
    time!: string;
    length!: number;
    ReportId!: string
}

RehearsalBreak.init(
    {
        time: {
            type: DataTypes.STRING,
            allowNull: false
        },
        length: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        sequelize: db,
        modelName: 'RehearsalBreak',
        createdAt: false,
        updatedAt: false
    }
)

export default RehearsalBreak;