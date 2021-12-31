// 3. Controller - All methods to use model to interact with database
// 6. Bring in model
const Transaction = require('../models/Transaction');
// Now can use mongoose Model methods, they return promises -> use async await on all funcs

// Good design patterns

// @desc      Get all transactions
// @route     GET /api/v1/transactions
// @access    Public
exports.getTransactions = async (req, res, next) => {
    //res.send('GET transactions');
    try {
        const transactions = await Transaction.find();

        return res.status(200).json({ // up to me how I want to construct my APIs / what I want to return
            success: true,
            count: transactions.length,
            data: transactions
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        })
    }
}

// @desc      Add transaction
// @route     POST /api/v1/transactions
// @access    Public
exports.addTransaction = async (req, res, next) => {
    //res.send('POST transaction');

    // 7. Send data
    // When send data from a client, it comes in form of req.body.text,etc
    // To use req.body, we need to add the body parser middleware to server.js
    try {
        const { text, amount } = req.body;

        const transaction = await Transaction.create({text,amount});
    
        return res.status(201).json({
            success: true,
            data: transaction
        });
    } catch (err) {
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message);

            return res.status(400).json({ // 400 due to client error
                success: false,
                error: messages
            });
        } else {
            return res.status(500).json({
                success: false,
                error: 'Server Error'
            });
        }
    }
}

// @desc      Delete transaction
// @route     DELETE /api/v1/transactions/:id // need parameter of which one to delete
// @access    Public
exports.deleteTransaction = async (req, res, next) => {
    //res.send('DELETE transaction');

    // 8. Delete

    try {
        const transaction = await Transaction.findById(req.params.id); // some methods are called on the Model

        if (!transaction) {
            return res.status(404).json({
                success: false,
                error: 'Transaction not found'
            });
        }

        await transaction.remove(); // some methods are called on the resource in the db

        return res.status(200).json({
            success: true,
            data: {}
        });

    } catch (err) {
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message);

            return res.status(400).json({ // 400 due to client error
                success: false,
                error: messages
            });
        } else {
            return res.status(500).json({
                success: false,
                error: 'Server Error'
            });
        }
    }
}

// Once done, want to run not through postman but by client side
// 9. add a proxy in client/package.json to straight up type /api/

// 10. Then add scripts in backends package.json
// localhost5000 is our backend server - run with "nodemon server"
// localhost3000 is our react server - "npm start --prefix client"
// want to run both concurrently - combine both before with: "dev": "concurrently \"npm run server\" \"npm run client\""

// RN THIS IS FOR DEVELOPMENT
// once ready for PROD
// build out react app and point to the static index html

// Now integrate back end with front end
// Can use fetch API to make requests OR use axios

