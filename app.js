const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');
const {getGeminiResponseByQuestion} = require("./gemini/getGeminiResponseByQuestion");
const port = process.env.PORT || 4000;

const app = express();
app.use(cors());

app.use(bodyParser.json());

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
  res.send('Hello World!')
})
app.get('/ping/', (req, res) => {
  res.send('pong')
})


app.listen(port, () => console.log(`Server listening on port ${port}`));