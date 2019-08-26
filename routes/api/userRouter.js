const express = require('express');

const { getUsers } = require('./userModel');

const router = express.Router();

// Routes for user management can also be built similar to assets and shopping centres
// GET request to fetch all users.
router.get('/', async (req, res) => {
  res.send(await getUsers());
});

module.exports = router;
