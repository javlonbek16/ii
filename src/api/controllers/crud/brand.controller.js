const Joi = require("joi");
const Brand = require("../../models/Brand");

const getBrand = async (_, res) => {
    const data = await Brand.find();
    if (!data) {
        return res.status(404).json({
            message: "Brands not found"
        })
    }
    res.status(200).json(data);
}

const getBrandOne = async (req, res) => {
    const id = req.params.id
    const data = await Brand.findOne({ _id: id });

    if (!data) {
        return res.status(404).json({
            message: "Brand not found"
        })
    }
    res.status(200).json(data);
}
const postBrand = (req, res) => {

    const { name } = req.body;

    const schema = Joi.object({
        name: Joi.string().required(),
    })
    const { error } = schema.validate({
        name
    })
    
    if (error) {
        return res.status(400).json({ error: error.message });
    }
    
    Brand.create({ name })
    res.status(201).json({ message: "Successfully Brand Created" })
}

const putBrand = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const schema = Joi.object({
        name: Joi.string().required(),
    });
    const { error } = schema.validate({
        name
    })
    if (error) {
        return res.status(403).json({ error: error.message });
    }

    const editBrand = await Brand.findByIdAndUpdate(id, {
        $set: {
            name
        },
    })

    if (editBrand) {
        return res.status(200).json({ data: Brand, success: true });
    } else {
        res.status(404).json({ error: 'Brand not found' });
    }
}

const deleteBrand = async (req, res) => {
    const { id } = req.params;

    await Brand.findByIdAndDelete(id);

    res.status(200).json({ message: "Successfully Deleted Brand" });
};

module.exports = { getBrand, postBrand, putBrand, getBrandOne, deleteBrand }