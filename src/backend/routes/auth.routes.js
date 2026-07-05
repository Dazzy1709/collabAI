import Router from 'express';
import { searchUser, createUser } from '../models/user.model.js';
import authenticate from '../middleware/auth.middleware.js';

const router = Router();

//Avatar Url
const userProfile = `https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png`;


//The Route that handles the signups
router.post('/signup', async (req, res) => {
  const {username, password} = req.body;

  try {
    await createUser(username, password, userProfile);
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    res.status(400).json({error: err.message});
  }
  console.log('Request went through');
  
})

//The route that handles the Logins
router.post('/login', async (req, res) => {
  const {username, password} = req.body;

  try {
    const userResponse = await searchUser(username, password);
    res.json(userResponse);
  } catch (err) {
    res.status(400).json({error: err.message});
  }
})


router.get('/home', authenticate, async (req, res) => {
  
  try {
    const result = await pool.query(
      'SELECT id, username, avatar_url FROM users WHERE id = $1',
      [req.user.id]  // <- came from the token, thanks to the middleware
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
})

export default router;



