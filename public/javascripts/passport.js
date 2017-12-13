var LocalStrategy = require('passport-local').Strategy;
var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
var dbconfig = require('./database');
var connection = mysql.createConnection(dbconfig.connection);

connection.query('USE ' + dbconfig.database);

module.exports = function(passport) {

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        // console.log("ID CHECK: " + id);
        connection.query("SELECT * FROM users WHERE id = ? ", [id], function(err, rows) {
            if (err) {
                console.log(err.message);
            } else {
                var user = rows[0];
                console.log("USER RESULT!: " + user);
                done(err, user);
            }
        });
    });

    passport.use(
        'local-signup',
        new LocalStrategy({
                usernameField: 'username',
                passwordField: 'password',
                passReqToCallback: true
            },
            function(req, username, password, done) {
                connection.query("SELECT * FROM users WHERE username = ?", [username], function(err, rows) {
                    if (err)
                        return done(err);
                    if (rows.length) {
                        return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
                    } else {
                        console.log(req.body);

                        var newUserMysql = {
                            username: username,
                            password: bcrypt.hashSync(password, null, null),
                            email: req.body.emil
                        };

                        var insertQuery = "INSERT INTO users (username, password, email ) values (?,?,?)";

                        connection.query(insertQuery, [newUserMysql.username, newUserMysql.password, newUserMysql.email], function(err, rows) {
                            if (err) {
                                console.log(err.message);
                            } else {

                                console.log(JSON.stringify(rows));
                                newUserMysql.id = rows.insertId;
                                return done(null, newUserMysql);
                            }
                        });
                    }
                });
            })
    );


    passport.use(
        'local-login',
        new LocalStrategy({
                usernameField: 'username',
                passwordField: 'password',
                passReqToCallback: true
            },
            function(req, username, password, done) {
                connection.query("SELECT * FROM users WHERE username = ?", [username], function(err, rows) {
                    if (err)
                        return done(err);
                    if (!rows.length) {
                        return done(null, false, req.flash('loginMessage', 'No user found.'));
                    }

                    if (!bcrypt.compareSync(password, rows[0].password))
                        return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));

                    return done(null, rows[0]);
                });
            })
    );
};