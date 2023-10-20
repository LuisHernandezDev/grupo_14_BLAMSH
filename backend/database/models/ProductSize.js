module.exports = (sequelize, DataTypes) => {

    const alias = "ProductSize";

    const cols = {
        
        id_product: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "products", // Nombre de la tabla a la que hace referencia
                key: "id" 
            }
        },
        id_size: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "sizes", // Nombre de la tabla a la que hace referencia
                key: "id"
            }
        },

        stock: {
            type: DataTypes.INTEGER,
            allowNull: true,

        }

    };

    const config = {
        tableName: "products_sizes", // Colocar el nombre exacto de la tabla
        timestamps: false // Esto quiere decir que no intente crear las columnas created_at y updated_at
    }

    const ProductSize = sequelize.define(alias, cols, config);

    // En la tabla intermedia no hace falta hacer las asociaciones. Las mismas se hacen desde las tablas principales de cada una. Por ende, la propiedad otherKey: no es necesaria colocarlas en las asociaciones.

    return ProductSize;
};


