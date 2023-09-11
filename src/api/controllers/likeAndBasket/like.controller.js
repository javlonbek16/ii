const Like = require('../../models/Like');

const addLike = async (req, res) => {
    const { user_id, product_id } = req.body;
    try {
        const existingLike = await Like.findOne({ user_id, product_id });

        if (existingLike) {
            return res.status(400).json({ error: 'User has already liked this product' });
        }

        const like = new Like({ user_id, product_id });
        await like.save();

        res.status(200).json({ message: 'Product liked successfully.' });

    } catch (error) {
        console.error('Error liking product:', error);
        res.status(500).json({ error: 'An error occurred while liking the product.' });
    }
};

const removeLike = async (req, res) => {
    const { user_id, product_id } = req.body;

    try {
        const like = await Like.findOneAndDelete({ user_id, product_id });

        if (!like) {
            return res.status(404).json({ error: 'Like not found' });
        }

        res.status(200).json({ message: 'Product like removed successfully.' });

    } catch (error) {
        console.error('Error removing product like:', error);
        res.status(500).json({ error: 'An error occurred while removing the product like.' });
    }
};


const getLikeProduct = async (req, res) => {

    try {
        const data = await Like.find().populate("product_id")

        
        if (!data) {
            return res.status(404).json({ error: 'Data not found' });
        }

        res.status(200).json({ data });

    } catch (error) {
        console.error('Error removing product like:', error);
        res.status(500).json({ error: 'An error occurred while removing the product like.' });
    }
};


module.exports = { addLike, removeLike, getLikeProduct };
