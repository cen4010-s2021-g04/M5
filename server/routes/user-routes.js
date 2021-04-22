/********************** IMPORTS **********************/
const express = require('express');
const userController = require('../controllers/user-controllers');

/********************** MAIN **********************/
const router = express.Router();

router.post('/user', userController.create);
router.post('/user/:id/contact', userController.addContact);
router.put('/user/:id', userController.update);
router.delete('/user/:id', userController.deleteUser);
router.get('/user/:id', userController.getUserByID);
router.get('/users', userController.getUsers);

module.exports = router;