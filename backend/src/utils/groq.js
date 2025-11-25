import axios from 'axios';
import ENV from '../config/env.js';

export const generateFromGroq = async (prompt) => {
    const apiKey = ENV.GROQ_API_KEY;
    if (!apiKey) {
        throw new Error("GROQ_API_KEY is not set");
    }

    const url = "https://api.groq.com/openai/v1/chat/completions";

    try {
        const response = await axios.post(url, {
            messages: [
                {
                    role: "user",
                    content: prompt
                }
            ],
            model: "mixtral-8x7b-32768",
            response_format: { type: "json_object" }
        }, {
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json"
            }
        });

        const content = response.data.choices[0].message.content;
        return JSON.parse(content);
    } catch (error) {
        console.error("Groq API Error:", error.response?.data || error.message);
        throw new Error("Failed to generate content from Groq");
    }
};
