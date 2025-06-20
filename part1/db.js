const mysql = require('mysql2');


const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    multipleStatements: true
  }).promise();

  // connection.connect((err) => {
  //   if (err) throw err;
  //   console.log('✅ Connected to MySQL server!');
  // });

module.exports = connection; // export db
