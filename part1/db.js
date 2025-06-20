// initialise database
const mysql = require('mysql2');


const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'DogWalkService'
  }).promise();

  // connection.connect((err) => {
  //   if (err) throw err;
  //   console.log('✅ Connected to MySQL server!');
  // });

module.exports = db; // export db
