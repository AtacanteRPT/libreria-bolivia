module.exports = (sequelize , Datatypes)=>{
    var Procede =  sequelize.define('procede' , {
        edicion: Datatypes.INTEGER
    } , {
    classMethods: {
      associate: (models) => {
        // example on how to add relations
        // Article.hasMany(models.Comments);
        Procede.belongsTo(models.autores);
        Procede.belongsTo(models.paises);
        Procede.belongsTo(models.editoriales);
        Procede.belongsTo(models.libros);
        
      }
    }
   });

   return Procede;
} 