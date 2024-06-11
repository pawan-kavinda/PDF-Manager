import React, { useContext, useEffect, useRef } from "react";
import { PdfContext } from "../contexts/PdfContext";

const Home = () => {
  const {
    setTitle,
    setPdfFile,
    pdfList,
    fetchPdf,
    onSubmit,
    title,
    fileInputRef,
  } = useContext(PdfContext);
  const formRef = useRef(null);

  useEffect(() => {
    fetchPdf();
  }, [pdfList,fetchPdf]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(e);
    formRef.current.reset();
  };

  return (
    <div className="container mx-auto p-8 text-center">
      <h1 className="text-2xl font-bold">UPLOAD</h1>
      <form ref={formRef} onSubmit={handleSubmit} className="mb-5 p-12 flex flex-col items-center">
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
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 mt-2"
        >
          Submit
        </button>
      </form>
      <div className="mx-auto">
        <h2 className="text-xl font-bold mb-2">COLLECTION</h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 pt-6">
          {pdfList.map((val) => (
            <div
              key={val._id}
              className="border rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
            >
              <span className="block font-semibold mt-2">{val.title}</span>
              <a
                href={`http://localhost:3500/uploads/${val.fileName}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <img
                  src={`http://localhost:3500/${val.thumbnail.replace(".png", "")}` + `-1.png`}
                  alt={val.title}
                  className="w-full lg:h-[300px] md:h-[250px] rounded"
                />
                
                <span className="block text-sm text-gray-500 font-bold p-3">{`Uploaded By : ${val.uplodedPerson}`}</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  
};

export default Home;
