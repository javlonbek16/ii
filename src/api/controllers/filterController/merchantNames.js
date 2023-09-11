const Product = require("../../models/Product");


exports.filterProductsByMerchantName = async (req, res) => {

    try {
        const { merchant_name } = req.query;

        if (!merchant_name) {
            return res.status(400).json({ error: 'Merchant name is required in query parameters.' });
        }
        const products = await Product.find({})
            .populate('merchantnames_id', 'name')
            .exec();

        const filteredProducts = products.filter(product => product.merchantnames_id.name === merchant_name);

        res.json(filteredProducts);
    } catch (error) {
        console.error('Error filtering products:', error);
        res.status(500).json({ error: 'An error occurred while filtering products.' });
    }
};
