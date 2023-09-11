const { v4: uuid } = require("uuid");
const path = require("path");
const fileUpload = (req, res, next) => {

    if (req.files) {
        const image = req.files?.image;

        if (!image) return res.status(400).json({ message: "Image not found" });

        const extraname = path.extname(image.name);
        const imageName = `${uuid()}${extraname}`;

        image.mv(`${process.cwd()}/uploads/${imageName}`);
        req.imageName = imageName;
        next();
    }
};

module.exports = fileUpload;
