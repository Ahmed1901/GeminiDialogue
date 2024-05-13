require('dotenv').config();
const path = require("node:path");
const {getGeminiResponseByQuestion} = require("./gemini/getGeminiResponseByQuestion");
const { App } = require("@slack/bolt");


const app = new App({
    token: process.env.TOKEN,
    signingSecret: process.env.SIGNING_SECRET,
    socketMode:true,
    appToken: process.env.APP_TOKEN
});
app.command("/ask", async ({ command, ack, say }) => {
    try {
      await ack();
      let txt = command.text
      if(txt==="") {
          say("Empty input is not allowed")
      } else {
          const response = await getGeminiResponseByQuestion(txt);
          console.log("Answer sent to client.");
          say(response);
      }
    } catch (error) {
      console.log("err")
      console.error(error);
    }
});

app.message(async ({ message, say }) => {
    try {
    console.log(message.text);
    const response = await getGeminiResponseByQuestion(message.text);
    console.log("Answer sent to client.");
      say(response);
    } catch (error) {
        console.log("err")
      console.error(error);
    }
});



app.start(3000)