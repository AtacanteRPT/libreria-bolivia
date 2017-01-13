var express = require('express'),
    router = express.Router(),
    db = require('../modelos'),
    authMiddleware = require('.././middleware/auth');

module.exports  = app =>{
    app.use('/',router);
}

router.get('/generos', (req, res, next) => {
    db.generos.findAll({ attributes: ['id','nombre'] }).then((generos) => {
        res.json(generos);
    }, (ex) => {
        res.status(500).send();
    });
});
router.post('/generos', (req, res, next) => {
    var generoNuevo  =  {
        nombre :  req.nombre, 
    }
    db.generos.create(generoNuevo).then((genero) => {
        res.json(genero);
    }, (ex) => {
        res.status(500).send();
    })
})
router.get('/generos/:id', (req, res, next) => {
    var generoId = parseInt(req.params.id, 10)
    db.generos.findById(generoId).then((genero) => {
        if (genero) {
            res.json(genero);
        } else {
            res.status(404).send();
        }
    }, (ex) => {
        res.status(500).send();
    })
})
router.put('/generos/:id', (req, res, next) => {
    var generoId = parseInt(req.params.id, 10)
    var generoNuevo = {
        nombre: req.nombre,
        precio: req.precio,
        estanteId: req.estanteId
    }
    db.generos.findById(generoId).then( genero => {
        if (genero) {
            genero.update(generoNuevo).then((generoModificado) => {
                res.json(generoModificado);
            }, (ex) => {
                res.status(400).send();
            });
        } else {
            res.status(404).send();
        }
    }, (ex) => {
        res.status(500).send();
    });
})
router.delete('/generos/:id', (req , res , next)=>{
    var generoId = parseInt(req.params.id, 10 );
    db.generos.destroy({
        where:{id : generoId}
    }).then((filas)=>{
        if(filas ===0){
            res.status(404).send();
        }else{
            res.status(204).send();
        }
    }, ()=>{
        res.status(500).send();
    })
})