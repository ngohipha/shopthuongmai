const express = require('express')
const router = express.Router();
const {createUser, loginUserCtrl, getallUser, getaUser} = require('../controller/userCtl')

router.post('/register' ,createUser)
router.post('/login' ,loginUserCtrl)
router.get('/all-users' , getallUser)
router.get('/:id' , getaUser)

module.exports = router;