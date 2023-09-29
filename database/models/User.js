const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {

    const alias = "User";

    const cols = {

        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },

        identification: {
            type: DataTypes.INTEGER,
            allowNull: false

        },

        firstName: {
            type: DataTypes.STRING,
            allowNull: false

        },

        lastName: {
            type: DataTypes.STRING,
            allowNull: false

        },

        phone: {
            type: DataTypes.INTEGER,
            allowNull: true

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

        },

        rol_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "rols", // Nombre de la tabla a la que hace referencia
                key: "id" // Nombre de la columna en la tabla Genre
            }

        },

        image: {
            type: DataTypes.STRING,
            allowNull: false,

        },

        date_creation: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),

        }

    }

    const config = {
        tableName: "users",
        timestamps: false
    }

    const User = sequelize.define(alias, cols, config);


    User.associate = (models) => {
        User.belongsTo(models.Rol, { // 1 usuario tiene un rol // Acá el nombre del modelo debe coincidir con el alias.
            as: "rol",
            timestamps: false,
            foreignKey: "rol_id"
        });

    }
    
    return User;

}