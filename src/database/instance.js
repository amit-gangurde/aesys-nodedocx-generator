const mysql = require('mysql');
const { DB_ADDRESS, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env;

const instance = () => {
  const db = mysql.createConnection({
    host: DB_ADDRESS,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE
  });

  return db;
};

module.exports = {
  getInstance: instance
};
