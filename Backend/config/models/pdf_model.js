const mongoose = require("mongoose");
const Schema = mongoose.Schema
const pdfSchema = new Schema(
  {
    title: {
      type: String,
    },
    fileName: {
      type: String,
    },
    uplodedPerson: {
      type: String,
    },
    thumbnail:{
      type:String
    }
  },
  { timeseries: true }
);

module.exports=mongoose.model("PdfDetails", pdfSchema);
