const LabOptions = ({selectedDepartment}) => {
 
    switch (selectedDepartment) {
      case 'Computer Engineering':
        return (
          <>
            <option value="">Select the Lab-ID</option>
            <option value="101">101</option>
            <option value="102">102</option>
            <option value="103">103</option>
          </>
        );
      case 'Information Technology':
        return (
          <>
            <option value="">Select the Lab-ID</option>
            <option value="301">301</option>
            <option value="302">302</option>
            <option value="303">303</option>
            <option value="401">401</option>
            <option value="402">402</option>
            <option value="403">403</option>
          </>
        );
      case 'Electronics & Telecommunication':
        return (
          <>
            <option value="">Select the Lab-ID</option>
            <option value="201">201</option>
            <option value="202">202</option>
            <option value="203">203</option>
          </>
        );
      default:
        return <option value="">Select the Lab-ID</option>;
    }
  };

  export default LabOptions ; 