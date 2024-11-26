import React, { useState } from 'react';
import Header from './Header';

const Home = () => {
  const [selectedClasses, setSelectedClasses] = useState([]);  // Store selected classes as an array
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const handleClassSelection = (className) => {
    // Add the new class to the array of selected classes
    setSelectedClasses((prevClasses) => [...prevClasses, className]);
    setDropdownVisible(false); // Close dropdown after selection
  };

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible); // Toggle dropdown visibility
  };

  return (
    <div className="container">
      <div className="square left-square">
        <div className="class-text">Class</div>
        <button className="plus-button" onClick={toggleDropdown}>+</button>

        {/* Dropdown menu for class selection */}
        {isDropdownVisible && (
          <div className="dropdown">
            <button onClick={() => handleClassSelection("Math")}>Math</button>
            <button onClick={() => handleClassSelection("English")}>English</button>
            <button onClick={() => handleClassSelection("Science")}>Science</button>
            <button onClick={() => handleClassSelection("History")}>History</button>
            <button onClick={() => handleClassSelection("Foreign Language")}>Foreign Language</button>
          </div>
        )}

        {/* Render all selected classes */}
        <div className="class-squares-container">
          {selectedClasses.map((className, index) => (
            <div key={index} className="small-square">
              {className}
            </div>
          ))}
        </div>
      </div>

      <div className="square right-square">
        <div className="top-row">
          <div className="small-square">Groups</div>
          <div className="small-square">Progress</div>
          <div className="small-square">AI Writing</div>
        </div>
        <div className="bottom-row">
          <div className="small-square">University</div>
          <div className="small-square">Presentations</div>
          <div className="small-square">Progress</div>
        </div>

        <div className="gemini-search-bar">
          <input type="text" placeholder="Ask me anything, powered by Gemini" />
          <div className="gemini-logo"></div>
        </div>
      </div>
    </div>
  );
};

export default Home;




