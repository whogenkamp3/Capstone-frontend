import React, { useState } from 'react';
import api from '../api'; // Use the configured Axios instance

const GeminiComponent = ({ prompt }) => {
    const [geminiResponse, setGeminiResponse] = useState(null);
    const [error, setError] = useState(null);

    const fetchGeminiResponse = async () => {
        if (!prompt) {
            setError("Please enter a prompt.");
            return;
        }

        try {
            const response = await api.post('gemini/', { prompt }); // Use the provided prompt
            setGeminiResponse(response.data.response); // Assuming `response.data.response` contains the response text
            setError(null); // Clear any previous errors
        } catch (err) {
            console.error("Error fetching Gemini response:", err);
            setError(err.response?.data?.error || "An unexpected error occurred.");
        }
    };

    return (
        <div>
            <button onClick={fetchGeminiResponse}>Ask Gemini</button>
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}
            {geminiResponse && <p>{geminiResponse.text || geminiResponse}</p>}
        </div>
    );
};

export default GeminiComponent;
