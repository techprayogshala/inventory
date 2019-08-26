/*
 * TODO: Use Knex.js instead of plain queries
 */

const connect = require('../../connect');

// sqllite doesn't support promises. TODO: potentially look at other libraries
// This method should be in utilities and import to use.
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


function getUsers() {
  return promisifyAll(
    'SELECT rowid AS id, email, name, username  FROM user',
    []
  );
}

module.exports = {
  getUsers
};
