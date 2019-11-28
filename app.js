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


// messages object: {author, date, content, type}
const messages = [
  {
    author: 'James Quick',
    date: '11/28/2019',
    content: 'cool message',
    type: messageTypes.RIGHT
  }
]

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
			<p class="flex-grow-1 message-author">${message.author}</p>
			<p class="message-date">${message.date}</p>
		</div>
		<p class="message-content">${message.content}</p>
	</div>
	`;
};

displayMessages = () => {
  const messagesHTML = messages
    .map(message => createMessageHTML(message))
    .join('');
  messagesList.innerHTML = messagesHTML;
};


// loginbtn callback
loginBtn.addEventListener('click', e => {
  e.preventDefault();
  // set username and create logged in message
  if (!usernameInput.value) return alert('Please Enter a username');
  username = usernameInput.value


  console.log(username)
  // hide login and show chat window

  // display those messages
})





// sendbtn callback


