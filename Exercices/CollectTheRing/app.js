const INTERVAL = 10;

const tails = document.querySelector('#tails');
const ring = document.querySelector('#ring');
const sfx = document.querySelector('#sfx');

function newRingPo(actor) {
  const x = Math.floor(
    Math.random() * (window.innerWidth - actor.getBoundingClientRect().width) +
      1
  );
  const y = Math.floor(
    Math.random() *
      (window.innerHeight - actor.getBoundingClientRect().height) +
      1
  );

  actor.style.top = `${y}px`;
  actor.style.left = `${x}px`;
}

function moveUp(actor) {
  let y = actor.getBoundingClientRect().top;
  if (y > 0) {
    y -= INTERVAL;
  }
  actor.style.top = `${y}px`;
}

function moveDown(actor) {
  let y = actor.getBoundingClientRect().top;
  if (y + actor.getBoundingClientRect().height < window.innerHeight) {
    y += INTERVAL;
  }
  actor.style.top = `${y}px`;
}

function moveLeft(actor) {
  let x = actor.getBoundingClientRect().left;
  if (x > 0) {
    x -= INTERVAL;
  }
  actor.style.left = `${x}px`;
}

function moveRight(actor) {
  let x = actor.getBoundingClientRect().left;
  if (x + actor.getBoundingClientRect().width < window.innerWidth) {
    x += INTERVAL;
  }
  actor.style.left = `${x}px`;
}

function isTouching(a, b) {
  const aRect = a.getBoundingClientRect();
  const bRect = b.getBoundingClientRect();

  return !(
    aRect.top + aRect.height < bRect.top ||
    aRect.top > bRect.top + bRect.height ||
    aRect.left + aRect.width < bRect.left ||
    aRect.left > bRect.left + bRect.width
  );
}

document.addEventListener('keydown', e => {
  switch (e.code) {
    case 'ArrowUp':
      moveUp(tails);
      break;
    case 'ArrowDown':
      moveDown(tails);
      break;
    case 'ArrowLeft':
      moveLeft(tails);
      break;
    case 'ArrowRight':
      moveRight(tails);
      break;
    default:
      break;
  }
  if (isTouching(tails, ring)) {
    sfx.play();
    newRingPo(ring);
  }
});

newRingPo(ring);
