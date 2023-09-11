const Product = require("../../models/Product");

exports.filterProductsByKatalogName = async (req, res) => {
    try {
        const { katalog_name } = req.query;
        if (!katalog_name) {
            return res.status(400).json({ error: 'Katalog name is required in query parameters.' });
        }
        const products = await Product.find({})
            .populate('katalog_id', 'name')
            .exec();
        const filteredProducts = products.filter(product => product.katalog_id.name === katalog_name);
        res.json(filteredProducts);
    } catch (error) {
        console.error('Error filtering products:', error);
        res.status(500).json({ error: 'An error occurred while filtering products.' });
    }
};
