import React, { createContext, useState, useRef } from "react";
import axios from "axios";
import useAuthContext from "../hooks/useAuthContext";

//-----------context-------------
export const PdfContext = createContext();

// ---------context provider-----------

const PdfContextProvider = ({ children }) => {
  const [title, setTitle] = useState("");
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfList, setPdfList] = useState([]);
  const { user } = useAuthContext();

  const fetchPdf = async () => {
    try {
      const pdflist = await axios.get("http://localhost:3500/");
      setPdfList(pdflist.data);
    } catch (error) {
      console.error("Error occured while fetching the files:", error.message);
    }
  };

  const onSubmit = async (e) => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("pdf", pdfFile);
    formData.append("uplodedPerson", user.name);

    try {
      const result = await axios.post(
        "http://localhost:3500/upload/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Successfully updated");

      console.log("success", result.data);
    } catch (error) {
      alert("Some error occured");

      console.error(
        "Error uploading file",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <PdfContext.Provider
      value={{
        title,
        pdfFile,
        pdfList,
        fetchPdf,
        onSubmit,
        setTitle,
        setPdfFile,
      }}
    >
      {children}
    </PdfContext.Provider>
  );
};

export default PdfContextProvider;
