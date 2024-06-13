const multer = require("multer");
const path = require("path");
const Pdf = require("../config/models/pdf_model");
const { generateThumbnail, thumbnailName } = require("./thumbnail_generator"); // Import both functions

// ---------storage configuration-------------------

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const filename = Date.now() + path.extname(file.originalname);
    cb(null, filename);
  },
});

const upload = multer({ storage: storage });

const uploadPdf = (req, res) => {
  upload.single("pdf")(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json({ error: err.message });
    } else if (err) {
      return res.status(500).json({ error: "An error occurred while uploading the file" });
    }

    if (!req.file) {
      return res.status(400).json({ error: "No PDF file uploaded" });
    }

    const pdfPath = path.join("uploads", req.file.filename);

//------------thumbnail------------------------------

    const thumbnailPath = thumbnailName(pdfPath); 

    try {
      await generateThumbnail(pdfPath); 
      console.log("Thumbnail generated and saved successfully");

      const pdf = new Pdf({
        title: req.body.title,
        fileName: req.file.filename,
        uploadedPerson: req.body.uploadedPerson,
        thumbnail: thumbnailPath,
      });

      await pdf.save();
      console.log("PDF saved to database successfully");

      res.status(200).json({ message: "PDF file uploaded successfully", pdf });
    } catch (error) {
      console.error("Error during PDF processing:", error);
      return res.status(500).json({ error: "An error occurred while processing the file" });
    }
  });
};

//--------------fetchPDF-----------------------------

const getPdfs = async (req, res) => {
  try {
    const pdfs = await Pdf.find();
    res.status(200).json(pdfs);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching the files" });
  }
};

module.exports = { uploadPdf, getPdfs };

