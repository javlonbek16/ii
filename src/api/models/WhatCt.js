const { model, Schema } = require("mongoose");

const WhatCtSchema = new Schema({
    name: { type: String, required: true, },
}, { timestamps: true });



module.exports = model("WhatCt", WhatCtSchema);