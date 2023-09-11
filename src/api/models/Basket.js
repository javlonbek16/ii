const { model, Schema } = require("mongoose");

const BasketSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId, ref: 'User',
        required: false,
    },
    product_id: {
        type: Schema.Types.ObjectId, ref: 'Product',
        required: false,
    },

}, { timestamps: true });



module.exports = model("Basket", BasketSchema);