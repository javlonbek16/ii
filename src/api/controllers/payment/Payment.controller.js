const Joi = require("joi");
const User = require("../../models/User");
const stripe = require("stripe");

const stripeService = new stripe(
    "sk_test_51NXatrJinvaPgVXfZUk09leKGOFFydKOi17Micbt1Yy1c4rHpgP1SPPAGZCPxeYuLSc4Gp4vuAFM59s6l5DbvwA700588QE9kX",
    { apiVersion: "2022-11-15" }
);


const AddMoney = async (req, res) => {
    try {
        const { amount, id, user_id } = req.body;

        const verifiedUser = await User.findOne({ user_id });

        const payment = await stripeService.paymentIntents.create({
            amount,
            currency: "USD",
            description: "Payment",
            payment_method: id,
            confirm: true,
        });


        const schema = Joi.object({
            amount: Joi.number().required(),
            user_id: Joi.number().required(),
        });

        const { error } = schema.validate({ amount, user_id });
        if (error) {
            return res.status(403).json({ error: error.message });
        }


        verifiedUser.wallet += amount

        await verifiedUser.save();

        res
            .status(200)
            .json({ message: `$${amount} are successfully added to your account` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const PayMoney = async (req, res) => {
    try {
        const { amount, user_id } = req.body;

        const user = await User.findOne({ user_id });



        if (!user) return { message: 'User not found!' };

        if (user.wallet < amount)
            return {
                message: `You don't have enough funds in your wallet. Please fill your wallet. Your balance: ${user.wallet}`,
            };

        const newBalance = user.wallet - amount;


        await User.findByIdAndUpdate(user_id, {
            $set: {
                wallet: newBalance
            },
        })

        return { message: 'The payment was made successfully' };
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { AddMoney }