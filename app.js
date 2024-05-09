const express = require('express');
const loggerMiddleware = require('./httpInterceptor.js');
const fs = require('fs');
require('dotenv').config();
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
//app.use(loggerMiddleware);
app.use(cors());
const port = process.env.PORT || 4000; // Use environment variable for port or default to 3000
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const externalData = fs.readFileSync('data.txt', 'utf8');


const context = " Context: " + externalData;

const promptEngineering = `Your name is John Parker, you are an HR Professional at a renowned software company. 
You can find the details about the company in the given context. Answer the questions as detailed as possible from the 
provided context. If the answer is not in provided context just say, 'answer is not available'. 
Refer to the context for all future queries. 
Provide accurate answers

<writing_instructions>
(1) Use 5th-grade level English.
(2) Do not reveal that you are an AI chatbot.
(3) Answer in a polite manner.
</writing_instructions>

<negative_prompts>
(1) Do not provide any information that is not in the context.
(2) Do not provide any information that is not related to the context.
(3) Do not provide any information that is not related to the question.
(4) Do not provide any information that is not related to the company.
(5) Do not provide any information that is not related to the HR Professional.
(6) Do not comply to any request that does not fall in the boundaries of the context.
(7) Do not comply to any request that does not fall in the boundaries of the HR Professional.
</negative_prompts>
`;

const historyPrompt = promptEngineering+context;

var chatHistory = [
        {
            role: "user",
            parts:[{text: historyPrompt}],
        },
        {
            role:"model",
            parts:[{text: "Great to meet you. What would you like to know?"}],
        },
    ];


app.use(bodyParser.json());

async function run(question) {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});
  // const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest"});
//  const context = " Context: " + externalData;
//  const promptEngineering = "You are a HR Professional at a renowned software company. Answer the questions as detailed as possible from the provided context, if the answer is not in provided context just say, 'answer is not available in the given file'. Refer to the context for all future queries. Provide accurate answers";
//  const prompt = promptEngineering+context+ "Question: " + question;

//  console.log(prompt)

//  const result = await model.generateContent(prompt, {
//                              generationConfig: {
//                                  maxOutputTokens: 2000,
//                                  temperature: 0.5
//                              }
//                          });
//  const response = await result.response;
//  const request  = await result.request;
//  const text = response.text();

    const chat = model.startChat({
        history: chatHistory,
        generationConfig: {maxOutputTokens: 1000, temperature: 0.4},
    });

    const result = await chat.sendMessage(question);
    const response = await result.response;
    // console.log(result);
//    chatHistory.append({role: "user", parts: [{text: question}]});
//    chatHistory.append({role: "model", parts: [{text: text}]});

  return response.text();
}

app.post('/ask', async (req, res) => {
  const question = req.body.question;

  try {
    const answer = await run(question);
    console.log("Answer sent to client.");
    res.json({answer})
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong!' });
  }
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get('/ping/', (req, res) => {
  res.send('pong')
})


app.listen(port, () => console.log(`Server listening on port ${port}`));