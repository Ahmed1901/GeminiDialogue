const { GoogleGenerativeAI } = require("@google/generative-ai");
const {chatHistory} = require("./resources");

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const getGeminiResponseByQuestion = async (question) => {
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});

    const chat = model.startChat({
        history: chatHistory,
        generationConfig: {maxOutputTokens: 1000, temperature: 0.4},
    });

    const result = await chat.sendMessage(question);
    const response = await result.response;
//    chatHistory.append({role: "user", parts: [{text: question}]});
//    chatHistory.append({role: "model", parts: [{text: text}]});

    return response.text();
}

module.exports = {
    getGeminiResponseByQuestion,
}