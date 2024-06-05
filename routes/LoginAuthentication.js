// Require necessary modules . . . 
// const express = require('express');
// const bodyParser = require('body-parser');
// const mysql = require('mysql2');
// const cors = require('cors');
const port = 3000;
import  express  from "express";
import mysql from 'mysql2' ;
import cors from 'cors' ;
import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken' ; 

// Create connection to MySQL database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Som19@04',
  database: 'deadstockmanagementsystem'
});

// Connect to MySQL
db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL as id ' + db.threadId);
});

// Create Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser()) ; 

// // CORS middleware
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});

// app.use(cors(
//   {origin : "http://localhost:5173" ,
//   methods : ["POST , GET"] ,
//   credentials : true ,
// }
// ));


app.get("/" , (req,res) => {
    res.send(". . . Welcome to the Server of the DeadStockManagement System . . . ")
})

// const verifyUser() => {
//   const token = 
// }

// app.get("/" , (req,res) => {

// })
// Route for user authentication
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  
  // Query to check if user exists with provided credentials
  const sql = 'SELECT * FROM user WHERE user_id = ? AND password = ?';
  db.query(sql, [email, password], (err, results) => {
    if (err) {
      console.error('Error executing MySQL query: ' + err.stack);
      res.status(404).json({ error: 'Internal server error' });
      return;
    }

    if ((results.length === 0)) {
      // User not found or invalid credentials
      res.status(200).send('Please Enter the Valid Lab Id . . . ');
      
    } else {
      const user_id = results[0] ; 
      const token = jwt.sign({user_id} , "jsonwebtoken-secret-key" , {expiresIn : '1d'}) ; 
      res.cookie('token' , token) ;

      // User authenticated successfully
      res.status(200).send(`You are Successfully Logged in . . .  `);
    }
  });
});

// Start the server
const PORT = port || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
