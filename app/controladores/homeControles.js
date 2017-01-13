var express = require('express'),
  bcrypt = require('bcryptjs'),
  router = express.Router(),
  passport = require('passport'),
  db = require('../modelos'),
  authMiddleware = require('.././middleware/auth');

module.exports = function (app) {
  app.use('/', router);

}

router.get('/', (req, res, next) => {
  return res.json({
    titulo: 'Configuracion Express y Sequelize'
  });
})

router.get('/api', (req, res, next) => {
  return res.render('api', {
    title: 'Documentacion Hipster'
  });

})
/**
 * Rutas de Creacion y Login de Usuarios  
 */
router.get('/auth/registro', (req, res, next) => {
  return res.json({ registro: 'Bienvenido al registro' });
});

router.post('/auth/registro', (req, res, next) => {
  var salt = bcrypt.genSaltSync(10);
  var password = bcrypt.hashSync(req.body.password, salt);
  var user = {
    email: req.body.email,
    nombre: req.body.nombre,
    password: password,
    rango: req.body.rango
  };

  db.usuarios.findAll({ attributes: ['email'], where: { email: user.email } }).then(email => {

    if (email.length > 0) {
      return res.status(202).json({ respuesta: 'email ya registrado' })

    } else {
      db.usuarios.create(user).then((usuario) => {
        req.flash('info', 'Se ha registrado correctamente, ya puede Iniciar sesion');
        return res.status(201).json({
          id: usuario.id,
          nombre: usuario.nombre,
          email: usuario.email,
          rango: usuario.rango
        });
      }, (ex) => {
        return res.status(400).json(ex);
      });
    }

  }, ex => {
    return res.status(400).json(ex);

  });
});

router.get('/auth/login', (req, res, next) => {
  return res.json({ mensaje: req.flash('info'), autoMensaje: req.flash('authmessage') });
});

router.post('/auth/login', passport.authenticate('local', {
  successRedirect: '/usuario/panel',
  failureRedirect: '/auth/login',
  failureFlash: true
}));

router.get('/auth/cerrar', (req, res, next) => {
  req.logout();
  res.redirect('/auth/login');
});
router.get('/usuario/panel', authMiddleware.estaLogueado, (req, res, next) => {
  return res.json({
    usuarioLogeado: 'Feliz Experiencia',
    estaAutentificado: req.isAuthenticated(),
    usuario: req.user
  });
});

