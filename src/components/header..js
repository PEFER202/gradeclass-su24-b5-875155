import { useState } from "react";

const Header = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <>
      <h1 className="header-title">Students Management</h1>
      <input
        type="text"
        placeholder="Enter student name to search..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
    </>
  );
};

export default Header;
