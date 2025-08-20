import { DataTypes, Model } from 'sequelize';
import db from '../config/connection.js';

class Comment extends Model { }

Comment.init(
    {
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
    },
    {
        sequelize: db,
        modelName: 'Comment'
    }
);

export default Comment;