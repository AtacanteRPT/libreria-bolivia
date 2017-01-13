module.exports = (sequelize , Datatypes)=>{
    var Pais =  sequelize.define('paises' , {
        nombre : Datatypes.STRING
    } , {
    classMethods: {
      associate: (models) => {
        // example on how to add relations
        // Article.hasMany(models.Comments);
      }
    }
   });

   return Pais;
} 