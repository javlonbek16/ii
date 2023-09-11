const Admins = require("../../models/Admin");
const jwt = require("../../../utils/jwt");

exports.loginAdmin = async (req, res) => {
    const { username, password } = req.body;

    const admin = await Admins.findOne({ username });

    if (!admin)
        return res.status(403).json({ message: "Invalid username or password" });

    const token = jwt.sign({ id: admin._id, role: "admin" });
    req.verified = "admin"
    res.status(200).json({ token: token, role: "admin" });
  
};