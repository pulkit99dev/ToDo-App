const express = require('express');
const router = express.Router();

const homeController = require('../controllers/home_controller');

// Defining the route or path for Homepage
router.get('/', homeController.home);

//Checking if the Router is working fine
console.log('router loaded');

module.exports = router;