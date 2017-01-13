module.exports = (sequelize , Datatypes)=>{
    var Sucursal =  sequelize.define('sucursales' , {
        nombre: Datatypes.STRING,
        direccion : Datatypes.STRING
    } , {
    classMethods: {
      associate: (models) => {
        // example on how to add relations
        // Article.hasMany(models.Comments);
        Sucursal.belongsTo(models.usuarios)
      }
    }
   });

   return Sucursal;
} 