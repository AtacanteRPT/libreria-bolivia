var express = require('express'),
    router = express.Router(),
    db = require('../modelos'),
    authMiddleware = require('.././middleware/auth');

module.exports = function (app) {
    app.use('/', router);

};
router.get('/sucursales', (req, res, next) => {

    db.sucursales.findAll({ attributes: ['id', 'nombre', 'direccion'] }).then((sucursales) => {
        res.json(sucursales);
    }, (ex) => {
        res.status(500).send();
    });
});
router.post('/sucursales', (req, res, next) => {
    var sucursalNueva = {
        nombre: req.body.nombre,
        direccion: req.body.direccion
    }
    console.log(sucursalNueva.nombre, " + " + req.body.nombre)
    db.sucursales.create(sucursalNueva).then((sucursal) => {
        res.status(201).json({
            id: sucursal.id,
            nombre: sucursal.nombre,
            direccion: sucursal.direccion
        });
    }, (ex) => {
        res.status(400).json(ex);
    });

});
router.get('/sucursales/:id', (req, res, next) => {
    var sucursalId = parseInt(req.params.id, 10);
    db.sucursales.findById(sucursalId).then((sucursal) => {
        if (sucursal) {
            res.json(sucursal);
        } else {
            res.status(404).send();
        }
    }, (ex) => {
        res.status(500).send();
    });
});
router.put('/sucursales/:id', (req, res, next) => {
    var sucursalId = parseInt(req.params.id, 10);
    var sucursalEditada = {
        nombre: req.body.nombre,
        direccion: req.body.direccion
    }
    db.sucursales.findById(sucursalId).then((sucursal) => {
        if (sucursal) {
            sucursalEditada.usuarioId = sucursal.usuarioId
            sucursal.update(sucursalEditada).then((sucursal) => {
                res.json(sucursal);
            }, (ex) => {
                res.status(400).send();
            });
        } else {
            res.status(404).send();
        }
    }, (ex) => {
        res.status(500).send();
    });
});
router.delete('/sucursales/:id', (req, res, next) => {
    var sucursalId = parseInt(req.params.id, 10);
    db.sucursales.destroy({
        where: {
            id: sucursalId
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
