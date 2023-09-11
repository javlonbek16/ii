const { model, Schema } = require("mongoose");

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true, },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: Number, required: false },
    photo: { type: String, required: false, },
    gender: { type: Boolean, required: false, },
    language: { type: Boolean, required: false, },
    longT: {
        type: String, required: false, default: "69.240562"
    },
    langT: { type: String, required: false, default: "41.311081" },

    // Product_id: {
    //     type: Schema.Types.ObjectId, ref: 'Product',
    //     required: false,
    //     default: "None"
    // },

    isEmailVerified: {
        type: Boolean, required: false,
    },

    emailVerificationCode: {
        type: String, required: false, default: 0
    },

    wallet: {
        type: Number, required: false, default: 0
    },

}, { timestamps: true });



module.exports = model("User", userSchema);