import React ,{useContext,useState} from 'react'
import { PdfContext } from '../../contexts/PdfContext';
import PdfPage from './PdfPage';
const PdfList = () => {
    const {pdfList} = useContext(PdfContext);
    const [onClickPdf,setOnClickPdf] = useState('')
    const handleClickPdf = (pdfUrl) => {        
        setOnClickPdf(pdfUrl);
    };


  return (
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
                // href={`http://localhost:3500/uploads/${val.fileName}`}
                // href={`http://localhost:3500/pdf`}
                onClick={() => handleClickPdf(`http://localhost:3500/uploads/${val.fileName}`)}                               
                target="_blank"
                rel="noopener noreferrer"
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

                <span className="block text-sm text-gray-500 font-bold p-3">{`Uploaded By : ${val.uplodedPerson}`}</span>
              </a>
            </div>
          ))}
        </div>
        <PdfPage url={onClickPdf}/>
      </div>
  )
}

export default PdfList