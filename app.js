const express = require('express');
const path = require('path'); // path lers us navigate the file system / folders
const hbs = require('hbs');

//require the sql connection file
const sql = require('./utils/sql.js');

// heroku assigns a port when it deploys via the process (environment variables - coming )
// locally this will run @ port 3000; remotely it'll run wherever heroku tells it to run
const port = process.env.PORT || 3000; // a double pipe || means "or"

const app = express();

app.use(express.static('public'));

// tell express to use the handlebars engine to render data
app.set('view engine', 'hbs');

// tell express to use the views folder to find its templates
app.set('views', __dirname + '/views');

app.get('/', (req, res) => {
  console.log('at the home route');
  // res.sendFile(path.join(__dirname + '/views/index.html'));
  
  res.render('home', { message: "hi there!", anothermessage: "this is easy!"});
  // this builds localhost:3000/views/index.html

})

app.get('/contact', (req, res) => {
  console.log('at the contact route');
  // res.sendFile(path.join(__dirname + '/views/contact.html'));

  res.render('contact', { message: "what is your name?"});
})

app.get('/users', (req, res) => {
  // console.log('at the users route');

  // try to get data from the database
  sql.getConnection((err, connection) => {
    // handle errors first
    if (err) {
      return console.log(err.message);
    }

    // it works! go and get data
    let query = `SELECT * FROM tbl_card`;

    sql.query(query, (err, rows) => {
      // release the connection because we're done with it
      connection.release();

      if (err) {
        return console.log(err.message);
      } 

      console.log(rows);

      res.render('user', rows[0]);

    })
  }
)
})

app.get('/portfolio', (req, res) => {
  console.log('at the portfolio route');
  res.send('on the portfolio page!');
})

app.listen(port, () => {
  console.log(`Server running at ${port}`);
});