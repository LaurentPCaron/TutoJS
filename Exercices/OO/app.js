const form = document.querySelector('#temp');
form.addEventListener('submit', e => {
  e.preventDefault();

  const val = document.querySelector('#temperature').value;
  const unit = form.elements['unit'].value;

  const temp = new Temperature(val, unit);
  temp.converte();
  document.querySelector('#result').innerHTML = temp.response;
});

//Vanille

// function Temperature(val, unit) {
//   this.val = val;
//   this.unit = unit;
//   this.response = '';
// }

// Temperature.prototype.converte = function () {
//   const { val, unit } = this;
//   if (unit === 'C') {
//     this.response = `${(val * 9) / 5 + 32}F`;
//   } else {
//     this.response = `${((val - 32) * 5) / 9}C`;
//   }
//   return this.response;
// };

//Class

class Temperature {
  constructor(val, unit) {
    this.val = val;
    this.unit = unit;
    this.response = '';
  }
  converte() {
    const { val, unit } = this;
    if (unit === 'C') {
      this.response = `${Math.floor((val * 9) / 5 + 32)}F`;
    } else {
      this.response = `${Math.floor(((val - 32) * 5) / 9)}C`;
    }
    return this.response;
  }
}
