const express = require('express');

const router = express.Router();
const authenticate = require('../../service/authenticate');

// POST username and Passwrod to authenticate the user.
router.post('/', (req, res) => {
  const response = authenticate.login(req.body.userName, req.body.password);
  if (response) {
    return res.status(200).send(response);
  }
  throw new Error('Invalid Details');
});

module.exports = router;
