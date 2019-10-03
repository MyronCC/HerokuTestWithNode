const config = require('../config');
const mysql = require('mysql');

var pool  = mysql.createPool({
    connectionLimit : 10,
    queueLimit      : 100,
    waitForConnections: true,
    host            : config.host,
    user            : config.uname,
    password        : config.upass,
    port            : config.port,
    database        : config.db
  });

  module.exports = connect;