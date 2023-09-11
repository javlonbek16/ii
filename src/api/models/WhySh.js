const { model, Schema } = require("mongoose");

const WhyShScheme = new Schema({
    name: { type: String, required: true, },
}, { timestamps: true });



module.exports = model("WhySh", WhyShScheme);