module.exports = (sequelize, DataTypes) => {
    const alias = "Category";

    const cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        
        category: {
            type: DataTypes.STRING,
            allowNull: false,

        },

        description: {
            type: DataTypes.STRING,
            allowNull: true
        },

    };

    const config = {
        tableName: "categories",
        timestamps: false
    };

    const Category = sequelize.define(alias, cols, config);

    Category.associate = (models) => {
        Category.hasMany(models.Product, { // Una categoría tiene muchos productos // Acá el nombre del modelo debe coincidir con el alias.
            as: "product",
            timestamps: false,
            foreignKey: "category_id"
        });

    }


    return Category;
}










