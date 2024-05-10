require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require("node:path");
const {getGeminiResponseByQuestion} = require("./gemini/getGeminiResponseByQuestion");

const port = process.env.PORT || 4000;

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/ask', async (req, res) => {
  const question = req.body.question;

  try {
    const answer = await getGeminiResponseByQuestion(question);
    console.log("Answer sent to client.");
    res.json({answer})
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong!' });
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => console.log(`Server listening on port ${port}`));