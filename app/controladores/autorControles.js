var express = require('express'),
    router = express.Router(),
    db = require('../modelos'),
    authMiddleware = require('.././middleware/auth');

module.exports  = app =>{
    app.use('/',router);
}
router.get('/autores', (req, res, next) => {
    db.autores.findAll({ attributes: ['id', 'nombre', 'apePaterno', 'apeMaterno']}).then((autores) => {
        res.json(autores);
    }, (ex) => {
        res.status(500).send();
    });
});
router.post('/autores', (req, res, next) => {
    var nuevoAutor  =  {
        nombre :  req.nombre , 
        apePaterno : req.apePaterno,
        apeMaterno : req.apeMaterno
    }
    db.autores.create(nuevoAutor).then((autor) => {
        res.json(autor);
    }, (ex) => {
        res.status(500).send();
    });
});
router.get('/autores/:id', (req, res, next) => {
    var autorId = parseInt(req.params.id, 10);
    db.autores.findById(autorId).then((autor) => {
        if (autor) {
            res.json(autor);
        } else {
            res.status(404).send();
        }
    }, (ex) => {
        res.status(500).send();
    })
})
router.put('/autores/:id', (req, res, next) => {
    var autorId = parseInt(req.params.id, 10)
    var autorEditado = {
        nombre :  req.nombre , 
        apePaterno : req.apePaterno,
        apeMaterno : req.apeMaterno
    }
    db.autores.findById(autorId).then( autor => {
        if (autor) {
            autor.update(autorEditado).then((autorModificado) => {
                res.json(autorModificado);
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
router.delete('/autores/:id', (req , res , next)=>{
    var autorId = parseInt(req.params.id, 10 );
    db.autores.destroy({
        where:{
            id : autorId
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