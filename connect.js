const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database(':memory:');

function initDb() {
  db.serialize(createShoppingCentre);
  db.serialize(createAssets);
  db.serialize(createUsers);
  // db.close();
}

function getDbInstance() {
  return db;
}

function createShoppingCentre() {
  db.run('CREATE TABLE shopping_centre (centre_id TEXT, name TEXT, address TEXT, user_id TEXT)');

  const stmt = db.prepare('INSERT INTO shopping_centre VALUES (?, ?, ?, ?)');
  for (let i = 0; i < 10; i++) {
    stmt.run(`Centre ${i}`, `Name${i}`, `address${i}`, '1');
  }
  stmt.finalize();

  // db.each("SELECT rowid AS id, name, address, centre_id, user_id  FROM shopping_centre", function(err, row) {
  //     console.log(row.id + ": " + row.name+ ": " + row.address+ ": " + row.centre_id+ ": " + row.user_id);
  // });
}

function createAssets() {
  db.run(
    'CREATE TABLE asset (asset_id TEXT, centre_id TEXT, name TEXT, dimension TEXT, status TEXT, user_id TEXT)'
  );

  const stmt = db.prepare('INSERT INTO asset VALUES (?, ?, ?, ?, ?, ?)');
  for (let i = 0; i < 10; i++) {
    stmt.run(`asset${i}`, 'Centre 1', `Name${i}`, `dimension${i}`, 'Active', '1');
  }
  stmt.finalize();

  // db.each("SELECT rowid AS id, asset_id, centre_id, name, dimension, status, user_id  FROM asset", function(err, row) {
  //     console.log(row.id + ": " + row.centre_id + ": " + row.name+ ": " + row.dimension+ ": " + row.asset_id+ ": " + row.status+ ": " + row.user_id );
  // });
}

function createUsers() {
  db.run('CREATE TABLE user (user_id TEXT, name TEXT, username TEXT, password TEXT, email TEXT)');

  const stmt = db.prepare('INSERT INTO User VALUES (?, ?, ?, ?, ?)');
  for (let i = 0; i < 10; i++) {
    stmt.run(i, `Name${i}`, `userName${i}`, `password${i}`, `email${i}`);
  }
  stmt.finalize();

  // db.each("SELECT rowid AS id, user_id, name, username, password, email  FROM User", function(err, row) {
  //     console.log(row.id + ": " + row.name+ ": " + row.user_id+ ": " + row.username+ ": " + row.password+ ": " + row.email);
  // });
}

module.exports = { initDb, getDbInstance };
