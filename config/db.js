// 4. Connect to our database using Mongoose

const mongoose = require('mongoose');

// mark function as async between connection to db with mongoose returns a promise
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold); // colors optional
        
    } catch(err) {
        console.log(`Error: ${err.message}`.red);
        process.exit(1); // application to exit with a failure
    }
}

module.exports = connectDB; // export this function to be used