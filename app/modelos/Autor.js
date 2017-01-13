module.exports = (sequelize , Datatypes)=>{

    var Autor =  sequelize.define('autores' , {
        nombre: Datatypes.STRING,
        apeMaterno : Datatypes.STRING,
        apePaterno : Datatypes.STRING
    } , {
    classMethods: {
      associate: (models) => {
        // example on how to add relations
        // Article.hasMany(models.Comments);
      }
    }
   }
    );

    return Autor;
};