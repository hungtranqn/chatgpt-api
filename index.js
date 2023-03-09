// node index.js <conversation.json> "<your question>"

const { Configuration, OpenAIApi } = require("openai");
const fs = require("fs");
require("dotenv").config();

(async () => {
  const apiKey = process.env.OPENAI_API_KEY;
  const conversation = process.argv[2];
  const question = process.argv[3];

  // console.log(apiKey, conversation, question);

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  let conversations = [];
  const openai = new OpenAIApi(configuration);
  let rawdata = fs.readFileSync(conversation);
  conversations = JSON.parse(rawdata);
  console.log(conversations);
  conversations.push({ role: "user", content: question });

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: conversations,
  });
  const message = completion.data.choices[0].message;
  conversations.push(message);

  fs.writeFileSync(conversation, JSON.stringify(conversations));
})();
