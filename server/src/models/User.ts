import { DataTypes, Model } from "sequelize";
import bcrypt from "bcrypt";
import db from "../config/connection.js"

type group = 'cast' | 'crew' | 'production'

class User extends Model {
    id!: string;
    createdAt!: Date;
    updatedAt!: Date;
    firstName!: string;
    lastName!: string;
    email!: string;
    password!: string;
    phone?: string;
    roles?: string[];
    age?: number;
    groups?: group[];

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
                len: [6, 100] // Password must be between 6 and 100 characters
            }
        }
    },
    {
        sequelize: db,
        modelName: 'User',
        hooks: {
            beforeBulkCreate: async (users) => {
                for (const user of users) {
                    if (user.password) {
                        user.password = await bcrypt.hash(user.password, 10);
                    }
                }
            },
            beforeCreate: async (user) => {
                if (user.password) {
                    user.password = await bcrypt.hash(user.password, 10);
                }
            },
            beforeUpdate: async (user) => {
                if (user.changed('password')) {
                    user.password = await bcrypt.hash(user.password, 10);
                }
            }
        }
    });

export default User;