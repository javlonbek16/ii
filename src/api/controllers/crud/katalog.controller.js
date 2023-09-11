const Joi = require("joi");
const Katalog = require("../../models/Katalog");

const getKatalog = async (_, res) => {
    const data = await Katalog.find();
    if (!data) {
        return res.status(404).json({
            message: "Katalogs not found"
        })
    }
    res.status(200).json(data);
}

const getKatalogOne = async (req, res) => {
    const id = req.params.id
    const data = await Katalog.findOne({ _id: id });

    if (!data) {
        return res.status(404).json({
            message: "Katalog not found"
        })
    }
    res.status(200).json(data);
}
const postKatalog = (req, res) => {

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
    Katalog.create({ name })
    res.status(201).json({ message: "Successfully Katalog Created" })
}

const putKatalog = async (req, res) => {
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

    const editKatalog = await Katalog.findByIdAndUpdate(id, {
        $set: {
            name
        },
    })

    if (editKatalog) {
        return res.status(200).json({ data: Katalog, success: true });
    } else {
        res.status(404).json({ error: 'Katalog not found' });
    }
}

const deleteKatalog = async (req, res) => {
    const { id } = req.params;

    await Katalog.findByIdAndDelete(id);

    res.status(200).json({ message: "Successfully Deleted Katalog" });
};

module.exports = { getKatalog, postKatalog, putKatalog, getKatalogOne, deleteKatalog }