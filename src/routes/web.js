const express = require('express')
const router = express.Router();
const {getUsers, getUserById, createUser, changePass, deleteUser, getHomepage} = require('../controllers/homeController')


router.get('/', getHomepage)
router.get('/register', getUsers)
router.get('/register/:id', getUserById)
router.post('/register', createUser)
router.put('/register/:id', changePass)
router.delete('/register/:id', deleteUser)

  
module.exports = router;