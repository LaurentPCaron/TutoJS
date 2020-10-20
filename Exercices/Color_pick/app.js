const myColors = [
  'red',
  'orange',
  'yellow',
  'green',
  'blue',
  'purple',
  'indigo',
  'violet',
];

const container = document.querySelector('#boxes');
function changeColor() {
  document.querySelector('#title').style.color = this.style.backgroundColor;
}

myColors.forEach(color => {
  const box = document.createElement('div');
  box.style.backgroundColor = color;
  box.classList.add('box');
  box.addEventListener('click', changeColor);
  container.append(box);
});
