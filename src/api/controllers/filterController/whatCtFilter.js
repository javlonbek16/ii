const Product = require("../../models/Product");

exports.filterProductsByWhatCt = async (req, res) => {
    try {
        const { whatCt_name } = req.query;
        if (!whatCt_name) {
            return res.status(400).json({ error: 'What Category name is required in query parameters.' });
        }
        const products = await Product.find({})
            .populate('whatct_id', 'name')
            .exec();
        const filteredProducts = products.filter(product => product.whatct_id.name === whatCt_name);
        res.json(filteredProducts);
    } catch (error) {
        console.error('Error filtering products:', error);
        res.status(500).json({ error: 'An error occurred while filtering products.' });
    }
};
