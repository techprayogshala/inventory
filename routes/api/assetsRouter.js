const express = require('express');

const Ajv = require('ajv');
const ajv = new Ajv();

const router = express.Router();
const {
  getAssets,
  getAsset,
  getShoppingCentreAssets,
  updateAsset,
  addAsset,
  removeAsset,
} = require('./assetModel');

const schema = {
  type: 'object',
  required: ['assetId', 'name', 'dimension', 'status'],
  properties: {
    assetId: { type: 'string', minLength : 1 },
    name: { type: 'string', minLength : 1 },
    dimension: { type: 'string', minLength : 1 },
    status: { type: 'string', minLength : 1 }
  }
} 

// GET all assets for shopping centre :id
router.get('/:id/assets', async function(req, res) {
  res.send(await getShoppingCentreAssets(req.params.id));
});

// GET all assets or a particular asset for :assetId
router.get('/assets/:assetId?', async function(req, res) {
  if (req.params.assetId) {
    res.send(await getAsset(req.params.assetId));
  } else {
    res.send(await getAssets());
  }
});

// POST to add a new asset in a shopping centre(id)
router.post('/:id/assets/add', async function(req, res) {
  const valid = ajv.validate(schema, req.body);
  if (!valid) {
    console.log(ajv.errors);
    return res.status(400).send();
  }

  const userId = req.user && req.user.userId; // Retrieve the userId from jwt token.
  const params = [
    req.body.assetId,
    req.params.id,
    req.body.name,
    req.body.dimension,
    req.body.status,
    userId,
  ];
  try {
    res.send(await addAsset(params));
  } catch (e) {
    res.status(500).send();
  }
});

// UPDATE status for assetId in shopping centre :id
router.put('/:id/assets/:assetId', async function(req, res) {
  try {
    const userId = req.user && req.user.userId;
    const params = [req.body.status, userId, req.params.assetId];
    res.send(await updateAsset(params));
  } catch (e) {
    res.status(500).send();
  }
});

// DELETE asset from a shopping centre 
// Delete should be soft delete to keep the historical record of it.
router.delete('/:id/assets/:assetId', async function(req, res) {
  try {
    res.send(await removeAsset(req.params.assetId));
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
