import { DataTypes, Model } from "sequelize";
import db from "../config/connection.js"

class Comment extends Model {
    id!: string;
    createdAt!: Date;
    updatedAt!: Date;
    content!: string;
}

Comment.init(
    {
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    },
    {
        sequelize: db,
        modelName: 'Comment'
    });

export default Comment;
