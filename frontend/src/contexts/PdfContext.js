import React, { createContext, useState } from "react";
import axios from "axios";
import useAuthContext from "../hooks/useAuthContext";
import { toast } from "react-toastify";

//-----------context-------------
export const PdfContext = createContext();

// ---------context provider-----------

const PdfContextProvider = ({ children }) => {
  const [title, setTitle] = useState("");
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfList, setPdfList] = useState([]);
  const [authError, setAuthError] = useState('');
  const [sizeError, setSizeError] = useState('');
  const [inputValidation, setInputValidation] = useState('');
  const { user } = useAuthContext();


// -----------Fetch operation------------------

  const fetchPdf = async () => {
    try {
      const pdflist = await axios.get("http://localhost:3500/", {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
      if (user) {
        setPdfList(pdflist.data);
      }
    } catch (error) {
      console.error("Error occurred while fetching the files:", error.message);
    }
  };

  // ------------Upload PDF event-------------------

  const onSubmit = async (e) => {
    e.preventDefault();
    setSizeError('');
    setInputValidation('');
    setAuthError('');

    // -------error handling---------
    
    if (!user) {
      setAuthError("You need to be signed in to upload a PDF");
      return;
    }

    if (!pdfFile || !title) {
      setInputValidation("Please fill in both input fields");
      return;
    }

    const maxFileSize = 5 * 1024 * 1024; 
    if (pdfFile.size > maxFileSize) {
      setSizeError("You cannot upload files larger than 5MB");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("pdf", pdfFile);
    formData.append("uploadedPerson", user.name);

    try {
      const result = await axios.post(
        "http://localhost:3500/upload/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user.token}`
          },
        }
      );
      toast.success("Successfully uploaded");
      console.log("success", result.data);
      fetchPdf(); // Refresh the list after a successful upload
    } catch (error) {
      toast.error("Some error occurred");
      console.error(
        "Error uploading file",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <PdfContext.Provider
      value={{ title, pdfFile, pdfList, fetchPdf,onSubmit, setTitle, setPdfFile,  authError, inputValidation,  sizeError, }}
    >
      {children}
    </PdfContext.Provider>
  );
};

export default PdfContextProvider;
