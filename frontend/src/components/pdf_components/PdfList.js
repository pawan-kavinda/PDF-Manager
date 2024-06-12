import React, { useContext } from 'react';
import { PdfContext } from '../../contexts/PdfContext';
import { Link } from 'react-router-dom';

const PdfList = () => {
  const { pdfList } = useContext(PdfContext);

  return (
    <div className="mx-auto">
      <h2 className="text-4xl font-bold mb-2">COLLECTION</h2>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 pt-6">
        {pdfList.map((val) => (
          <div
            key={val._id}
            className="border rounded-lg shadow-lg bg-white transition duration-300 ease-in-out transform hover:scale-105"
          >
            <span className="block font-semibold mt-2 text-black">{val.title}</span>
            <Link
              to={`/pdf-viewer?pdfUrl=${encodeURIComponent(`http://localhost:3500/uploads/${val.fileName}`)}`}
              className="block"
            >
              <img
                src={
                  `http://localhost:3500/${val.thumbnail.replace(
                    ".png",
                    ""
                  )}` + `-1.png`
                }
                alt={val.title}
                className="w-full lg:h-[300px] md:h-[250px] rounded"
              />
              
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PdfList;

