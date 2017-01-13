module.exports = (sequelize , Datatypes)=>{

    var Editorial =  sequelize.define('editoriales' , {
        nombre : Datatypes.STRING
    } , {
    classMethods: {
      associate: (models) => {
        // example on how to add relations
        // Article.hasMany(models.Comments);
      }
    }
   })
return Editorial;
} ;