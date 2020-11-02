const fetchData = async searchTerm => {
  const response = await axios.get('http://www.omdbapi.com/', {
    params: {
      apikey: '',
      s: searchTerm,
    },
  });

  console.log(response.data);
};

const input = document.querySelector('input');

let timeoutId;

const onInput = e => {
  if (timeoutId) {
    clearTimeout(timeoutId);
  }
  timeoutId = setTimeout(() => {
    fetchData(e.target.value);
  }, 1000);
};

input.addEventListener('input', onInput);