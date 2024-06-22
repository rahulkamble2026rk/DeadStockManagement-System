import LabOptions from "./LabOptions"
import OptionRange from "./OptionRange"
import { useState } from "react";
import Video from '../assets/video3.mp4';
import axios from 'axios' ; 

function AllHistoryCards () {

  let responseFromServer ; 
    
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [selectedLab, setSelectedLab] = useState('');
    const [selectedProduct, setSelectedProduct] = useState('');
    const [selectedOption, setSelectedOption] = useState('');
    const [temp_cat_id , setTempCatId] = useState() ; 
    const [selectedSerialNumber , setSelectedSerialNumber ] = useState(0) ; 
    const [selectedUniqueId , setSelectedUniqueId] = useState() ; 
    const [selectedpbdesc , setSelectedPbDesc] = useState() ; 
    const [selectedReportDate , setSelectedReportDate] = useState() ; 
    const [selectedRemidies , setSelectedRemidies] = useState() ; 
    const [selectedRemedyDate , setSelectedRemedyDate] = useState() ; 


    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleProductChange = (event) => {
        setSelectedProduct(event.target.value);
        setSelectedOption('');
    };
    

    const handleLabChange = (event) => {
        setSelectedLab(event.target.value);
        setSelectedProduct('');
        setSelectedOption('');
        
    };

    const handleDepartmentChange = (event) => {
        setSelectedDepartment(event.target.value);
        setSelectedLab('');
        setSelectedProduct('');
        setSelectedOption('');
        
    };

    const handleSubmit = async () => {

      event.preventDefault(); // Prevent default form submission

      let defaultDescription = '';
      let defaultSupplierInfo = '';
      let cat_id ; 
  
      if(selectedProduct === 'Computer'){
        cat_id = 1 ; 
      }
      else if (selectedProduct === 'Printers'){
        cat_id = 2 ; 
      }
      else{
        cat_id = 3 ; 
      }

      switch (selectedProduct) {
        case 'Computer':
          defaultDescription = 'Specifications: Processor - Intel Core i5, RAM - 8GB, Storage - 512GB SSD';
          defaultSupplierInfo = "Not Yet given " ;
          break;
        case 'Printers':
          defaultDescription = 'Specifications: Printer Type - Laser, Printing Technology - Monochrome';
          defaultSupplierInfo = "Not Yet given " ;
          break;
        case 'LAN':
          defaultDescription = 'Specifications: Speed - 1Gbps, Ports - 8, Type - Managed';
          defaultSupplierInfo = "Not Yet given " ;
          break;
        default:
          break;
      }

      try {
        let lab_id = parseInt(selectedLab) ;
        let unit_id = parseInt(selectedOption) ;  
        const response = await axios.get(`http://localhost:8080/history_card/${lab_id}/${cat_id}/${unit_id}`);
        responseFromServer = response ; 
        console.log(responseFromServer.data[0]) ; 
       
        
        setSelectedSerialNumber(selectedOption) ; 
        setSelectedPbDesc(responseFromServer.data[0].problem_description) ; 
        setSelectedRemedyDate(responseFromServer.data[0].work_completion_date) ; 
        setSelectedRemidies(responseFromServer.data[0].remedy_taken) ; 
        setSelectedReportDate(responseFromServer.data[0].report_date) ; 
        setSelectedUniqueId(`${selectedLab}/${selectedProduct === 'Computer' ? '01' : selectedProduct === 'Printers' ? '02' : '03'}/${selectedOption}`) ; 
        
      } catch (err) {
        console.error('Error submitting form:', err);
      }

    }
    

    return <>
    <div className="historycard-container relative w-full h-screen overflow-hidden">
      <video autoPlay loop muted className="background-video absolute top-0 left-0 w-full h-full object-cover">
        <source src={Video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="content relative z-10 p-8 text-black">
        <div className="max-w-md mx-auto mt-1 p-4 bg-gray-100 rounded-lg shadow-lg">

          <form onSubmit={handleSubmit}>
        <div className="mb-1">
              <label htmlFor="selectDepartment" className="block text-gray-700 font-bold mb-2">Choose a Department:</label>
              <select id="selectDepartment" value={selectedDepartment} onChange={handleDepartmentChange} className="w-full p-2 border border-gray-400 rounded-md custom-select">
                <option value="">Select the Department</option>
                <option value="Computer Engineering">Computer Engineering</option>
                <option value="Information Technology">Information Technology</option>
                <option value="Electronics & Telecommunication">Electronics & Telecommunication</option>
              </select>
        </div>

        {selectedDepartment && (
              <div>
                <label htmlFor="selectLab" className="block text-gray-700 font-bold mb-2">Choose a Lab-ID:</label>
                <select id="selectLab" value={selectedLab} onChange={handleLabChange} className="w-full p-2 border border-gray-400 rounded-md custom-select">
                  <LabOptions selectedDepartment={selectedDepartment}></LabOptions>
                </select>
                {selectedLab && <p className="text-gray-600 mt-1">You selected Lab-ID: {selectedLab}</p>}
              </div>
            )}

            {selectedDepartment && selectedLab && (
              <div>
                <label htmlFor="selectProduct" className="block text-gray-700 font-bold mb-4">Choose a Product:</label>
                <select id="selectProduct" value={selectedProduct} onChange={handleProductChange} className="w-full p-2 border border-gray-400 rounded-md custom-select">
                  <option value="">Select the Product</option>
                  <option value="Computer">Computer</option>
                  <option value="Printers">Printers</option>
                  <option value="LAN">LAN</option>
                </select>
                {selectedProduct && (
                  <div>
                    <label htmlFor="selectOption" className="block text-gray-700 font-bold mb-2">Choose an Option:</label>
                    <select id="selectOption" value={selectedOption} onChange={handleOptionChange} className="w-full p-2 border border-gray-400 rounded-md custom-select">
                      <OptionRange selectedProduct={selectedProduct}></OptionRange>
                    </select>
                  </div>
                )}
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4">Submit</button>
            </div>)}

          </form>
        </div>

        
        {
        selectedSerialNumber !== 0 && 
        <div className="max-w-screen-xl mx-auto mt-4 p-4 bg-gray-100 rounded-lg shadow-lg" id="history-table">
        <div className="overflow-x-auto">
                <table className="w-full table-auto">
                  <thead>
                    <tr>
                      <th className="border px-4 py-2">Serial Number</th>
                      <th className="border px-4 py-2">Unique ID</th>
                      <th className="border px-4 py-2">Problem Description</th>
                      <th className="border px-4 py-2">Report Date</th> {/* Changed column name here */}
                      <th className="border px-4 py-2">Remedies Date</th> {/* Changed column name here */}
                      <th className="border px-4 py-2">Remedies</th>
                    </tr>
                  </thead>
                  <tbody>
                      <tr>
                        <td className="border px-4 py-2">{selectedSerialNumber}</td>
                        <td className="border px-4 py-2">{selectedUniqueId}</td>
                        <td className="border px-4 py-2">{selectedpbdesc}</td>
                        <td className="border px-4 py-2">{selectedReportDate}</td>
                        <td className="border px-4 py-2">{selectedRemedyDate}</td> 
                        <td className="border px-4 py-2">{selectedRemidies}</td>
                      </tr>
                    
                  </tbody>
                </table>
              </div>
        </div>
        }     
    
      </div>
    </div>
    

    </>
}

export default AllHistoryCards ; 