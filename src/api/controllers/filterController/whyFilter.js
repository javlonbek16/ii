const Product = require("../../models/Product");

exports.filterProductsByWhy = async (req, res) => {
    try {
        const { whySh_name } = req.query;
        if (!whySh_name) {
            return res.status(400).json({ error: 'Sale name is required in query parameters.' });
        }
        const products = await Product.find({})
            .populate('whysh_id', 'name')
            .exec();
        const filteredProducts = products.filter(product => product.whysh_id.name === whySh_name);
        res.json(filteredProducts);
    } catch (error) {
        console.error('Error filtering products:', error);
        res.status(500).json({ error: 'An error occurred while filtering products.' });
    }
};
