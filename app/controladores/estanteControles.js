var express = require('express'),
    router = express.Router(),
    db = require('../modelos'),
    authMiddleware = require('.././middleware/auth');

module.exports = app => {
    app.use('/', router);
}

router.get('/estantes', (req, res, next) => {

    db.estantes.findAll({ attributes: ['id', 'nombre', 'nroEstante', ['sucursaleId', 'sucursalId']] }).then((estantes) => {
        res.json(estantes);
    }, (ex) => {
        res.status(500).send();
    });
});
router.post('/estantes', (req, res, next) => {
    var estanteNuevo = {
        nombre: req.nombre,
        nroEstante: req.nroEstante,
        sucursaleId: req.sucursalId
    }
    db.estantes.create(estanteNuevo).then((sucursal) => {
        res.json(sucursal);
    }, (ex) => {
        res.status(400).json(ex);
    });

});
router.get('/estantes/:id', (req, res, next) => {
    var estanteId = parseInt(req.params.id, 10);
    db.estantes.findById(estanteId).then((sucursal) => {
        if (sucursal) {
            res.json(sucursal);
        } else {
            res.status(404).send();
        }
    }, (ex) => {
        res.status(500).send();
    });
});
router.put('/estantes/:id', (req, res, next) => {
    var estanteId = parseInt(req.params.id, 10);
    var estanteEditada = {
        nombre: req.nombre,
        nroEstante: req.nroEstante,
        sucursaleId: req.sucursalId
    }
    db.estantes.findById(estanteId).then((estante) => {
        if (estante) {
            estante.update(estanteEditada).then((estante) => {
                res.json(estante);
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

router.delete('/estantes/:id', (req, res, next) => {
    var estanteId = parseInt(req.params.id, 10);
    db.estantes.destroy({
        where: {
            id: estanteId
        }
    }).then((filas) => {
        if (filas === 0) {
            res.status(404).send();
        } else {
            res.status(204).send();
        }
    }, () => {
        res.status(500).send();
    })
});
