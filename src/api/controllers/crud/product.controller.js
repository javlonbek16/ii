const Joi = require("joi");
const Product = require("../../models/Product");

const getProduct = async (_, res) => {
    const data = await Product.find().populate("brand_id")
        .populate("category_id").populate("katalog_id")
        .populate("status_id").populate("whatct_id").populate("whysh_id")
        .populate("merchantnames_id")

    if (!data) {
        return res.status(404).json({
            message: "Products not found"
        })
    }

    res.status(200).json(data);
}

const getProductOne = async (req, res) => {
    const id = req.params.id
    const data = await Product.findOne({ _id: id }).populate("brand_id")
        .populate("category_id").populate("katalog_id")
        .populate("status_id").populate("whatct_id").populate("whysh_id")
        .populate("merchantnames_id");

    if (!data) {
        return res.status(404).json({
            message: "Product not found"
        })
    }
    res.status(200).json(data);
}

const postProduct = (req, res) => {
    const {
        title, cost, brand_id, category_id, katalog_id,
        status_id, whatct_id, whysh_id, merchantnames_id,
        soldornot, photo
    } = req.body;




    const schema = Joi.object({
        title: Joi.string().required(),
        cost: Joi.number().required(),
        photo: Joi.string().required(),
        soldornot: Joi.boolean()
    });

    const { error } = schema.validate({
        title, cost, photo, soldornot
    });

    if (error) {
        return res.status(403).json({ error: error.message });
    }

    Product.create({
        title, cost, photo, brand_id, category_id, katalog_id,
        status_id, whatct_id, whysh_id, merchantnames_id,
        soldornot
    });

    res.status(201).json({ message: "Successfully Product Created" })
}

const putProduct = async (req, res) => {
    const { id } = req.params;
    const { title, cost, brand_id, category_id, katalog_id,
        status_id, whatct_id, whysh_id, merchantnames_id,
        soldornot, photo } = req.body;


    const schema = Joi.object({
        title: Joi.string().required(),
        cost: Joi.number().required(),
        photo: Joi.string().required(),
        soldornot: Joi.boolean()
    });
    const { error } = schema.validate({
        title, cost, photo, soldornot
    });
    if (error) {
        return res.status(403).json({ error: error.message });

    }

    const editProduct = await Product.findByIdAndUpdate(id, {
        $set: {
            title, cost, photo, brand_id, category_id, katalog_id,
            status_id, whatct_id, whysh_id, merchantnames_id,
            soldornot
        },
    })

    if (editProduct) {
        return res.status(200).json({ data: Product, success: true });
    } else {
        res.status(404).json({ error: 'Product not found' });
    }
}

const deleteProduct = async (req, res) => {
    const { id } = req.params;

    await Product.findByIdAndDelete(id);

    res.status(200).json({ message: "Successfully Deleted Product" });
};

module.exports = { getProduct, postProduct, putProduct, getProductOne, deleteProduct }