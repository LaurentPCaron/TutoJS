let leftMovie;
let rightMovie;

const autoCompleteConfig = {
  renderOption: movie => {
    const imgSrc = movie.Poster !== 'N/A' ? movie.Poster : './img/NA.jpg';
    return `
    <img src="${imgSrc}"/>
    ${movie.Title} (${movie.Year})
    `;
  },

  inputValue: movie => {
    return movie.Title;
  },
  fetchData: async searchTerm => {
    const response = await axios.get('http://www.omdbapi.com/', {
      params: {
        apikey: key,
        s: searchTerm,
      },
    });

    if (response.data.Error) {
      return [];
    }

    return response.data.Search;
  },
};

createAutoComplete({
  root: document.querySelector('#left-autocomplete'),
  onOptionSelect: movie => {
    document.querySelector('.tutorial').classList.add('is-hidden');
    onMovieSelect(movie, document.querySelector('#left-summary'), 'left');
  },
  ...autoCompleteConfig,
});

createAutoComplete({
  root: document.querySelector('#right-autocomplete'),
  onOptionSelect: movie => {
    document.querySelector('.tutorial').classList.add('is-hidden');
    onMovieSelect(movie, document.querySelector('#right-summary'), 'right');
  },
  ...autoCompleteConfig,
});

const onMovieSelect = async (movie, summaryElement, side) => {
  const response = await axios.get('http://www.omdbapi.com/', {
    params: {
      apikey: key,
      i: movie.imdbID,
    },
  });
  summaryElement.innerHTML = movieTemplate(response.data);

  if (side == 'left') {
    leftMovie = response.data;
  } else {
    rightMovie = response.data;
  }

  if (leftMovie && rightMovie) {
    runComparison();
  }
};

const runComparison = () => {
  const leftStats = document.querySelectorAll('#left-summary .notification');
  const rightStats = document.querySelectorAll('#right-summary .notification');

  leftStats.forEach((ls, index) => {
    const rs = rightStats[index];

    const leftValue = parseFloat(ls.dataset.value);
    const rightValue = parseFloat(rs.dataset.value);

    if (leftValue < rightValue) {
      ls.classList.remove('is-primary');
      ls.classList.add('is-warning');
    } else if (leftValue > rightValue) {
      rs.classList.remove('is-primary');
      rs.classList.add('is-warning');
    }
  });
};

const movieTemplate = movieDetail => {
  const runtime = parseInt(movieDetail.Runtime.replace(/min/g, ''));
  const metaScore = parseInt(movieDetail.Metascore);
  const imdbScore = parseFloat(movieDetail.imdbRating);
  const imdbVotes = parseInt(movieDetail.imdbVotes.replace(/,/g, ''));
  const awards = movieDetail.Awards.split(' ').reduce((prev, word) => {
    const value = parseInt(word);
    if (isNaN(value)) {
      return prev;
    } else {
      return prev + value;
    }
  }, 0);

  return `
  <article class="media">
    <figure class="media-left">
      <p class="image">
        <img src="${movieDetail.Poster}"/>
      </p>
    </figure>
    <div class="media-content">
      <div class="content">
        <h1>${movieDetail.Title}</h1>
        <h4>${movieDetail.Genre}</h4>
        <p>${movieDetail.Plot}</p>
      </div>
    </div>
  </article>


  <article data-value=${awards}  class="notification is-primary">
    <p class="title">${movieDetail.Awards}</p>
    <p class="subtitle">Awards</p>
  </article>
  <article data-value=${runtime} class="notification is-primary">
    <p class="title">${movieDetail.Runtime}</p>
    <p class="subtitle">Runtime</p>
  </article>
  <article data-value=${metaScore} class="notification is-primary">
    <p class="title">${movieDetail.Metascore}</p>
    <p class="subtitle">Metascore</p>
  </article>
  <article data-value=${imdbScore} class="notification is-primary">
    <p class="title">${movieDetail.imdbRating}</p>
    <p class="subtitle">IMDB Rating</p>
  </article>
  <article data-value=${imdbVotes} class="notification is-primary">
    <p class="title">${movieDetail.imdbVotes}</p>
    <p class="subtitle">IMDB Votes</p>
  </article>
  `;
};
