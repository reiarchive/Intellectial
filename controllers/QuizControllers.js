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

const fix_json = async (json) => {

    json.response.forEach(item => {
        // Rename "options" to "option"
        if (item.hasOwnProperty('options')) {
            item.option = item.options;
            delete item.options;
        }

        // Rename "answer" to "Answer"
        if (item.hasOwnProperty('answer')) {
            item.Answer = item.answer;
            delete item.answer;
        }
    });

    return json;
}

const quizController = {
    start: async (req, res) => {
        let quiz_json
        const messages = [{ role: "system", content: process.env.GPT_SYSTEM }];

        messages.push({ role: "user", content: "Make me quiz about " + req.body.topic + " with hard difficulty" });

        try {
            const completion = await openai.createChatCompletion({
                model: "gpt-3.5-turbo",
                messages: messages,
            });
            console.log(completion.data.choices[0].message.content)


            const extract_json = extract(completion.data.choices[0].message.content)


            if (extract_json.length > 1) {
                quiz_json = await merge_json(quiz_json)
            } else {
                quiz_json = extract_json[0]
            }

            quiz_json = await fix_json(quiz_json)

            if (!quiz_json) {
                return res.status(201).json({
                    "error": 1
                });
            }


            return res.status(201).send(quiz_json);
        } catch (error) {
            console.log(error);
            console.log(error.response);
            return res.status(201).json({
                "error": 1
            });
        }
    }
};

module.exports = quizController;
