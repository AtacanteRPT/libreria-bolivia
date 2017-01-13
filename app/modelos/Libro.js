module.exports = (sequelize , Datatypes)=>{
    var Libro =  sequelize.define('libros' , {
        codigo: Datatypes.INTEGER,
        nombre : Datatypes.STRING,
        precio : Datatypes.DOUBLE
    } , {
    classMethods: {
      associate: (models) => {
        // example on how to add relations
        // Article.hasMany(models.Comments);

        Libro.belongsTo(models.estantes);
      }
    }
   });

   return Libro;
} 
