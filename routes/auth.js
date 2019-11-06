const router = require('express').Router();
const User = require('../model/User');
const { registerValidation, loginValidation } = require('../validation');

router.get('/register', (req, res) => res.send('Hello'));

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  // LETS VALIDATE THE DATA BEFORE WI HANE A USER
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  // Checking if a user email exist in database
  const emailExists = await User.findOne({ email: email });
  if (emailExists)
    return res.status(400).send('This email already exist in database');

  // CTEATE A NEW USER
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
