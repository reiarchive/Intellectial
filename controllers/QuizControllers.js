const extract = require('extract-json-from-string');
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.APIKEY,
});
const openai = new OpenAIApi(configuration);

const quizController = {
    start : async (req, res) => {
        const messages = [{ role: "system", content: process.env.GPT_SYSTEM }];

        messages.push({ role: "user", content: "Quiz topic : " + req.body.topic + ", Level : Hard"});
        
        try {
            const completion = await openai.createChatCompletion({
                model: "gpt-3.5-turbo",
                messages: messages,
            });
            console.log(completion.data.choices[0].message.content)

            const quiz_json = extract(completion.data.choices[0].message.content)[0]
            console.log(quiz_json)
            
            return res.status(201).send(quiz_json);
        } catch (error) {
            console.log(error.response);
            console.log(error.response);
            return res.status(201).json({
                "error": 1
            });
        }
    }
};

module.exports = quizController;
