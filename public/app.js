/*                Variable Declarations                     */

// Variable enumeration for easy rewrites
const messageTypes = { LEFT: 'left', RIGHT: 'right', LOGIN: 'login' };

//Login stuff
let username = '';
const loginWindow = document.getElementById('login'); // login section
const usernameInput = document.getElementById('usernameInput'); // login input
const loginBtn = document.getElementById('loginBtn'); // login submit button

//Chat stuff
const chatWindow = document.getElementById('chat'); // chat section
const messagesList = document.getElementById('messagesList'); // chat messages list
const messageInput = document.getElementById('messageInput'); // chat form input
const sendBtn = document.getElementById('sendBtn'); // chat submit button


// messages object: {author: 'James Quick', date: '11/28/2019', content: 'cool message', type: messageTypes.RIGHT}
const messages = []


/*   Sockets Code   */

// Establish client websocket connection to served port 
const PORT = 'http://localhost:3000/';
const socket = io.connect(PORT);

// Emit message to server
const sendMessage = message => {
  socket.emit('message', message);
}

// Listen for serverside emission of message, and use data in callback
// socket.on('name of emitted data', function(data) {...});
socket.on('message', message => {
  if (message.type !== messageTypes.LOGIN) {
    if (message.author === username) {
      message.type = messageTypes.RIGHT;
    } else {
      message.type = messageTypes.LEFT;
    }
  }
  messages.push(message);
  displayMessages();
  chatWindow.scrollTop = chatWindow.scrollHeight;
});



/* Functions */

// selectively return markup based on messageType
createMessageHTML = message => {
  if (message.type === messageTypes.LOGIN) {
    return `
			<p class="secondary-text text-center mb-2">${
      message.author
      } joined the chat...</p>
		`;
  }
  return `
	<div class="message ${
    message.type === messageTypes.LEFT ? 'message-left' : 'message-right'
    }">
		<div class="message-details flex">
			<p class="flex-grow-1 message-author">${
    message.type === messageTypes.LEFT ? message.author : ''
    }</p>
			<p class="message-date">${message.date}</p>
		</div>
		<p class="message-content">${message.content}</p>
	</div>
	`;
};

// Use createMessageHTML for each message object and join resulting html into messageList
displayMessages = () => {
  const messagesHTML = messages
    .map(message => createMessageHTML(message)).join('');
  messagesList.innerHTML = messagesHTML;
};


// set username, create message object with type and author, invoke sendMessage() hide login and show chat window
loginBtn.addEventListener('click', e => {
  e.preventDefault();
  if (!usernameInput.value) return alert('Please Enter a username');
  username = usernameInput.value
  const message = { author: username, type: messageTypes.LOGIN }
  sendMessage(message)
  loginWindow.classList.add('hidden');
  chatWindow.classList.remove('hidden')
})


// create message object and pass to sendMessage(), reset chat messageInput
sendBtn.addEventListener('click', e => {
  e.preventDefault();
  if (!messageInput.value) return alert('Please Enter a message');
  const message = {
    author: username,
    date: (new Date()).toLocaleTimeString("en-US", { month: "short", day: "2-digit", weekday: "short", hour: 'numeric', minute: 'numeric' }),
    content: messageInput.value
  };
  sendMessage(message)
  messageInput.value = ''
})







