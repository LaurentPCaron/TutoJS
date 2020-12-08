const bouton = document.querySelector('#bouton');

bouton.addEventListener('mouseover', function () {
  const x = Math.floor(Math.random() * window.innerWidth);
  const y = Math.floor(Math.random() * window.innerHeight);

  bouton.style.position = 'absolute';
  bouton.style.left = `${x}px`;
  bouton.style.top = `${y}px`;
});

bouton.addEventListener('click', function () {
  document.querySelector('#result');
  document.body.style.backgroundColor = 'green';
});
