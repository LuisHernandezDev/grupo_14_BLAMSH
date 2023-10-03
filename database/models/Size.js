const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
    const alias = "Size";

    const cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        size: {
            type: DataTypes.STRING,
            allowNull: false,

        }

    };

    const config = {
        tableName: "sizes",
        timestamps: false
    };

    const Size = sequelize.define(alias, cols, config);

    Size.associate = (models) => {
        Size.belongsToMany(models.Product, { // 1 producto esta disponible en varias tallas y una talla puede estar asociada a varios productos
            as: "products", // Nombre de la relación
            through: "ProductSize", // Nombre del alias de la tabla intermedia
            foreignKey: "id_size", // foreignKey que hace referencia a este modelo.
            timestamps: false
        });
    }

    return Size;
}










