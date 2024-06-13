const path = require("path");
const fs = require("fs").promises;
const pdfPoppler = require("pdf-poppler");

const generateThumbnail = async (pdfPath) => {
  try {
    const options = {
      format: "png",
      out_dir: path.dirname(pdfPath),
      out_prefix: path.basename(pdfPath, path.extname(pdfPath)),
      page: 1,
    };

    await pdfPoppler.convert(pdfPath, options);

//------------Overriding default naming convension----------------------------

    const possibleThumbnailPaths = [
      path.join(options.out_dir, `${options.out_prefix}-01.png`),
      path.join(options.out_dir, `${options.out_prefix}-1.png`),
    ];
    const desiredThumbnailPath = thumbnailName(pdfPath);

    for (const thumbnailPath of possibleThumbnailPaths) {
      if (await fileExists(thumbnailPath)) {
        await fs.rename(thumbnailPath, desiredThumbnailPath);
        return desiredThumbnailPath;
      }
    }

    throw new Error("Thumbnail file not found after conversion");
  } catch (error) {
    console.error("Error generating thumbnail:", error);
    throw error;
  }
};

const fileExists = async (path) => {
  try {
    await fs.access(path);
    return true;
  } catch {
    return false;
  }
};

const thumbnailName = (pdfPath) => {
  return pdfPath.replace(".pdf", ".png");
};

module.exports = { generateThumbnail, thumbnailName }; 
