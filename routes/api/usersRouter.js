const express = require('express');

const router = express.Router();

// Routes for user management can also be built similar to assets and shopping centres
router.get('/', (req, res) => {
  res.send('respond with a resource');
});

module.exports = router;
