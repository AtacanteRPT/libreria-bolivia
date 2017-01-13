module.exports = (sequelize , Datatypes)=>{
    var Es_Genero =  sequelize.define('es_genero' , {
        puntuacion: Datatypes.INTEGER

    } ,{
    classMethods: {
      associate: (models) => {
        // example on how to add relations
        // Article.hasMany(models.Comments);

        Es_Genero.belongsTo(models.libros);
        Es_Genero.belongsTo(models.generos);
      }
    }
   });

   return Es_Genero; 
} 