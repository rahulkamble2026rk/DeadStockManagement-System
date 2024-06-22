const OptionRange = ({selectedProduct}) => {
    if (selectedProduct === 'Computer') {
      return Array.from({ length: 25 }, (_, i) => (
        <option key={i + 1} value={i + 1}>{i + 1}</option>
      ));
    } else if (selectedProduct === 'Printers') {
      return Array.from({ length: 3 }, (_, i) => (
        <option key={i + 1} value={i + 1}>{i + 1}</option>
      ));
    } else if (selectedProduct === 'LAN') {
      return Array.from({ length: 25 }, (_, i) => (
        <option key={i + 1} value={i + 1}>{i + 1}</option>
      ));
    } else {
      return <option value="">Select an Option</option>;
    }
};

export default OptionRange ; 