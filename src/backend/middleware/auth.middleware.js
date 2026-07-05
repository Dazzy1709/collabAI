import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config()

function authenticate (res,req, next) {
  const token = req.header.authenticate

  if(!token) {
    res.status(401).json({error: 'no Token'})
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = verified; 
    next();
  } catch (error) {
    return res.status(400).json({ error: 'Invalid token' });
  }
};


export default authenticate;
