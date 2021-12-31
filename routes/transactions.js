// 2. Create a router
const express = require('express');
const { route } = require('express/lib/router');
const router = express.Router(); // use the router
const { getTransactions, addTransaction, deleteTransaction } = require('../controller/transactions'); 
// ^ pull all in all transaction functions into this file by decoupling 

//router.get('/', (req, res) => res.send('Hello')); // test
router
    .route('/')
    .get(getTransactions)
    .post(addTransaction);

router
    .route('/:id') // route requires specifying an id at the end
    .delete(deleteTransaction);
// now can make these 3 requests

module.exports = router; // export router to be able to use it

