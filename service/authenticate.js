const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const config = require('../config');

// This method should use authentication system to autheticate the user. Password should be encrypted.
function login(userName, userPassword) {
  const user =
    userName === 'admin' && userPassword === 'admin'
      ? {
          userId: '5',
          name: 'Name5',
          username: 'username5',
          password: 'password5',
          email: 'email5',
        }
      : null;
  if (user) {
    // token contains user details
    const token = jwt.sign(
      {
        userId: user.userId,
        email: user.email,
        expiry: 60000,
      },
      config.secret
    );
    const { password, ...userDetails } = user;

    return {
      status: 'Success',
      token,
      ...userDetails,
    };
  }

  return null;
}

function authenticate() {
  return expressJwt({
    secret: config.secret,
  }).unless({
    path: ['/api/login'],
  });
}

module.exports = { authenticate, login };
