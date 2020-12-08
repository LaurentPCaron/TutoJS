const btn = document.querySelector('button');

//This function moves an element "amount" number of pixels after a delay.
//If the element will stay on screen, we move the element and call the onSuccess callback function
//If the element will move off screen, we do not move the element and instead call the onFailure callback
const moveX = (element, amount, delay) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const bodyBoundary = document.body.clientWidth;
      const elRight = element.getBoundingClientRect().right;
      const currLeft = element.getBoundingClientRect().left;
      if (elRight + amount > bodyBoundary || currLeft + amount < 0) {
        reject();
      } else {
        element.style.transform = `translateX(${currLeft + amount}px)`;
        resolve();
      }
    }, delay);
  });
};
//################
//Promiese vanille
//###############

// moveX(btn, 300, 1000)
//   .then(() => moveX(btn, 300, 1000))
//   .then(() => moveX(btn, 300, 1000))
//   .then(() => moveX(btn, 300, 1000))
//   .then(() => moveX(btn, 300, 1000))
//   .then(() => {
//     alert('YOU HAVE A WIDE SCREEN!');
//   })
//   .catch(() => {
//     alert('CANNOT MOVE FURTHER!');
//   });

//###########
//Await
//###########

async function animateRight(el, amt) {
  while (true) {
    await moveX(el, amt, 1000);
  }
}

animateRight(btn, 100).catch(err => {
  console.log('Terminée!');
  animateRight(btn, -100);
});
