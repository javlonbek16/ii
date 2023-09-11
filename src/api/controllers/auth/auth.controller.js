const User = require("../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
        user: "otaboevamadina@gmail.com",
        pass: "yzsqnpvcnrenhbwg",
    },
    secure: true,
});

const generateVerificationCode = () => {
    return Math.floor(100000 + Math.random() * 900000);
};

const register = async (req, res) => {
    try {
        const { username, password, email, phoneNumber } = req.body;

        const schema = Joi.object({
            username: Joi.string().required(),
            password: Joi.string().required(),
            email: Joi.string().email().required(),
            phoneNumber: Joi.string().required(),
        });


        const { error } = schema.validate({ username, password, email, phoneNumber });

        if (error) {
            res.status(400).json({ message: "validata eror" });
            return
        }
        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return res.status(401).json({ message: "Username already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);


        const verificationCode = generateVerificationCode();


        const newuser = await User.create({ username, password: hashedPassword, email, emailVerificationCode: verificationCode, isEmailVerified: false, phoneNumber });



        await transporter.sendMail({
            from: "nematovjavonlonbek16@gmail.com",
            to: email,
            subject: "Email Verification Code",
            text: `Your email verification code is: ${verificationCode}`,
        });

        const token = newuser._id

        res.status(201).json({ message: "ok", succes: true, data: token });

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};

const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({ message: "Invalid username or password" });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        const token = jwt.sign({ userId: user._id }, "your-secret-key", { expiresIn: "1h" });

        res.status(200).json({ message: "ok", data: token });
    } catch (error) {
        res.status(500).json({ message: "An error occurred" });
    }
};

module.exports = { register, login };
