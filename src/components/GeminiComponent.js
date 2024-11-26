import React, { useState, useEffect } from 'react';
import api from '../api'; // Use the configured Axios instance

const GeminiComponent = ({ prompt }) => {
    const [geminiResponse, setGeminiResponse] = useState(null);
    const [error, setError] = useState(null);

    const fetchGeminiResponse = async () => {
        if (!prompt) {
            setError('Prompt is empty');
            return;
        }
        try {
            const response = await api.post('gemini/', { prompt }); // Pass the prompt in the POST body
            setGeminiResponse(response.data); // Assuming response contains the response object
            setError(null); // Clear any previous errors
        } catch (err) {
            console.error("Error fetching Gemini response:", err);
            setError(err.response?.data?.error || "An unexpected error occurred.");
        }
    };

    // Fetch response immediately when the component is mounted or when prompt changes
    useEffect(() => {
        if (prompt) {
            setGeminiResponse(null); // Reset previous response while loading new response
            fetchGeminiResponse();
        }
    }, [prompt]);

    const renderResponse = () => {
        if (geminiResponse) {
            // Assuming geminiResponse.candidates is an array, loop over it
            if (geminiResponse.candidates && Array.isArray(geminiResponse.candidates)) {
                return geminiResponse.candidates.map((candidate, index) => (
                    <div key={index}>
                        <p>{candidate.text || candidate}</p> {/* Adjust based on your data structure */}
                    </div>
                ));
            } else {
                return <p>{geminiResponse.text || 'No candidates available'}</p>; // Fallback
            }
        }
        return <p>Loading...</p>;
    };

    return (
        <div className="gemini-response">
            {error ? (
                <p style={{ color: 'red' }}>Error: {error}</p>
            ) : (
                renderResponse() // This will render the response or the loading state
            )}
        </div>
    );
};

export default GeminiComponent;
