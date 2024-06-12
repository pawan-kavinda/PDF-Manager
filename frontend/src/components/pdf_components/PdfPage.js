import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import 'tailwindcss/tailwind.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

function PdfPage() {
  const location = useLocation();
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pdfUrl, setPdfUrl] = useState(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const url = queryParams.get('pdfUrl');
    setPdfUrl(url);
  }, [location]);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const handlePreviousPage = () => {
    setPageNumber((prevPageNumber) => Math.max(prevPageNumber - 1, 1));
  };

  const handleNextPage = () => {
    setPageNumber((prevPageNumber) => Math.min(prevPageNumber + 1, numPages));
  };

  return (
    <div className="mx-auto max-w-4xl mt-20 p-4 bg-gray-500 shadow-lg rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <button 
          onClick={handlePreviousPage} 
          disabled={pageNumber <= 1}
          className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        >
          Previous
        </button>
        <p className="text-lg font-semibold">
          Page {pageNumber} of {numPages}
        </p>
        <button 
          onClick={handleNextPage} 
          disabled={pageNumber >= numPages}
          className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        >
          Next
        </button>
      </div>
      <div className="border p-4 bg-gray-100 rounded-lg flex justify-center items-center">
        {pdfUrl && (
          <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
            <Page
              pageNumber={pageNumber}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              className="flex justify-center"
            />
          </Document>
        )}
      </div>
      
    </div>
  );
}

export default PdfPage;
