import React, { useContext, useEffect, useRef } from "react";
import { PdfContext } from "../contexts/PdfContext";
import useAuthContext from "../hooks/useAuthContext";
import PdfList from "./pdf_components/PdfList";

const Home = () => {
  const { user } = useAuthContext();
  const {
    setTitle,
    setPdfFile,
    fetchPdf,
    onSubmit,
    title,
    authError,
    inputValidation,
    sizeError,
  } = useContext(PdfContext);

  const formRef = useRef(null);

  useEffect(() => {
    if (user) {
      fetchPdf();
    }
  }, [fetchPdf, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(e);
    setTitle('')
    formRef.current.reset();
  };

  return (
    <div className="container mx-auto lg:p-12 p-4 bg-gradient-to-r from-sky-900 to-green-900 text-white text-center mt-16 w-full">
      <h1 className="text-4xl font-bold mb-8 text-gray-300">UPLOAD</h1>
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="mb-8 p-12 flex flex-col border-4 items-center bg-gray-400 rounded-lg shadow-md transform transition duration-300 hover:scale-105"

      >
        <div className="flex flex-col mb-4 w-full md:w-[500px]">
          <input
            id="title"
            type="text"
            placeholder="Title"
            className="px-3 py-2 w-full border-2 border-black rounded focus:outline-none text-black focus:ring focus:ring-indigo-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="flex mb-4 w-full md:w-[500px]">
          <input
            id="pdf"
            type="file"
            accept="application/pdf"
            className="p-2 w-full border-2 border-black rounded"
            onChange={(e) => setPdfFile(e.target.files[0])}
          />
        </div>
        {sizeError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            <span className="block sm:inline">{sizeError}</span>
          </div>
        )}
        {inputValidation && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            <span className="block sm:inline">{inputValidation}</span>
          </div>
        )}
        <button
          type="submit"
          className="bg-gradient-to-br from-blue-950 to bg-green-600 text-white hover:border-none px-4 py-2 rounded hover:bg-blue-600 transition duration-300 mt-2 mb-4 w-72 lg:w-[500px]"
        >
          Submit
        </button>
        {authError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            <span className="block sm:inline">{authError}</span>
          </div>
        )}
      </form>
      <PdfList />
    </div>
  );
};

export default Home;
