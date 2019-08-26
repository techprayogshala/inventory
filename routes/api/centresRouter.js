const express = require('express');

const router = express.Router();

const { getShoppingCentres, getShoppingCentre } = require('./assetModel');

// GET list of all shopping centres
router.get('/', async function(req, res) {
  res.send(await getShoppingCentres());
});

// GET a particular shopping centre
router.get('/:centreId', async function(req, res) {
  if (req.params.centreId) {
    res.send(await getShoppingCentre(req.params.centreId));
  }
});

module.exports = router;
