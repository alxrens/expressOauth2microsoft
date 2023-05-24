const router = require('express').Router();

const user = require('./modules/userdata/router')
const auth = require('./middleware/router')

router.use('/user', user);
router.use('/auth', auth);


module.exports = router
