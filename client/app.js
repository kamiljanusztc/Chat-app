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
    userNameInput.userName;
    loginForm.classList.remove('show');
    messagesSection.classList.add('show');
  } else {
    window.alert('This field is empty!');
  }
};

const sendMessage = (event) => {
  event.preventDefault();
  if (messageContentInput.value) {
    addMessage(userName, messageContentInput.value);
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
    message.innerHTML = `
      <h3 class="message__author">${userName === author ? 'You' : author }</h3>
      <div class="message__content">
        ${content}
      </div>
    `;
    messagesList.appendChild(message);
  }
};