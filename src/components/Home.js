import React, { useState } from 'react';
import Header from './Header';
import GeminiComponent from './GeminiComponent';

const Home = () => {
    const [selectedClasses, setSelectedClasses] = useState([]); // Store selected classes as an array
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [geminiPrompt, setGeminiPrompt] = useState(''); // Store the input for the Gemini prompt

    const handleClassSelection = (className) => {
        setSelectedClasses((prevClasses) => [...prevClasses, className]);
        setDropdownVisible(false); // Close dropdown after selection
    };

    const toggleDropdown = () => {
        setDropdownVisible(!isDropdownVisible); // Toggle dropdown visibility
    };

    return (
        <div className="home-container">
            {/* Include Header here */}
            <Header />

            <div className="home-content">
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
                            <div className="small-square">Upload</div>
                            <div className="small-square">AI Writing</div>
                        </div>
                        <div className="bottom-row">
                            <div className="small-square">University</div>
                            <div className="small-square">Presentations</div>
                            <div className="small-square">Progress</div>
                        </div>

                        <div className="gemini-search-bar">
                            <input
                                type="text"
                                placeholder="Ask me anything, powered by Gemini"
                                value={geminiPrompt}
                                onChange={(e) => setGeminiPrompt(e.target.value)} // Update the prompt state
                            />
                            <div className="gemini-logo"></div>
                        </div>
                        {/* Include GeminiComponent and pass the prompt */}
                        <GeminiComponent prompt={geminiPrompt} />
                    </div>
                </div>
                {/* End of main content */}
            </div>
        </div>
    );
};

export default Home;
