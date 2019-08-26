/*
 * TODO: Use Knex.js instead of plain queries
 */

const connect = require('../../connect');

// sqllite doesn't support promises. TODO: potentially look at other libraries
function promisifyAll(sql, params) {
  return new Promise((resolve, reject) => {
    connect.getDbInstance().all(sql, params, (err, rows) => {
      if (err) {
        // todo: add winston or some other logger
        reject(err);
        return;
      }
      resolve(rows);
    });
  });
}

function promisifyRun(sql, params) {
  return new Promise((resolve, reject) => {
    connect.getDbInstance().run(sql, params, (err, rows) => {
      if (err) {
        // todo: add logger
        reject(err);
        return;
      }
      resolve(rows);
    });
  });
}

function getAssets() {
  return promisifyAll(
    'SELECT rowid AS id, asset_id, name, dimension, status, user_id  FROM asset',
    []
  );
}

function getAsset(assetId) {
  return promisifyAll(
    'SELECT rowid AS id, asset_id, name, dimension, status, user_id  FROM asset WHERE asset_id = ?',
    [assetId]
  );
}

function getShoppingCentreAssets(centreId) {
  return promisifyAll(
    'SELECT rowid AS id, asset_id, name, dimension, status, user_id  FROM asset WHERE centre_id = ?',
    [centreId]
  );
}

function updateAsset(params) {
  return promisifyRun('UPDATE asset SET status=?, user_id=? WHERE asset_id = ?', params);
}

function addAsset(params) {
  return promisifyRun(
    'INSERT INTO asset(asset_id, centre_id, name, dimension, status, user_id) VALUES(?,?,?,?,?,?)',
    params
  );
}

function removeAsset(assetId) {
  return promisifyRun('DELETE FROM asset WHERE asset_id=?', [assetId]);
}

function getShoppingCentres() {
  return promisifyAll(
    'SELECT rowid AS id, name, address, centre_id, user_id  FROM shopping_centre',
    []
  );
}

function getShoppingCentre(centreId) {
  return promisifyAll(
    'SELECT rowid AS id, name, address, centre_id, user_id  FROM shopping_centre WHERE centre_id=?',
    [centreId]
  );
}


module.exports = {
  getAssets,
  getAsset,
  getShoppingCentreAssets,
  updateAsset,
  addAsset,
  removeAsset,
  getShoppingCentres,
  getShoppingCentre,
};
