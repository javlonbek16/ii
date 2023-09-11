const { model, Schema } = require("mongoose");


const productSchema = new Schema({
    title: { type: String, required: false, },
    cost: { type: Number, required: false, },
    photo: { type: String, required: false, },

    brand_id: {
        type: Schema.Types.ObjectId, ref: 'Brand',
        required: false,
    },
    
    category_id: {
        type: Schema.Types.ObjectId, ref: 'Category',
        required: false,
    },

    katalog_id: {
        type: Schema.Types.ObjectId, ref: 'Katolog',
        required: false,
    },
    status_id: {
        type: Schema.Types.ObjectId, ref: 'Status',
        required: false,
    },
    whatct_id: {
        type: Schema.Types.ObjectId, ref: 'WhatCt',
        required: false,
    },
    whysh_id: {
        type: Schema.Types.ObjectId, ref: 'WhySh',
        required: false,
    },
    merchantnames_id: {
        type: Schema.Types.ObjectId, ref: 'MerchantNames',
        required: false,
    },
    // owner_id: {
    //     type: Schema.Types.ObjectId, ref: 'User',
    //     required: false,
    // },
    soldornot: {
        type: Boolean,
        required: false,
        default: false
    }
}, { timestamps: true });



module.exports = model("Product", productSchema);