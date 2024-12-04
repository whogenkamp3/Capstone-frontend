import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import Header from './Header';
import GeminiComponent from './GeminiComponent'; // Import the Gemini component for prompt handling

const Home = () => {
    const [selectedClasses, setSelectedClasses] = useState([]); // Store selected classes as an array
    const [isChatOpen, setIsChatOpen] = useState(false); // State to track chat window visibility
    const [geminiPrompt, setGeminiPrompt] = useState(''); // Store the input for the Gemini prompt
    const [submittedPrompt, setSubmittedPrompt] = useState(''); // Store the prompt to submit

    const navigate = useNavigate(); // Initialize useNavigate for redirection

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

    // Redirect to ClassCreation.js when the plus button is clicked
    const redirectToClassCreation = () => {
        navigate('/classcreation');
    };

    return (
        <div className="home-container">
            {/* Include Header */}
            <Header />

            <div className="home-content">
                <div className="container">
                    {/* Left side content with class selection */}
                    <div className="square left-square">
                        <div className="class-text">Class</div>
                        <button className="plus-button" onClick={redirectToClassCreation}>+</button>

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




