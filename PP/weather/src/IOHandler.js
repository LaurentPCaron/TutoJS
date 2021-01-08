const printLocationChoises = choices => {
  let message = '***Select a location****';
  choices.forEach((choice, index) => {
    message += `\n ${index + 1}- ${choice}`;
  });
  console.log(message);
};

module.exports = { printLocationChoises };
