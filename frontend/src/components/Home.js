import React, { useContext, useEffect, useRef, useState } from "react";
import { PdfContext } from "../contexts/PdfContext";
import useAuthContext from "../hooks/useAuthContext";
import PdfList from "./pdf_components/PdfList";


const Home = () => {
  const { user } = useAuthContext();
  const {
    setTitle,setPdfFile,fetchPdf,onSubmit,title, fileInputRef,authError,inputValidation,onClickPdf,setOnClickPdf,
    sizeError} = useContext(PdfContext);
 
  const formRef = useRef(null);

  useEffect(() => {
    if (user) {
      fetchPdf();
    }
  }, [fetchPdf, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(e);
    formRef.current.reset();
  };

  return (
    <div className="container mx-auto p-8 text-center">
      <h1 className="text-2xl font-bold">UPLOAD</h1>
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="mb-5 p-12 flex flex-col items-center"
      >
        <div className="flex flex-col mb-4 w-full md:w-[500px]">
          <input
            id="title"
            type="text"
            placeholder="Title"
            className="px-3 py-2 w-full border border-gray-300 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="flex mb-4 w-full md:w-[500px]">
          <input
            id="pdf"
            type="file"
            accept="application/pdf"
            className="p-2 w-full border border-gray-300 rounded"
            onChange={(e) => setPdfFile(e.target.files[0])}
            ref={fileInputRef}
          />
        </div>
        {sizeError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            <span className="block sm:inline">{sizeError}</span>
          </div>
        )}
        {inputValidation&& (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            <span className="block sm:inline">{inputValidation}</span>
          </div>
        )}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 mt-2 mb-4"
        >
          Submit
        </button>
        {authError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            <span className="block sm:inline">{authError}</span>
          </div>
        )}
      </form>
      <PdfList/>
    </div>
  );
};

export default Home;
