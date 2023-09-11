const Product = require("../../models/Product");

exports.filterProductsByBrandName = async (req, res) => {
    try {
        const { brand_name } = req.query;

        if (!brand_name) {
            return res.status(400).json({ error: 'Brand name is required in query parameters.' });
        }
        const products = await Product.find({})
            .populate('brand_id', 'name')
            .exec();
        const filteredProducts = products.filter(product => product.brand_id.name === brand_name);

        res.json(filteredProducts);
    } catch (error) {
        console.error('Error filtering products:', error);
        res.status(500).json({ error: 'An error occurred while filtering products.' });
    }
};
