exports.handler = async function () {
    return {
        statusCode: 200,
        body: JSON.stringify({ apiKey: process.env.HF_API_KEY }) // API Key di Environment Variables
    };
};
