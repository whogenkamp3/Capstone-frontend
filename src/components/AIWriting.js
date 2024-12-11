import React, { useState } from 'react';
//import { useNavigate } from 'react-router-dom'; // For navigation
import Header from './Header'; // Header component
import GeminiComponent from './GeminiComponent'; // GeminiComponent for API handling

const AIWriting = () => {
    const [geminiPrompt, setGeminiPrompt] = useState(''); // State for user input
    const [submittedPrompt, setSubmittedPrompt] = useState(null); // State for submitted input
    //const navigate = useNavigate(); // To use for navigation

    const handleGeminiSubmit = () => {
        if (geminiPrompt.trim()) {
            setSubmittedPrompt(geminiPrompt);
        } else {
            alert('Please enter a prompt to continue.');
        }
    };

    return (
        <div className="ai-writing-container">
            {/* Header at the top */}
            <Header />

            <div className="ai-writing-content">
                {/* Chat Input Area */}
                <div className="chat-bar">
                    <input
                        type="text"
                        placeholder="Ask me anything, powered by Gemini"
                        value={geminiPrompt}
                        onChange={(e) => setGeminiPrompt(e.target.value)}
                        className="chat-input"
                        style={{ width: '300px' }}
                    />
                    <button className="chat-submit" onClick={handleGeminiSubmit}>
                        Send
                    </button>
                </div>

                {/* Output Area */}
                <div className="output-area">
                    {submittedPrompt ? (
                        <GeminiComponent prompt={submittedPrompt} />
                    ) : (
                        <p className="output-placeholder">
                            Your AI-generated responses will appear here.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AIWriting;
