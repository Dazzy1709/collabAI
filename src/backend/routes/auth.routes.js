import Router from 'express';
import createUser from '../models/user.model.js';
import searchUser from '../models/user.model.js'


const router = Router();


//Avatar Url
const userProfile = `https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png`;


//Signup post route
router.post('/signup', async (req, res) => {
  const {username, password} = req.body;

  try {
    await createUser(username, password, userProfile);
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    res.status(500).json({error: err.message});
  }
  console.log('Request went through');
  
})

router.post('/login', async (req, res) => {
  const {username, password} = req.body;

  try {
    await searchUser(username, password)
  } catch (error) {
    res.status(500).json({error: err.message});
  }
})


export default router;



