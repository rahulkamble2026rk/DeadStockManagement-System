import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import OptionRange from './OptionRange';
import LabOptions from './LabOptions'

function Check() {
  let responseFromServer  ;
  
  
  //defining the useStates for the different options ...
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedLab, setSelectedLab] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [tablesData, setTablesData] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [temp_cat_id , setTempCatId] = useState() ;  
  const navigate = useNavigate();
  
  //Following are  different handle functions for handling the events ...
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
    setTablesData([]); // Reset tablesData when lab changes
  };

  const handleProductChange = (event) => {
    setSelectedProduct(event.target.value);
    setSelectedOption('');
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  //Following is the Submit method for handling the submit ...
  const handleSubmit = async (event) => {
    event.preventDefault()
    //This is category Id . . . 
    let cat_id ; 

    let defaultDescription = '';
    let defaultPurchasePrice = '';
    let defaultTax = '';
    let defaultSupplierInfo = '';
    
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

    try {
      const response = await axios.post('http://localhost:8080/deadstock1', {
        lab_id: parseInt(selectedLab),
        cat_id: cat_id,
        unit_id: parseInt(selectedOption)
      });

      responseFromServer = response ; 
      
      console.log(responseFromServer.data);

      // Handle response (e.g., show success message)
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle error (e.g., show error message)
    }
  
    
    switch (selectedProduct) {
      case 'Computer':
        defaultDescription = "Not Given Yet" ; 
        defaultPurchasePrice = "Not Given Yet";
        defaultTax = "Not Given Yet";
        defaultSupplierInfo = "Not Given Yet";
        break;
      case 'Printers':
        defaultDescription = "Not Given Yet";
        defaultPurchasePrice = 'Not Given Yet';
        defaultTax = "Not Given Yet";
        defaultSupplierInfo = "Not Given Yet"
        break;
      case 'LAN':
        defaultDescription = "Not Given Yet";
        defaultPurchasePrice = "Not Given Yet";
        defaultTax = "Not Given Yet";
        defaultSupplierInfo ="Not Given Yet"
        break;
      default:
        break;
    }
    
    const uniqueId = `${selectedLab}/${selectedProduct === 'Computer' ? '01' : selectedProduct === 'Printers' ? '02' : '03'}/${selectedOption}`;

    const newData = {
      product: selectedProduct,
      serialNumber: selectedOption,
      uniqueId,
      description: responseFromServer.data.description,
      supplierDate: '2024-04-07',
      purchasePrice: responseFromServer.data.unit_price,
      tax: responseFromServer.data.tax , // Tax format remains the same
      purchaseDate: responseFromServer.data.purchase_date,
      expiryDate: responseFromServer.data.Warranty + 'years',
      supplierInformation: responseFromServer.data.shop_name + " " +  responseFromServer.data.address , // Changed to supplier information
    };
    
    if (formSubmitted && editIndex !== null) {
      const updatedData = [...tablesData];
      updatedData[editIndex] = newData;
      setTablesData(updatedData);
    } else {
      setTablesData([...tablesData, newData]);
    }
    
    setSelectedProduct('');
    setSelectedOption('');
    setFormSubmitted(true);
    setEditIndex(null);
  };

  const handleEdit = (index) => {
    const rowData = tablesData[index];
    setSelectedProduct(rowData.product);
    setSelectedOption(rowData.serialNumber); 
    
    
    setEditIndex(index);
  };
  
  const  handleSave = async (index) => {
    console.log(temp_cat_id) ; 

    try {
      const response = await axios.patch('http://localhost:8080/deadstock', {

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

  const handleInputChange = (index, field, value) => {
    const updatedData = [...tablesData];
    updatedData[index][field] = value;
    setTablesData(updatedData);
  };


  return (
    <>
      <div className="max-w-md mx-auto mt-8 p-4 bg-gray-100 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
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
                <LabOptions selectedDepartment = {selectedDepartment}></LabOptions>
              </select>
              {selectedLab && <p className="text-gray-600 mt-2">You selected Lab-ID: {selectedLab}</p>}
            </div>
          )}

          {selectedDepartment && selectedLab && (
            <div>
              <label htmlFor="selectProduct" className="block text-gray-700 font-bold mb-2">Choose a Product:</label>
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
                    <OptionRange selectedProduct = {selectedProduct}></OptionRange>
                  </select>
                </div>
              )}
              {selectedOption && <p className="text-gray-600 mt-2">You selected Option: {selectedOption}</p>}
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4">{editIndex !== null ? 'Update' : 'Submit'}</button>
            </div>
          )}
        </form>
      </div>

      {tablesData.length > 0 && (
        <div className="max-w-screen-xl mx-auto mt-8 p-4 bg-gray-100 rounded-lg shadow-lg">
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Selected Product - {selectedProduct}</h2> {/* Updated to show selectedProduct instead of tablesData[0].product */}
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr>
                    <th className="border px-4 py-2">Serial Number</th>
                    <th className="border px-4 py-2">Unique ID</th>
                    <th className="border px-4 py-2">Description</th>
                    <th className="border px-4 py-2">Supplier Information</th>
                    <th className="border px-4 py-2">Purchase Price</th>
                    <th className="border px-4 py-2">Tax (%)</th>
                    <th className="border px-4 py-2">Purchase Date</th>
                    <th className="border px-4 py-2">Warranty</th>
                    <th className="border px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tablesData.map((data, index) => (
                    <tr key={index}>
                      <td className="border px-4 py-2">{editIndex === index ? <input type="text" value={data.serialNumber} onChange={(e) => handleInputChange(index, 'serialNumber', e.target.value)} /> : data.serialNumber}</td>
                      <td className="border px-4 py-2">{editIndex === index ? <input type="text" value={data.uniqueId} onChange={(e) => handleInputChange(index, 'uniqueId', e.target.value)} /> : data.uniqueId}</td>
                      <td className="border px-4 py-2">{editIndex === index ? <input type="text" value={data.description} onChange={(e) => handleInputChange(index, 'description', e.target.value)} /> : data.description}</td>
                      <td className="border px-4 py-2">{editIndex === index ? <input type="text" value={data.supplierInformation} onChange={(e) => handleInputChange(index, 'supplierInformation', e.target.value)} /> : data.supplierInformation}</td>
                      <td className="border px-4 py-2">{editIndex === index ? <input type="text" value={data.purchasePrice} onChange={(e) => handleInputChange(index, 'purchasePrice', e.target.value)} /> : data.purchasePrice}</td>
                      <td className="border px-4 py-2">{editIndex === index ? <input type="text" value={data.tax} onChange={(e) => handleInputChange(index, 'tax', e.target.value)} /> : data.tax}</td>
                      <td className="border px-4 py-2">{editIndex === index ? <input type="text" value={data.purchaseDate} onChange={(e) => handleInputChange(index, 'purchaseDate', e.target.value)} /> : data.purchaseDate}</td>
                      <td className="border px-4 py-2">{editIndex === index ? <input type="text" value={data.expiryDate} onChange={(e) => handleInputChange(index, 'expiryDate', e.target.value)} /> : data.expiryDate}</td>
                      <td className="border px-4 py-2">
                        {editIndex === index ? <button onClick={() => handleSave(index) }>Save</button> : <button onClick={() => handleEdit(index)}>Edit</button>}
                        {/* Add delete option if needed */}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Check;

