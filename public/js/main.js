const answer = [];
var currentQuestion = 0;
let correctAnswer = 0;

let questionAnswer;




const verify = (topic) => {
    return topic.trim().length == 0 ? false : true;
}

const finish = () => {
    console.log(answer)
    $(".thanks__title").text('You get ' + correctAnswer.toString() + ' Out of ' + questionAnswer.length.toString())
    $(".quiz").hide()
    $(".thanks").show()
}

const renderPage = () => {
    
    renderProgress()

    if (currentQuestion >= questionAnswer.length) {
        finish()
        return false;
    }

    $('.ongoing__quiz').attr('data-question', currentQuestion);

    $(".quiz__question").text(questionAnswer[currentQuestion]['question'])

    const option_element = $(".question__option");

    console.log(questionAnswer[currentQuestion]['option'])
    for (var i = 0; i < option_element.length; i++) {
        option_element.eq(i).text(questionAnswer[currentQuestion]['option'][i]);
    }

    currentQuestion += 1

    return true;
}

const renderProgress = () => {
    const percent = ((currentQuestion) / questionAnswer.length) * 100
    console.log(percent)

    $(".progress__inner").width(percent+"%")
}


$(document).ready(async () => {

    var button = $('.submit-button')
    var spinner = '<span class="spinner"></span>';


    button.click(async (e) => {
        e.preventDefault()

        const topic = $(".quiz_input_topic").val()

        if (!verify(topic)) {
            console.log("False")
            return false;
        }
        
        button.text("")
        button.addClass("loading");
        button.attr('disabled', true)

        await fetch('/api/start', {
            method: 'POST',
            headers: {
                Accept: 'application.json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ topic: topic }),
            cache: 'no-cache'
        }).then(response => response.json())
            .then(resultJson => {
                button.removeClass("loading");
                // Handle the response from the backend
                if (resultJson.error == 0) {
                    // Add check mark
                    button.addClass("checkmark");

                    // Change icon
                    resultJson.icon !== "" ? $('.question__emoji').text(resultJson.icon) : "";

                    // Push responsne
                    questionAnswer = resultJson.response

                    // Render page
                    renderPage()

                    // Hide and show
                    $(".topic__box").hide()
                    $(".ongoing__quiz").show()
                } else {
                    button.text("Error, try again!")
                    button.attr('disabled', false)

                }
            })
            .catch(error => {
                console.log(error);
            });


    })

    $(".question__option").click(async (e) => {
        const optionIndex = $(e.target).data("option")
        answer.push(optionIndex)

        if (questionAnswer[currentQuestion - 1]['Answer'] == parseInt(optionIndex))
            correctAnswer += 1

        renderPage()
    })

})