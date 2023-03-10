const mysql = require('mysql2/promise');
require('dotenv').config();

const connection = mysql.createPool({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  port: Number(process.env.MYSQLPORT),
  database: process.env.MYSQLDATABASE,
});

module.exports = connection;
