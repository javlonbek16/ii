const Product = require("../../models/Product");


exports.filterProductsByStatusName = async (req, res) => {

    try {

        const { status_name } = req.query;

        if (!status_name) {
            return res.status(400).json({ error: 'Status name is required in query parameters.' });
        }

        const products = await Product.find({})
            .populate('status_id', 'name')
            .exec();

        const filteredProducts = products.filter(product => product.status_id.name === status_name);

        res.status(200).json(filteredProducts);
    } catch (error) {
        console.error('Error filtering products:', error);
        res.status(500).json({ error: 'An error occurred while filtering products.' });
    }

};
