const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('country', {

    id: {
      type: DataTypes.STRING(3),
      primaryKey: true,
      allowNull:false
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

     flagImage: {
       allowNull: false,
       type: DataTypes.STRING,
       defaultValue: "NOT FOUND",
     },

     continent: {
       allowNull: false,
       type: DataTypes.STRING,
     },
     
     capital: {
       allowNull: false,
       type: DataTypes.STRING,
     },

     subregion: {
       type: DataTypes.STRING,
       allowNull: true,
     },

     area: {
       type: DataTypes.INTEGER,
       allowNull: true,
     },

     population: {
       type: DataTypes.INTEGER,
       allowNull: true,
     },
  });
};
