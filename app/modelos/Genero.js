module.exports = (sequelize , Datatypes)=>{
    var Genero =  sequelize.define('generos' , {
        nombre : Datatypes.STRING
    } , {
    classMethods: {
      associate: (models) => {
        // example on how to add relations
        // Article.hasMany(models.Comments);
      }
    }
   });
   return Genero;
} 