const User = require("../../models/User");

const verify = async (req, res) => {
    
    const { verificationCode } = req.body;

    try {
        const user = await User.findOne({ emailVerificationCode: verificationCode });

        if (!user) {
            return res.json({ message: 'error' });
        }

        user.isEmailVerified = true;
        user.emailVerificationCode = null; 

        await user.save();

        res.json({ message: 'success' });
    } catch (error) {
        console.error('Error verifying email:', error);
        res.json({ message: 'error' });
    }
};

module.exports = { verify };
