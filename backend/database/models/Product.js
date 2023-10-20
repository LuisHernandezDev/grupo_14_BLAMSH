module.exports = (sequelize, DataTypes) => {
    const alias = "Product";

    const cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,

        },
        description: {
            type: DataTypes.INTEGER,
            allowNull: false,

        },

        image: {
            type: DataTypes.STRING,
            allowNull: false,

        },

        price: {
            type: DataTypes.FLOAT,
            allowNull: false
        },

        category_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "categories", // Nombre de la tabla a la que hace referencia
                key: "id" // Nombre de la columna en la tabla Genre
            }
        }


    };

    const config = {
        tableName: "products",
        timestamps: false
    };

    const Product = sequelize.define(alias, cols, config);

    Product.associate = (models) => {
        Product.belongsTo(models.Category, { // 1 producto tiene una categoria // Acá el nombre del modelo debe coincidir con el alias.
            as: "category",
            timestamps: false,
            foreignKey: "category_id"
        });

        Product.belongsToMany(models.Size, { // 1 producto esta disponible en varias tallas y una talla puede estar asociada a varios productos
            as: "sizes", // Nombre de la relación
            through: "ProductSize", // Nombre del alias de la tabla intermedia
            foreignKey: "id_product", // foreignKey que hace referencia a este modelo.
            timestamps: false
        });

    }


    return Product;
}










