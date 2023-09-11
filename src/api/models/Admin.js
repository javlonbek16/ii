const { model, Schema } = require("mongoose");

const schema = new Schema(
    {
        username: {
            
            type: String,
            required: true,
            unique: true,
        },

        password: {
            type: String,
            required: true,
        },

        role: {
            type: String,
            required: true,
        },
    },

    {
        timestamps: true,
    }
);

module.exports = model("Admin", schema);
