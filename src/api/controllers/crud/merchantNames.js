const Joi = require("joi");
const MerchantNames = require("../../models/MerchantNames");

const getMerchantNames = async (_, res) => {
    const data = await MerchantNames.find();
    if (!data) {
        return res.status(404).json({
            message: "MerchantNamess not found"
        })
    }
    res.status(200).json(data);
}

const getMerchantNamesOne = async (req, res) => {
    const id = req.params.id
    const data = await MerchantNames.findOne({ _id: id });

    if (!data) {
        return res.status(404).json({
            message: "MerchantNames not found"
        })
    }
    res.status(200).json(data);
}
const postMerchantNames = (req, res) => {

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
    MerchantNames.create({ name })
    res.status(201).json({ message: "Successfully MerchantNames Created" })
}

const putMerchantNames = async (req, res) => {
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

    const editMerchantNames = await MerchantNames.findByIdAndUpdate(id, {
        $set: {
            name
        },
    })

    if (editMerchantNames) {
        return res.status(200).json({ data: MerchantNames, success: true });
    } else {
        res.status(404).json({ error: 'MerchantNames not found' });
    }
}

const deleteMerchantNames = async (req, res) => {
    const { id } = req.params;

    await MerchantNames.findByIdAndDelete(id);

    res.status(200).json({ message: "Successfully Deleted MerchantNames" });
};

module.exports = { getMerchantNames, postMerchantNames, putMerchantNames, getMerchantNamesOne, deleteMerchantNames }