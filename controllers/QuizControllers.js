const extract = require('extract-json-from-string');
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.APIKEY,
});
const openai = new OpenAIApi(configuration);

const merge_json = async (json) => {
    const mergedResponse = {
        "icon": "",
        "response": [],
        "error": 0
    };
    mergedResponse.icon = json[0].icon;

    for (var i = 0; i < json.length; i++) {
        if (json[i].response) {
            mergedResponse.response.push(json[i].response[0]);
        }
    }

    return mergedResponse
}

const quizController = {
    start: async (req, res) => {
        const messages = [{ role: "system", content: process.env.GPT_SYSTEM }];

        messages.push({ role: "user", content: "Make me quiz about " + req.body.topic + " with hard difficulty" });

        try {
            const completion = await openai.createChatCompletion({
                model: "gpt-3.5-turbo",
                messages: messages,
            });
            console.log(completion.data.choices[0].message.content)

            const quiz_json = extract(completion.data.choices[0].message.content)[0]

            if (!quiz_json) {
                return res.status(201).json({
                    "error": 1
                });
            }

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
