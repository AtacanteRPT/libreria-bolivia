var LocalStrategy = require('passport-local').Strategy;
var mysql = require('mysql');
var bcrypt = require('bcryptjs');
var db = require('../modelos');
module.exports = function (passport) {
    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (obj, done) {
        done(null, obj);
    });

    passport.use(new LocalStrategy({
        passReqToCallback: true
    }, function (req, email, password, done) {

        var db = require('../modelos');

        db.sequelize.query('SELECT * FROM usuarios WHERE email = ?',
            { replacements: [email], type: db.sequelize.QueryTypes.SELECT }
        ).then(function (rows) {
            if (rows.length > 0) {
                var user = rows[0];
                if (bcrypt.compareSync(password, user.password)) {
                    console.log('encontrado y existente');
                    return done(null, {
                        id: user.id,
                        nombre: user.nombre,
                        email: user.email,
                        rango: user.rango
                    });
                }
            }  
            return done(null, false, req.flash('authmessage', 'Email o password incorrecto'));
        })

    }));
};
