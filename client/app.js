const socket = io();

socket.on('message', ({ author, content }) => addMessage(author, content));
socket.on('newUser', ({ user }) => addMessage('Chat bot', `${user} has joined the conversation!`));
socket.on('userLoggedOut', ({ user }) => addMessage('Chat bot', `${user} has left the conversation:(`));

const loginForm = document.getElementById('welcome-form');
const messagesSection = document.getElementById('messages-section');
const messagesList = document.getElementById('messages-list');
const addMessageForm = document.getElementById('add-messages-form');
const userNameInput = document.getElementById('username'); 
const messageContentInput = document.getElementById('message-content');

let userName = '';

loginForm.addEventListener('submit', event => login(event));
addMessageForm.addEventListener('submit', event => sendMessage(event));

const login = (event) => {
  event.preventDefault();
  if (userNameInput.value) {
    userName = userNameInput.value;
    loginForm.classList.remove('show');
    messagesSection.classList.add('show');
    socket.emit('join', { user: userName, id: socket.id });
    console.log('newUser joined', socket.id);
  } else {
    window.alert('This field is empty!');
  }
};

const addMessage = (author, content) => {
  const message = document.createElement('li');
  message.classList.add('message');
  message.classList.add('message--received');

  if (author === userName) {
    message.classList.add('message--self');
  } else if (author === 'Chat bot') {
    message.classList.add('message--botInfo');
  }
    message.innerHTML = `
      <h3 class="message__author">${userName === author ? 'You' : author }</h3>
      <div class="message__content">
        ${content}
      </div>
    `;
    messagesList.appendChild(message);
};

const sendMessage = (event) => {
  event.preventDefault();

  let messageContent = messageContentInput.value;

  if(!messageContent.length) {
    alert('You have to type something!');
  }
  else {
    addMessage(userName, messageContent);
    socket.emit('message', { author: userName, content: messageContent })
    messageContentInput.value = '';
  }
};

