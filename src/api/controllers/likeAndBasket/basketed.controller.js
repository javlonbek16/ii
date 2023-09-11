const Basket = require('../../models/basket');

const addbasket = async (req, res) => {
    const { user_id, product_id } = req.body;
    try {
        const existingbasket = await Basket.findOne({ user_id, product_id });

        if (existingbasket) {
            return res.status(400).json({ error: 'User has already basketd this product' });
        }
        const basket = new Basket({ user_id, product_id });
        await basket.save();
        res.status(200).json({ message: 'Product basketd successfully.' });
    } catch (error) {
        console.error('Error basketinng product:', error);
        res.status(500).json({ error: 'An error occurred while basketion the product.' });
    }
};

const removebasket = async (req, res) => {
    const { user_id, product_id } = req.body;

    try {
        const basket = await Basket.findOneAndDelete({ user_id, product_id });

        if (!basket) {
            return res.status(404).json({ error: 'basket not found' });
        }

        res.status(200).json({ message: 'Product basket removed successfully.' });

    } catch (error) {
        console.error('Error removing product basket:', error);
        res.status(500).json({ error: 'An error occurred while removing the product basket.' });
    }
};


const getbasketProduct = async (req, res) => {

    try {
        const data = await Basket.find().populate("product_id")
        if (!data) {
            return res.status(404).json({ error: 'Data not found' });
        }
        res.status(200).json({ data });

    } catch (error) {
        console.error('Error removing product basket:', error);
        res.status(500).json({ error: 'An error occurred while removing the product basket.' });
    }
};


module.exports = { addbasket, removebasket, getbasketProduct };
