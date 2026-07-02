import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../database/db.js';
import dotenv from 'dotenv';
dotenv.config();

//Creates a User in the POSTGRES DATABASE
async function createUser (username, password, avatar_url) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const result = await pool.query(
      'INSERT INTO users (username, password_hash, avatar_url) VALUES ($1, $2, $3) RETURNING *', 
      [username, hashedPassword, avatar_url]
    );
    return result.rows[0]; 
  } catch (err) {
    console.error(err);
  }
}

//Sign user in using the SearchProfile Function, bcrypt and creating a token witb JWT
async function searchUser (username, password) {

    //Search for the Username
    const result = await pool.query(
      'SELECT * FROM users WHERE username = $1' , [username]
      );
    if (result.rows.length === 0) {
      return result.status(400).json({error: 'User not found'})
    };

    //Compare the passwords for Auth
    const user = result.rows[0];
    comparePassword(password, user.password_hash);

    //JWT TOKEN
    createJwtToken(user);
}


//Utility functions
//Compares the typed password with the hashed password
function comparePassword (password, password_hash) {
  const isValid = bcrypt.compare(password, password_hash);
  if (!isValid) {
    return res.status(400).json({ error: 'Invalid password' });
    }
};

//Creates a JWT token with the user data
function createJwtToken (user) {
     const token = jwt.sign({id: user.id, username: user.username}, process.env.JWT_SECRET_KEY, {
      expiresIn: '1h'
    })
   return token;
};


export default {createUser, searchUser};