var app = {};

app.messages = [];

app.init = function() {
  // What should I be doing you guys?

};

app.send = function(message) {
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message');
    }
  });
};

app.fetch = function() {
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'GET',
    success: function (data) {
      console.log('chatterbox: Message fetched');
      app.messages = data.results;
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to fetch message');
    }
  });
};

app.clearMessages = function() {
  $('#chatterbox').empty();
};

app.addMessage = function() {};

app.addRoom = function() {};

app.update = function () {
  app.clearMessages();
  $.each(app.messages, function(i, message){
    var $message = $('<div class="message"></div>').text(message.text === undefined ? '--------' : message.text);
    $('#chatterbox').append($message);
  });
  app.fetch();
};


setInterval(app.update, 10000);
