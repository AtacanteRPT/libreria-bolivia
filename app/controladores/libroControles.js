
var express = require('express'),
    router = express.Router(),
    db = require('../modelos'),
    authMiddleware = require('.././middleware/auth');

module.exports  = app =>{
    app.use('/',router);
}
router.get('/libros', (req, res, next) => {
    db.libros.findAll({ attributes: ['id', 'codigo', 'nombre', 'precio','estanteId'] }).then((libros) => {
        res.json(libros);
    }, (ex) => {
        res.status(500).send();
    })
})
router.post('/libros', (req, res, next) => {
    var nuevoLibro  =  {
        codigo : req.codigo,
        nombre :  req.nombre , 
        precio : req.precio,
        estanteId : req.estanteId
    }
    db.libros.create(nuevoLibro).then((libro) => {
        res.json(libro);
    }, (ex) => {
        res.status(500).send();
    });
});
router.get('/libros/:id', (req, res, next) => {
    var libroId = parseInt(req.params.id, 10);
    db.libros.findById(libroId).then((libro) => {
        if (libro) {
            res.json(libro);
        } else {
            res.status(404).send();
        }
    }, (ex) => {
        res.status(500).send();
    })
})
router.put('/libros/:id', (req, res, next) => {
    var libroId = parseInt(req.params.id, 10)
    var libroEditado = {
        nombre: req.nombre,
        precio: req.precio,
        estanteId: req.estanteId
    }
    db.libros.findById(libroId).then( libro => {
        if (libro) {
            libro.update(libroEditado).then((libroModificado) => {
                res.json(libroModificado);
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
router.delete('/libros/:id', (req , res , next)=>{
    var libroId = parseInt(req.params.id, 10 );
    db.libros.destroy({
        where:{
            id : libroId
        }
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