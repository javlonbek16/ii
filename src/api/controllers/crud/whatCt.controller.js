const Joi = require("joi");
const WhatCt = require("../../models/WhatCt");

const getWhatCt = async (_, res) => {
    const data = await WhatCt.find();
    if (!data) {
        return res.WhatCt(404).json({
            message: "WhatCts not found"
        })
    }
    res.status(200).json(data);
}

const getWhatCtOne = async (req, res) => {
    const id = req.params.id
    const data = await WhatCt.findOne({ _id: id });

    if (!data) {
        return res.WhatCt(404).json({
            message: "WhatCt not found"
        })
    }
    res.status(200).json(data);
}
const postWhatCt = (req, res) => {

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
    WhatCt.create({ name })
    res.status(201).json({ message: "Successfully WhatCt Created" })
}

const putWhatCt = async (req, res) => {
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

    const editWhatCt = await WhatCt.findByIdAndUpdate(id, {
        $set: {
            name
        },
    })

    if (editWhatCt) {
        return res.status(200).json({ data: WhatCt, success: true });
    } else {
        res.status(404).json({ error: 'WhatCt not found' });
    }
}

const deleteWhatCt = async (req, res) => {
    const { id } = req.params;

    await WhatCt.findByIdAndDelete(id);

    res.status(200).json({ message: "Successfully Deleted WhatCt" });
};

module.exports = { getWhatCt, postWhatCt, putWhatCt, getWhatCtOne, deleteWhatCt }