const { DataTypes } = require ("sequelize");

module.exports = (sequelize) => {
    sequelize.define("activity", {
        name:{
            type: DataTypes.STRING,
            allowNull: true,
            unique: true,
        },

        dificulty: {
            type: DataTypes.INTEGER,
            validate: {
                min: 1,
                max: 5,
            },
            defaultValue: 0,
        },
        
        duration: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: true,
        },

        season: {
            type: DataTypes.ENUM ("Verano", "Otoño", "Inviero", "Primavera"),
            allowNull: true,
        },
    });
};