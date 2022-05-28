var mysql = require('mysql');
const http = require('http');
const fs = require('fs');
const { fsyncSync } = require('fs');


const hostname = '127.0.0.1';
const port = 3000;

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "12345678",
  database: "mydb"
});

var sqlQuery = "SELECT username, UserEmail FROM Users";

var htmlstring = '<html><head><title>Node.js MySQL Select</title></head><body><h1>User Table</h1>{${table}}</body></html>';


con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});


// set and return html table with query result
function getTable(result) {
    var table = '<table class="w-[82rem] text-2xl sm:text-md md:text-md text-left text-black"><tr><th>Username</th><th>Email</th></tr>';
    for (var i = 0; i < result.length; i++) {
        table += '<tr><td>' + result[i].username + '</td><td>' + '  ' + result[i].UserEmail + '</td></tr>';
    }
    table += '</table>';
    return table;
}

// create server to show table
const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    // display query result on host
    con.query(sqlQuery, function (err, result) {
        if (err) throw err;
        //show result in table format
        res.end(htmlstring.replace('{${table}}', getTable(result)));
    });
});

fs.readFile('index.html', function (err, html) {
    if (err) {
        throw err;
    }
    server.on('request', (req, res) => {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(html);
        const server = http.createServer((req, res) => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'text/html');
          // display query result on host
          con.query(sqlQuery, function (err, result) {
              if (err) throw err;
              //show result in table format
              res.end(htmlstring.replace('{${table}}', getTable(result)));
          });
      });
    });
  });



server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});