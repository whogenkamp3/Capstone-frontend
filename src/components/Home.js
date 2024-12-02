import React, { useState } from 'react';
import Header from './Header';
import GeminiComponent from './GeminiComponent';  // Import the Gemini component for prompt handling

const Home = () => {
    // States for class selection, dropdown visibility, and Gemini prompt submission
    const [selectedClasses, setSelectedClasses] = useState([]); // Store selected classes as an array
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false); // State to track chat window visibility
    const [geminiPrompt, setGeminiPrompt] = useState(''); // Store the input for the Gemini prompt
    const [submittedPrompt, setSubmittedPrompt] = useState(''); // Store the prompt to submit

    // Handle selection of class
    const handleClassSelection = (className) => {
        setSelectedClasses((prevClasses) => [...prevClasses, className]);
        setDropdownVisible(false); // Close dropdown after selection
    };

    // Toggle dropdown visibility
    const toggleDropdown = () => {
        setDropdownVisible(!isDropdownVisible);
    };

    // Toggle chat window visibility
    const toggleChat = () => {
        setIsChatOpen(!isChatOpen);
    };

    // Handle the submission of the Gemini prompt
    const handleGeminiSubmit = () => {
        if (geminiPrompt.trim() === '') {
            alert('Please enter a prompt.');
            return;
        }
        setSubmittedPrompt(geminiPrompt); // Send the prompt to GeminiComponent
    };

    return (
        <div className="home-container">
            {/* Include Header here */}
            <Header />
    return (
        <div className="home-container">
            {/* Include Header here */}
            <Header />

            <div className="home-content">
                <div className="container">
                    {/* Left side content with class selection */}
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
                        {/* Render all selected classes */}
                        <div className="class-squares-container">
                            {selectedClasses.map((className, index) => (
                                <div key={index} className="small-square">
                                    {className}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right side content with additional information */}
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
                    </div>
                </div>
            </div>

            {/* Floating Gemini Button */}
            {!isChatOpen && (
                <button className="gemini-button" onClick={toggleChat}>
                    🌟
                </button>
            )}

            {/* Floating Chat Window */}
            {isChatOpen && (
                <div className="gemini-chat-window">
                    <button className="close-button" onClick={toggleChat}>
                        ✖
                    </button>
                    <div className="chat-content">
                        <input
                            type="text"
                            placeholder="Ask me anything, powered by Gemini"
                            value={geminiPrompt}
                            onChange={(e) => setGeminiPrompt(e.target.value)}
                            className="chat-input"
                        />
                        <button className="chat-submit" onClick={handleGeminiSubmit}>
                            Send
                        </button>
                        {/* Only render GeminiComponent if the prompt is submitted */}
                        {submittedPrompt && <GeminiComponent prompt={submittedPrompt} />}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;


