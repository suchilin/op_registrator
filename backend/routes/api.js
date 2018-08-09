var mongoose = require('mongoose');
var passport = require('passport');
var config = require('../config/database');
require('../config/passport')(passport);
var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var User = require('../models/user');
var Book = require('../models/book');
var Client = require('../models/client');
var Openpay = require('openpay');
var openpay = new Openpay(
  'm1flcuq2jmk4xqlknuol',
  'sk_54df6a613c8d41dd8c6c9fd2776657a3',
);

router.post('/signup', function(req, res) {
  if (!req.body.username || !req.body.password) {
    res.json({success: false, msg: 'Please pass username and password.'});
  } else {
    var newUser = new User({
      username: req.body.username,
      password: req.body.password,
    });
    // save the user
    newUser.save(function(err) {
      if (err) {
        return res.json({success: false, msg: 'Username already exists.'});
      }
      res.json({success: true, msg: 'Successful created new user.'});
    });
  }
});

router.post('/signin', function(req, res) {
  User.findOne(
    {
      username: req.body.username,
    },
    function(err, user) {
      if (err) throw err;

      if (!user) {
        res
          .status(401)
          .send({
            success: false,
            msg: 'Authentication failed. User not found.',
          });
      } else {
        // check if password matches
        user.comparePassword(req.body.password, function(err, isMatch) {
          if (isMatch && !err) {
            // if user is found and password is right create a token
            var token = jwt.sign(user, config.secret);
            // return the information including token as JSON
            res.json({success: true, token: 'JWT ' + token});
          } else {
            res
              .status(401)
              .send({
                success: false,
                msg: 'Authentication failed. Wrong password.',
              });
          }
        });
      }
    },
  );
});

router.post('/client', passport.authenticate('jwt', {session: false}), function(
  req,
  res,
) {
  var token = getToken(req.headers);
  if (token) {
    if (!req.body.name) {
      return res.json({success: false, msg: 'Nombre del cliente requerido'});
    } else if (!req.body.last_name) {
      return res.json({
        success: false,
        msg: 'Apellidos del cliente requeridos',
      });
    } else if (!req.body.email) {
      return res.json({success: false, msg: 'Email del cliente requerido'});
    }
    var customerRequest = {
      name: req.body.name,
      last_name: req.body.last_name,
      email: req.body.email,
    };

    openpay.customers.create(customerRequest, function(error, customer) {
      if (error) {
        return res.json({
          success: false,
          msg: 'Fallo al guardar el cliente. :(',
        });
      }
      return res.json({success: true, msg: 'Cliente creado correctamente. ;)'});
    });
  } else {
    return res.status(403).send({success: false, msg: 'No autorizado 8)'});
  }
});

router.put('/client', passport.authenticate('jwt', {session: false}), function(
  req,
  res,
) {
  var token = getToken(req.headers);
  if (token) {
    if (!req.body.id) {
      return res.json({success: false, msg: 'Id del cliente requerido'});
    } else if (!req.body.name) {
      return res.json({success: false, msg: 'Nombre del cliente requerido'});
    } else if (!req.body.last_name) {
      return res.json({
        success: false,
        msg: 'Apellidos del cliente requeridos',
      });
    } else if (!req.body.email) {
      return res.json({success: false, msg: 'Email del cliente requerido'});
    }
    var customerRequest = {
      name: req.body.name,
      last_name: req.body.last_name,
      email: req.body.email,
    };

    openpay.customers.update(req.body.id, customerRequest, function(
      error,
      customer,
    ) {
      if (error) {
        return res.json({
          success: false,
          msg: 'Fallo al actualizar el cliente. :(',
        });
      }
      return res.json({
        success: true,
        msg: 'Cliente actualizado correctamente. ;)',
      });
    });
  } else {
    return res.status(403).send({success: false, msg: 'No autorizado 8)'});
  }
});

router.get('/client', passport.authenticate('jwt', {session: false}), function(
  req,
  res,
) {
  var token = getToken(req.headers);
  if (token) {
    openpay.customers.list(function(error, list) {
      if (error) {
        return res.json({
          success: false,
          msg: 'Fallo al obtener los clientes. :(',
        });
      }
      return res.json(list);
    });
  } else {
    return res.status(403).send({success: false, msg: 'No autorizado 8).'});
  }
});

router.get(
  '/client/:id',
  passport.authenticate('jwt', {session: false}),
  function(req, res) {
    var token = getToken(req.headers);
    var id = req.params.id;
    if (token) {
      if (!id) {
        return res.json({success: false, msg: 'Id del cliente requerido'});
      }
      openpay.customers.get(id, function(error, response) {
        if (error) {
          return res.json({
            success: false,
            msg: 'Fallo al obtener los clientes. :(',
          });
        }
        return res.json(response);
      });
    } else {
      return res.status(403).send({success: false, msg: 'No autorizado 8).'});
    }
  },
);

router.delete('/client', passport.authenticate('jwt', {session: false}),
  function(req, res) {
    var token = getToken(req.headers);
    if (token) {
      if (!req.body.id) {
        return res.json({success: false, msg: 'Id del cliente requerido'});
      }
      openpay.customers.delete(req.body.id, function(error) {
        return res.json({
          success: true,
          msg: 'Cliente eliminado correctamente. ;)',
        });
      });
    } else {
      return res.status(403).send({success: false, msg: 'No autorizado 8).'});
    }
  },
);

getToken = function(headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

module.exports = router;
