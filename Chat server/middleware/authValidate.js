const { check } = require('express-validator');

exports.authvalidate = (method) => {
  switch (method) {
    case 'createUser': {
          return [
            check('username', 'Plese Enter userName').not().isEmpty(),
            check('email', 'Email is invalid').exists().isEmail(),
            check('password', 'Password contain at least 5 character').isLength({ min: 5 }),
          ];
      }
      case 'logingUser': {
          return [
              check('email', 'Email is invalid').exists().isEmail(),
              check('password','Please Required password').not().isEmpty(),
          ]
    }
      
  }
};