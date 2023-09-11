const { model, Schema } = require("mongoose");

const KatologSchema = new Schema({
    name: { type: String, required: true, },
}, { timestamps: true });



module.exports = model("Katolog", KatologSchema);