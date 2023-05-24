const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.post('/sendform', controller.create);
router.get('/list', controller.list);
router.post('/listfirstname', controller.listByFirstname);
router.post('/delete', controller.deletebyfirstname);

module.exports = router;