const mongoose = require('mongoose');

async function connectDb(url) {
    try {
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000, // Increase timeout to 5 seconds
        });
        console.log("Mongo connected successfully");
    } catch (err) {
        console.log("Error occurred", err);
    }
}

module.exports = {
    connectDb,
}
