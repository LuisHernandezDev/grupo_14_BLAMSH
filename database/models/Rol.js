const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {

    const alias = "Rol";

    const cols = {

        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },

        nameRol: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: process.env.CUSTOMER_ROLE_NAME

        },

        descripcion: {
            type: DataTypes.STRING,
            allowNull: false

        },

    }

    const config = {
        tableName: "rols",
        timestamps: false
    }

    const Rol = sequelize.define(alias, cols, config);


    Rol.associate = (models) => {
        Rol.hasMany(models.User, { // 1 rol pertenece a muchos usuarios // Acá el nombre del modelo debe coincidir con el alias.
            as: "user",
            timestamps: false,
            foreignKey: "rol_id"
        });

    }

    return Rol;

}