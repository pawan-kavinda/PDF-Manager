// PdfPage.jsx
import {  useState } from 'react';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';


pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
  ).toString();

  function PdfPage(props) {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);   
    function onDocumentLoadSuccess({ numPages }) {
      setNumPages(numPages);
    }
  
    return (
      <div className='pdf-div'>
        <p>
          Page {pageNumber} of {numPages}
        </p>
        <Document file={props.url} onLoadSuccess={onDocumentLoadSuccess}>
        {Array.apply(null, Array(numPages))
          .map((x, i) => i + 1)
          .map((page) => {
            return (
              <Page
                pageNumber={page}
                renderTextLayer={false}
                renderAnnotationLayer={false}
              />
            );
          })}

        </Document>
        
      </div>
    );
  }
  export default PdfPage
  
