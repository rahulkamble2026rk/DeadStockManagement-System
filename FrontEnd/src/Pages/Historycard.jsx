import React, { useState } from 'react';
import Video from '../assets/video3.mp4';
import LabOptions from './LabOptions' ;
import OptionRange from './OptionRange' ;
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Historycard() {
  let responseFromServer  ;
  const navigate = useNavigate();

  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedLab, setSelectedLab] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedProblem, setSelectedProblem] = useState('');
  const [tablesData, setTablesData] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [temp_cat_id , setTempCatId] = useState() ; 

  const handleDepartmentChange = (event) => {
    setSelectedDepartment(event.target.value);
    setSelectedLab('');
    setSelectedProduct('');
    setSelectedOption('');
    setTablesData([]);
  };

  const handleLabChange = (event) => {
    setSelectedLab(event.target.value);
    setSelectedProduct('');
    setSelectedOption('');
    setTablesData([]);
  };

  const handleProductChange = (event) => {
    setSelectedProduct(event.target.value);
    setSelectedOption('');
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleProblemChange = (event) => {
    setSelectedProblem(event.target.value);
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    
    let defaultDescription = '';
    let defaultSupplierInfo = '';
    let cat_id ; 

    if(selectedProduct === 'Computer'){
      cat_id = 1 ; 
      setTempCatId(cat_id) ; 
    }
    else if (selectedProduct === 'Printers'){
      cat_id = 2 ; 
      setTempCatId(cat_id) ; 
    }
    else{
      cat_id = 3 ; 
      setTempCatId(cat_id) ; 
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
    
    const currentDate = new Date().toISOString().split('T')[0];

    const uniqueId = `${selectedLab}/${selectedProduct === 'Computer' ? '01' : selectedProduct === 'Printers' ? '02' : '03'}/${selectedOption}`;
    const newData = {
      product: selectedProduct,
      serialNumber: selectedOption,
      uniqueId,
      problemDescription: selectedProblem,
      supplierDate: currentDate,
      purchaseDate: currentDate, // Changed column name here
      expiryDate: currentDate, // Changed column name here
      remedies: defaultSupplierInfo,
    };
    
    if (formSubmitted && editIndex !== null) {
      const updatedData = [...tablesData];
      updatedData[editIndex] = { ...editedData };
      setTablesData(updatedData);
      setEditIndex(null);
      setEditedData({});
    } else {
      setTablesData([...tablesData, newData]);
    }
    
    setSelectedProduct('');
    setSelectedOption('');
    setSelectedProblem('');
    setFormSubmitted(true);
  };

  const handleEdit = (index) => {
    const rowData = tablesData[index];
    setEditIndex(index);
    setEditedData(rowData);
  };

  const handleSave = async () => {

    try {
      const response = await axios.patch('http://localhost:8080/history_card', {

        lab_id: parseInt(selectedLab),
        unit_id: parseInt(selectedOption),
        cat_id: temp_cat_id ,
        new_description : tablesData[index].description ,
      });
      
      console.log('Row data updated:', response.data);
      setEditIndex(null);
    } catch (error) {
      console.error('Error updating row data:', error);
    }
  }

  const handleInputChange = (field, value) => {
    setEditedData({ ...editedData, [field]: value });
  };

  return ( 
    <div className="historycard-container relative w-full h-screen overflow-hidden">
      <video autoPlay loop muted className="background-video absolute top-0 left-0 w-full h-full object-cover">
        <source src={Video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="content relative z-10 p-8 text-black">
      

        {/* Form */}
        <div className="max-w-md mx-auto mt-1 p-4 bg-gray-100 rounded-lg shadow-lg">
        <button className='histButton bg-blue-500 text-white px-4 py-2 rounded-md mt-4' onClick={() => {
          
          navigate('/specific_history_card') ;
        }}>See All</button>
          
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
                {selectedOption && (
                  <div>
                    <label htmlFor="selectProblem" className="block text-gray-700 font-bold mb-2">Select Problem Description:</label>
                    <select id="selectProblem" value={selectedProblem} onChange={handleProblemChange} className="w-full p-2 border border-gray-400 rounded-md custom-select">
                      <option value="">Select Problem Description</option>
                      <option value="PM1: Dust Cleaning">PM1: Dust Cleaning</option>
                      <option value="PM2: Hardware Maintenance">PM2: Hardware Maintenance</option>
                      <option value="PM3: Item (Part) Replacement">PM3: Item (Part) Replacement</option>
                      <option value="PM4: Foss Application Installation: OS">PM4: Foss Application Installation: OS</option>
                      <option value="PM5: System Software Installation: (License copy only)">PM5: System Software Installation: (License copy only)</option>
                      <option value="PM6: Formatting System">PM6: Formatting System</option>
                      <option value="PM7: Device Functioning (for electronics and other devices)">PM7: Device Functioning (for electronics and other devices)</option>
                      <option value="PM8: Other">PM8: Other</option>
                    </select>
                  </div>
                )}
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4">{editIndex !== null ? 'Update' : 'Submit'}</button>
              </div>
            )}
          </form>
        </div>

        {/* Table */}
        {tablesData.length > 0 && (
          <div className="max-w-screen-xl mx-auto mt-4 p-4 bg-gray-100 rounded-lg shadow-lg" id="history-table">
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-4">Selected Product - {selectedProduct}</h2>
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
                      <th className="border px-4 py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tablesData.map((data, index) => (
                      <tr key={index} id={`row-${index}`}>
                        <td className="border px-4 py-2">{editIndex === index ? <input type="text" value={editedData.serialNumber || data.serialNumber} onChange={(e) => handleInputChange('serialNumber', e.target.value)} /> : data.serialNumber}</td>
                        <td className="border px-4 py-2">{editIndex === index ? <input type="text" value={editedData.uniqueId || data.uniqueId} onChange={(e) => handleInputChange('uniqueId', e.target.value)} /> : data.uniqueId}</td>
                        <td className="border px-4 py-2">{editIndex === index ? <input type="text" value={editedData.problemDescription || data.problemDescription} onChange={(e) => handleInputChange('problemDescription', e.target.value)} /> : data.problemDescription}</td>
                        <td className="border px-4 py-2">{editIndex === index ? <input type="text" value={editedData.purchaseDate || data.purchaseDate} onChange={(e) => handleInputChange('purchaseDate', e.target.value)} /> : data.purchaseDate}</td> {/* Changed column name here */}
                        <td className="border px-4 py-2">{editIndex === index ? <input type="text" value={editedData.expiryDate || data.expiryDate} onChange={(e) => handleInputChange('expiryDate', e.target.value)} /> : data.expiryDate}</td> {/* Changed column name here */}
                        <td className="border px-4 py-2">{editIndex === index ? <input type="text" value={editedData.remedies || data.remedies} onChange={(e) => handleInputChange('remedies', e.target.value)} /> : data.remedies}</td>
                        <td className="border px-4 py-2">
                          {editIndex === index ? <button onClick={() => handleSave()}>Save</button> : <button onClick={() => handleEdit(index)}>Edit</button>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
