require("dotenv/config")
const mongoose = require('mongoose');
const PORT = process.env.PORT;

const run = async (app) => {
    await mongoose.connect("mongodb://127.0.0.1:27017/exam");
    console.log("connected successfully");
    app.listen(PORT || 4000, () => {
        console.log(PORT);
    });
};

module.exports = run