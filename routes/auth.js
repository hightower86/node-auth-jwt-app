const router = require('express').Router();
const User = require('../model/User');
const { registerValidation, loginValidation } = require('../validation');
const bcrypt = require('bcryptjs');

// REGISTER
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  // LETS VALIDATE THE DATA BEFORE WI HANE A USER
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Checking if a user email exist in database
  const emailExists = await User.findOne({ email: email });
  if (emailExists)
    return res.status(400).send('This email already exist in database');

  // Hash password before save
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  // CTEATE A NEW USER
  const user = new User({
    name,
    email,
    password: hashPassword
  });

  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (error) {
    res.status(400).send(error);
  }
  res.send(user);
});

// LOGIN
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // LETS VALIDATE THE DATA BEFORE WI HANE A USER
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Checking if a user email exist in database
  const user = await User.findOne({ email: email });
  if (!user) return res.status(400).send('Email or password is wrong');

  // Password is correct?
  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) return res.status(400).send('Email or password is wrong');

  res.status(200).send('You logged in! Congrats!');
});

module.exports = router;
