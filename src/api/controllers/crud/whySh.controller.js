const Joi = require("joi");
const WhySh = require("../../models/WhySh");

const getWhySh = async (_, res) => {
    const data = await WhySh.find();
    if (!data) {
        return res.status(404).json({
            message: "WhyShs not found"
        })
    }
    res.status(200).json(data);
}

const getWhyShOne = async (req, res) => {
    const id = req.params.id
    const data = await WhySh.findOne({ _id: id });

    if (!data) {
        return res.status(404).json({
            message: "WhySh not found"
        })
    }
    res.status(200).json(data);
}
const postWhySh = (req, res) => {

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
    WhySh.create({ name })
    res.status(201).json({ message: "Successfully WhySh Created" })
}

const putWhySh = async (req, res) => {
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

    const editWhySh = await WhySh.findByIdAndUpdate(id, {
        $set: {
            name
        },
    })

    if (editWhySh) {
        return res.status(200).json({ data: WhySh, success: true });
    } else {
        res.status(404).json({ error: 'WhySh not found' });
    }
}

const deleteWhySh = async (req, res) => {
    const { id } = req.params;
    await WhySh.findByIdAndDelete(id);
    res.status(200).json({ message: "Successfully Deleted WhySh" });
};

module.exports = { getWhySh, postWhySh, putWhySh, getWhyShOne, deleteWhySh };


