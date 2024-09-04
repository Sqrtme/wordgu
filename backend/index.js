require('dotenv').config()
const pool = require('./database');
const jwt = require('jsonwebtoken');
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8081;

const corsConfig = {
  origin: 'http://localhost:8080',
  credentials: true,
};
app.use(cors(corsConfig));
app.use(express.json());
app.use(cookieParser());


const withAuth = function(req, res, next) {
  const token = req.cookies['token'];
  if (token === undefined) {
    res.status(401).end(JSON.stringify({ error: 'UNAUTHORIZED'}));
  } else {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      id: decoded.id,
      dictId: decoded.dictId,
    }
    next();
  } 
};

app.get('/test-route', withAuth, (req, res) => {
  pool.query('SELECT user_id from users', (error, results) => {
    if (error) {
      throw error;
    }
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(results));
  })
})


app.post('/registration', async (req, res) => {
  const { login, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const sqlSearch = "SELECT * FROM users WHERE login = ?"
  const search_query = mysql.format(sqlSearch, [login])
  const sqlInsert = "INSERT INTO users (login, password) VALUES (?, ?)"
  const insert_query = mysql.format(sqlInsert,[login, hashedPassword])
  pool.query(search_query, (error, results) => {
    if (error) {
      throw error;
    }
    if (results.length !== 0) {
      res.status(409).send(JSON.stringify({ error: 'User allready exists'}));
    } else {
      pool.query(insert_query, (err, result)=> {
        if (err) throw (err)
        res.status(200).end(JSON.stringify({ msg: 'User created'}));
      });
      }
  });
});


app.post('/login', async (req, res) => {
  const { login, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const sqlSearch = "SELECT * FROM users WHERE login = ?"
  const search_query = mysql.format(sqlSearch, [login, hashedPassword])
  pool.query(search_query, (error, results) => {
    if (error) {
      throw error;
    }
    if (results.length === 0) {
      res.status(400).send(JSON.stringify({ error: 'Wrong credentials'}));
    } else {
      bcrypt.compare(password, results[0].password, (err, result) => {
        if (err) {
          throw error;
        };
        if (result) {
          const days = 5;
          const maxAge = days * 24 * 60 * 60 * 1000;
          token = jwt.sign({ id: results[0].user_id, dictId: results[0].dict_id }, process.env.JWT_SECRET)
          res.cookie('token', token, { maxAge, httpOnly: true, path: '/' });
          res.status(200).end(JSON.stringify({ message: 'User authorized', status: 200, userId: results[0].user_id }));
        } else {
          res.status(400).send(JSON.stringify({ error: 'Wrong credentials'}));
        };
      });
    };
  });
});

app.post('/logout', withAuth,  async (req, res) => {
  res.clearCookie("token").send({ message: 'User logged out', status: 200 });
})

app.get('/words', withAuth, (req, res) => {
  const { dictId } = req.user;
  const sqlSearch = "SELECT words.word_id as id, de, ru FROM words INNER JOIN dictionary ON words.word_id = dictionary.word_id WHERE dictionary.dict_id = ?"
  const search_query = mysql.format(sqlSearch, [dictId])
  pool.query(search_query, (error, results) => {
    if (error) {
      throw error;
    }
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(results));
  })
})


app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
