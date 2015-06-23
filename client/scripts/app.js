$(document).ready(function(){
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

    //Add filter for current room
  };

  app.clearMessages = function() {
    $('#chatterbox').empty();
  };

  app.addMessage = function() {
    var username = window.location.search.substring(window.location.search.indexOf('=')+1);
    var message = {
      username: username,
      text: $('#input').val(),
      roomname: 'main'
    };
    app.send(message);
  };

  app.addRoom = function() {
    //Set up a new room.
  };

  app.update = function () {
    app.clearMessages();
    $.each(app.messages, function(i, message){
      var $message = $('<div class="message"></div>')
      var $text = $('<div></div>').text(message.text === undefined ? '--------' : message.text);
      var $user = $('<div></div>').text(message.username === undefined ? 'WHO ARE YOU?' : message.username);
      $message.append($user).append($text);
      $('#chatterbox').append($message);

    });
    app.fetch();
  };

  $('.send').on('click', function(e) {
    app.addMessage();
  })

  setInterval(app.update, 10000);
});
