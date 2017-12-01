var mysql = require('mysql');

var dbConfig = {
   host: 'localhost',
   user: 'root',
   password: 'jungee135',
   port: 3306,
   database: 'member'
};

var pool = mysql.createPool(dbConfig);

module.exports = pool;

