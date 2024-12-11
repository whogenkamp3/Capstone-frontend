import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import api from '../api'; // Assuming you have an API instance to make requests
import Header from './Header';
import GeminiComponent from './GeminiComponent'; // Correct import

const Home = () => {
    const [classes, setClasses] = useState([]); // Store class names
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state
    const [isChatOpen, setIsChatOpen] = useState(false); // State to track chat window visibility
    const [geminiPrompt, setGeminiPrompt] = useState(''); // Store the input for the Gemini prompt
    const [submittedPrompt, setSubmittedPrompt] = useState(''); // Store the prompt to submit

    const navigate = useNavigate(); // Initialize useNavigate for redirection

    // Fetch user classes from the API
    const fetchClasses = async () => {
        setLoading(true);
        setError(null);

        try {
            const user_id = localStorage.getItem('user_id'); // Assuming user_id is stored in localStorage
            if (!user_id) {
                setError('User ID is missing.');
                setLoading(false);
                return;
            }

            const response = await api.get('/get-user-classes', {
                params: { user_id },
            });

            // Debugging: Log the entire response to inspect its structure
            console.log('API Response:', response);

            if (Array.isArray(response.data)) {
                console.log('Classes from API:', response.data); // Debugging the classes returned
                setClasses(response.data); // Set classes from response
            } else {
                setError('No classes found.');
            }
        } catch (err) {
            setError('Failed to fetch classes. Please try again.');
            console.error('Error fetching classes:', err);
        } finally {
            setLoading(false);
        }
    };

    // Fetch classes when the component mounts
    useEffect(() => {
        fetchClasses();
    }, []); // Empty dependency array ensures this runs only on mount

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

    // Redirect to Groups.js when the Groups section is clicked
    const redirectToGroups = () => {
        navigate('/groups');
    };

    return (
        <div className="home-container">
            {/* Include Header */}
            <Header />

            <div className="home-content">
                <div className="container">
                    {/* Left side content with class selection */}
                    <div className="square left-square">
                        <div className="class-text">Classes</div>
                        <button className="plus-button" onClick={redirectToClassCreation}>+</button>

                        {/* Render classes */}
                        <div className="class-squares-container">
                            {loading && <p>Loading classes...</p>}
                            {error && <p className="error">{error}</p>}
                            {classes.length > 0 ? (
                                classes.map((classObj) => (
                                    <div key={classObj.class_id} className="small-square">
                                        {classObj.class_name} ({classObj.university})
                                    </div>
                                ))
                            ) : (
                                <p>No classes found.</p>
                            )}
                        </div>
                    </div>

                    {/* Right side content with additional information */}
                    <div className="square right-square">
                        <div className="top-row">
                            <div className="small-square" onClick={redirectToGroups}>Groups</div>
                            <div className="small-square">Upload</div>
                            <div className="small-square">
                              <Link to="/aiwriting">AIWriting</Link>
                            </div>
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














