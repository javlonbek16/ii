const { model, Schema } = require("mongoose");

const StatusSchema = new Schema({
    name: { type: String, required: true, },
}, { timestamps: true });


module.exports = model("Status", StatusSchema);