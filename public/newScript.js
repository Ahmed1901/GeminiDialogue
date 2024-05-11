function typeEffect(message, text) {
    let index = 0;
    if (index < text.length) {
        let interval = setInterval(() => {
            message.append(text[index]);
            index++;
            if (index === text.length) {
                clearInterval(interval)
                setTimeout(() => {
                    message.removeClass('typing')
                    message.html('Hello! How can I help you today?')
                }, 1000)
            }
        }, 50); // Adjust the speed here (in milliseconds)
    }
}

$(document).ready(function() {
    let text = 'Assistant is typing...';
    const message = $('.message.typing');
    message.empty();
    typeEffect(message, text);
});

$(document).on('submit', '#chat-form', function(event){
    event.preventDefault();
    const newMessageInput = $('#newMessage');
    const message = newMessageInput.val();
    if (message.trim() !== '') {
        $('.chat-history-container').append(`
            <div class="message user-message">${message}</div>
            <div class="clearfix"></div>
        `);
        newMessageInput.val('');
    }
});