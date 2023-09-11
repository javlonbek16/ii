const { model, Schema } = require("mongoose");

const MerchantNameSchema = new Schema({
    name: { type: String, required: true, },
}, { timestamps: true });



module.exports = model("MerchantNames", MerchantNameSchema);