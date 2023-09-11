const Joi = require("joi");
const Category = require("../../models/Category");

const getCategory = async (_, res) => {
    const data = await Category.find();
    if (!data) {
        return res.status(404).json({
            message: "Categorys not found"
        })
    }
    res.status(200).json(data);
}

const getCategoryOne = async (req, res) => {
    const id = req.params.id
    const data = await Category.findOne({ _id: id });

    if (!data) {
        return res.status(404).json({
            message: "Category not found"
        })
    }
    res.status(200).json(data);
}
const postCategory = (req, res) => {

    const { name } = req.body;

    const schema = Joi.object({
        name: Joi.string().required(),
    })
    const { error } = schema.validate({
        name
    })
    if (error) {
        return res.status(403).json({ error: error.message });
    }
    Category.create({ name })
    res.status(201).json({ message: "Successfully Category Created" })
}

const putCategory = async (req, res) => {
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

    const editCategory = await Category.findByIdAndUpdate(id, {
        $set: {
            name
        },
    })

    if (editCategory) {
        return res.status(200).json({ data: Category, success: true });
    } else {
        res.status(404).json({ error: 'Category not found' });
    }
}

const deleteCategory = async (req, res) => {
    const { id } = req.params;

    await Category.findByIdAndDelete(id);

    res.status(200).json({ message: "Successfully Deleted Category" });
};

module.exports = { getCategory, postCategory, putCategory, getCategoryOne, deleteCategory }