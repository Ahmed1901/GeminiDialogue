const typingText = 'Assistant is typing...';

$(document).ready(function() {
    typeEffect(true);
});

const scrollToChatHistoryBottom = () => {
    const chatHistoryContainer = $('.chat-history-container');
    $(chatHistoryContainer).animate({ scrollTop: $(chatHistoryContainer)[0].scrollHeight }, "slow");
}

const typeEffect = (firstMessage = false) => {
    const message = $('.message.typing');
    message.empty();
    let index = 0;
    if (index < typingText.length) {
        let interval = setInterval(() => {
            message.append(typingText[index]);
            index++;
            if (index === typingText.length) {
                clearInterval(interval)
                if (firstMessage) {
                    setTimeout(() => {
                        message.removeClass('typing')
                        message.html('Hello! How can I help you today?')
                    }, 1000)
                }
            }
        }, 50); // Adjust the speed here (in milliseconds)
    }
}

$(document).on('submit', '#chat-form', async (event) =>{
    event.preventDefault();
    const newMessageInput = $('#newMessage');
    const message = newMessageInput.val();
    if (message.trim() !== '') {
        $('.chat-history-container').append(`
            <div class="message user-message">${message}</div>
            <div class="clearfix"></div>
        `);
        scrollToChatHistoryBottom();
        newMessageInput.val('');
        setTimeout(() => {
            $('.chat-history-container').append(`
                <div class="message system-message typing"></div>
                <div class="clearfix"></div>
            `);
            scrollToChatHistoryBottom();
            typeEffect();
        }, 1000)
        getGeminiResponseByQuestion(message);
    }
});

const getGeminiResponseByQuestion = async (question) => {
    const response = await fetch('http://localhost:4000/ask/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ question: question })
    })

    if(response.ok) {
        console.log('yes');
        const data = await response.json();
        const formattedText = marked.parse(data.answer);
        const message = $('.message.typing');
        message.html(formattedText);
        message.removeClass('typing');
        scrollToChatHistoryBottom();
    } else {
        setTimeout(() => {
            const message = $('.message.typing');
            message.html('Sorry, I am unable to process your request at the moment. Please try again later.');
            message.removeClass('typing');
            $('#newMessage')
                .attr('placeholder', 'Please try again later.')
                .attr('disabled', 'disabled');
            scrollToChatHistoryBottom();
        }, 5000);
    }
}