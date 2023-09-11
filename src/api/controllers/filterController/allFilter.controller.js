const Product = require("../../models/Product");

const brandFilter = async (req, res) => {

    try {
        const body = req.query;
        const populatedFilters = [];

        if (body.brand) {
            populatedFilters["brand_id.name"] = body.brand;
            delete body.brand;
        }

        if (body.category) {
            populatedFilters["category_id.name"] = body.category;
            delete body.category;
        }

        if (body.katalog) {
            populatedFilters["katalog_id.name"] = body.katalog;
            delete body.katalog;
        }

        if (body.status) {
            populatedFilters["status_id.name"] = body.status;
            delete body.status;
        }

        if (body.whatct) {
            populatedFilters["whatct_id.name"] = body.whatct;
            delete body.whatct;
        }

        if (body.whysh) {
            populatedFilters["whysh_id.name"] = body.whysh;
            delete body.whysh;
        }

        if (body.merchantnames) {
            populatedFilters["merchantnames_id.name"] = body.merchantnames;
            delete body.merchantnames;
        }

        const data = await Product.find({ ...body })
            .populate("brand_id")
            .populate("category_id")
            .populate("katalog_id")
            .populate("status_id")
            .populate("whatct_id")
            .populate("whysh_id")
            .populate("merchantnames_id");


        if (!data || data.length === 0) {
            return res.status(404).json({
                message: "No products match the given filters"
            });
        }
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
module.exports = { brandFilter }