const messageForm = document.querySelector('#message-form');
const { hash } = window.location;

const message = atob(hash.replace('#', ''));
if (message) {
  document.querySelector('#message-show').classList.remove('hide');
  messageForm.classList.add('hide');
  document.querySelector('h1').innerText = message;
}

document.querySelector('form').addEventListener('submit', e => {
  e.preventDefault();

  messageForm.classList.add('hide');
  document.querySelector('#link-form').classList.remove('hide');

  const input = document.querySelector('#message-input');
  const encrypted = btoa(input.value);

  const linkInput = document.querySelector('#link-input');
  linkInput.value = `${window.location}#${encrypted}`;
  linkInput.select();
});
