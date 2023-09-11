const Joi = require("joi");
const Status = require("../../models/Status");

const getStatus = async (_, res) => {
    const data = await Status.find();
    if (!data) {
        return res.status(404).json({
            message: "Statuss not found"
        })
    }
    res.status(200).json(data);
}

const getStatusOne = async (req, res) => {
    const id = req.params.id
    const data = await Status.findOne({ _id: id });

    if (!data) {
        return res.status(404).json({
            message: "Status not found"
        })
    }
    res.status(200).json(data);
}

const postStatus = (req, res) => {

    const { name } = req.body;

    const schema = Joi.object({
        name: Joi.number().required(),
    })

    const { error } = schema.validate({
        name
    })

    if (error) {
        return res.status(403).json({ error: error.message });
    }

    Status.create({ name })
    res.status(201).json({ message: "Successfully Status Created" })
}

const putStatus = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const schema = Joi.object({
        name: Joi.number().required(),
    });
    const { error } = schema.validate({
        name
    })
    if (error) {
        return res.status(403).json({ error: error.message });
    }

    const editStatus = await Status.findByIdAndUpdate(id, {
        $set: {
            name
        },
    })

    if (editStatus) {
        return res.status(200).json({ data: Status, success: true });
    } else {
        res.status(404).json({ error: 'Status not found' });
    }
}

const deleteStatus = async (req, res) => {
    const { id } = req.params;

    await Status.findByIdAndDelete(id);

    res.status(200).json({ message: "Successfully Deleted Status" });
};

module.exports = { getStatus, postStatus, putStatus, getStatusOne, deleteStatus }