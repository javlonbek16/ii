const Product = require("../../models/Product");


exports.filterProductsByCategoryName = async (req, res) => {

    try {
        const { category_name } = req.query;

        if (!category_name) {
            return res.status(400).json({ error: 'Category name is required in query parameters.' });
        }
        const products = await Product.find({})
            .populate('category_id', 'name')
            .exec();

        const filteredProducts = products.filter(product => product.category_id.name === category_name);
     
        res.json(filteredProducts);
    } catch (error) {
        console.error('Error filtering products:', error);
        res.status(500).json({ error: 'An error occurred while filtering products.' });
    }
};
