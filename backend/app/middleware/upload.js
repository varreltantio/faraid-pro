const util = require("util");
const multer = require("multer");
const maxSize = 2 * 1024 * 1024;

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, baseDirectory + "/images/");
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const name = file.originalname;
    const format = name.split('.').pop();

    const newName = `${timestamp}.${format}`;
    cb(null, newName);
  },
});

let uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize },
}).single("photo");

const upload = util.promisify(uploadFile);
module.exports = upload;
