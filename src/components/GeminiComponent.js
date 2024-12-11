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
            if (response.data.response) {
                setGeminiResponse(response.data.response); // Extract the `response` key from API
            } else {
                setGeminiResponse(response.data); // Fallback if response is structured differently
            }
            setError(null); // Clear any previous errors
        } catch (err) {
            console.error('Error fetching Gemini response:', err);
            setError(err.response?.data?.error || 'An unexpected error occurred.');
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
        if (!geminiResponse) {
            return <p>Loading...</p>; // Show loading message while waiting for response
        }

        // Handle response based on structure
        if (geminiResponse.candidates && Array.isArray(geminiResponse.candidates)) {
            return geminiResponse.candidates.map((candidate, index) => {
                const text = candidate.content?.parts?.[0]?.text; // Safely access the deeply nested text
                if (text) {
                    // Split text by newline characters and map each paragraph to a <p> tag
                    const paragraphs = text.split('\n').filter(paragraph => paragraph.trim() !== '');
                    return (
                        <div key={index} className="response-paragraphs">
                            {paragraphs.map((paragraph, idx) => (
                                <p key={idx}>{paragraph}</p> // Render each paragraph in its own <p> tag
                            ))}
                        </div>
                    );
                }
                return <p key={index}>No text available</p>; // Fallback if no text
            });
        } else {
            return <p>No candidates available</p>; // Fallback for unexpected structures
        }
    };

    return (
        <div className="gemini-response">
            {error ? (
                <p style={{ color: 'red' }}>Error: {error}</p> // Show error messages
            ) : (
                renderResponse() // Render the response or loading state
            )}
        </div>
    );
};

export default GeminiComponent;
