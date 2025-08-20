import { DataTypes, Model } from "sequelize";
import db from "../config/connection.js"

class User extends Model {
    id!: string;
    createdAt!: Date;
    updatedAt!: Date;
    firstName!: string;
    lastName!: string;
    email!: string;
    password!: string;

    getFullName() {
        return `${this.firstName} ${this.lastName}`;
    }
}

User.init(
    {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8, 30]
            }
        }
    },
    {
        sequelize: db,
        modelName: 'User'
    });

export default User;