const router = require('express').Router();
const Auth = require('./auth');

router.get('/signin', Auth.signin);
router.get('/signout', Auth.signout);
router.get('/callback', Auth.callback);

module.exports = router