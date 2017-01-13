module.exports = (sequelize , Datatypes)=>{
    var Estante =  sequelize.define('estantes' , {
        nroEstante: Datatypes.INTEGER,
        nombre : Datatypes.STRING
    } , {
    classMethods: {
      associate: (models) => {
        // example on how to add relations
        // Article.hasMany(models.Comments);

        Estante.belongsTo(models.sucursales);
      }
    }
   });

   return Estante;
} 