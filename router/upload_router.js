// upload_router.js
const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "upload/");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  },
});
const upload = multer({ storage: storage });
// Upload single file
router
  .route("/")
  .get((req, res) => {
    res.sendFile(path.join(__dirname, "../views/upload.html"));
  })
  .post(upload.single("file"), (req, res) => {
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }
    res.send(`File uploaded successfully: ${req.file.path}`);
  });

// Upload multiple files
router.route("/multiple").get((req, res) => {
  res.sendFile(path.join(__dirname, "../views", "upload-multiple.html"));
});
module.exports = upload;
module.exports = router;
