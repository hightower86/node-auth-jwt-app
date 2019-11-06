const router = require('express').Router();
const User = require('../model/User');

router.get('/register', (req, res) => res.send('Hello'));

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  const user = new User({
    name,
    email,
    password
  });
  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (error) {
    res.status(400).send(error);
  }
  res.send(user);
});

module.exports = router;
