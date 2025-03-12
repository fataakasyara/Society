

export async function handler(event) {
    try {
        const { input } = JSON.parse(event.body);

        const response = await fetch("https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.HF_API_KEY}`,  // API key dari Environment Variables
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ inputs: input })
        });

        const data = await response.json();

        return {
            statusCode: 200,
            body: JSON.stringify(data)
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
}
