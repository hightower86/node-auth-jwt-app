const router = require('express').Router();
const verify = require('./verifyToken');
const User = require('../model/User');

router.get('/', verify, (req, res) => {
  //res.send(req.user);

  User.findById(req.user._id, (err, doc) => {
    res.send(doc);
  });
  // await res.send(user)

  // res.json({
  //   posts: { title: 'My first post', description: 'Eniki beniki eli vareniki' }
  // });
});

module.exports = router;
