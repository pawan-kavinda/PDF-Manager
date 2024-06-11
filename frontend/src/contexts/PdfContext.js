import React, { createContext, useState } from "react";
import axios from "axios";
import useAuthContext from "../hooks/useAuthContext";


//-----------context-------------
export const PdfContext = createContext();

// ---------context provider-----------

const PdfContextProvider = ({ children }) => {
  
  const [title, setTitle] = useState("");
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfList, setPdfList] = useState([]);
  const [authError,setauthError] = useState('')
  const [sizeError,setSizeError] = useState('')
  const [inputValidation,setInputValidation] = useState('')
  const { user } = useAuthContext();

  const fetchPdf = async () => {
    try {
      const pdflist = await axios.get("http://localhost:3500/",{
        headers : {
          'Authorization' : `Bearer ${user.token}`
        }
      });
      if(user){
        setPdfList(pdflist.data);
      }
      
    } catch (error) {
      console.error("Error occured while fetching the files:", error.message);
    }
  };

  const onSubmit = async (e) => {
    setSizeError('')
    setInputValidation('')

    if(!user){
      setauthError("You need to be signed in for uploading a pdf")
      return
    }

    if (!pdfFile && !title) {
      setInputValidation("Please fill the both input fields");
      return;
    }


    const maxFileSize = 5 * 1024 * 1024; 
    
    if (pdfFile.size > maxFileSize) {
      setSizeError("You can not upload files larger than 5mb");
      return;
    } else {
      setSizeError(""); 
    }

    

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
             Authorization: `Bearer ${user.token}`
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
        authError,
        inputValidation,
        sizeError,
       
      }}
    >
      {children}
    </PdfContext.Provider>
  );
};

export default PdfContextProvider;
