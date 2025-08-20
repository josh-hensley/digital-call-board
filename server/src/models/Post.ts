import { DataTypes, Model } from "sequelize";
import db from "../config/connection.js"

class Post extends Model {
    id!: string;
    createdAt!: Date;
    updatedAt!: Date;
    content!: string;
}

Post.init(
    {
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    },
    {
        sequelize: db,
        modelName: 'Post'
    });

export default Post;
