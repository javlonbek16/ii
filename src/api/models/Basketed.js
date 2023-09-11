const { model, Schema } = require("mongoose");

const BrandSchema = new Schema({
    name: { type: String, required: true, },
}, { timestamps: true });



module.exports = model("Brand", BrandSchema);