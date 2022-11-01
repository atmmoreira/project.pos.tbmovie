const WEBAPI_KEY = '3a6dacbb2c787551536f07cfc546eba1';
const WEBAPI_URL = `https://api.themoviedb.org/3`;
const urlParams = new URLSearchParams(window.location.search);
const MY_PARAM = urlParams.get("movieId");
console.log(MY_PARAM);

const init = () => {
  loadMovie();
  search();
}
init();

function loadMovie() {
  fetch(`${WEBAPI_URL}/movie/${MY_PARAM}?api_key=${WEBAPI_KEY}`)
    .then((response) => response.json())
    .then((movie) => {
      const detalhesMovie = document.querySelector('.detalhes');
      detalhesMovie.innerHTML = `
        <div class="row p-5">
          <div class="col-md-6 text-center">
            <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="..." class="img-fluid" />
          </div>
          <div class="col-md-6">
            <h1 class="title-movie mb-4 pt-5"><a href="https://www.themoviedb.org/movie/${movie.id}" target="_blank">${movie.title}</a></h1>
            <h4 class="mb-3">
              ${movie.overview}
            </h4>
            <div class="mb-3">
              <div class="row">
                <div class="col-md-12"><b>Data Lançamento:</b> ${movie.release_date}</div>
              </div>
            </div>
            <h2 class="avaliacao-movie">
              Avaliação: ${movie.vote_average}
            </h2>
          </div>
        </div>
      `

    });
}

function search() {
  const search = document.querySelector('.search');
  const searchBtn = document.querySelector('.btnSearch');

  searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('.movieSearchResults').innerHTML = '';

    const valueInputSearch = search.value;
    document.querySelector('.main').classList.add('d-none');
    document.querySelector('.searchResults').classList.remove('d-none');
    document.querySelector('.searchResults').classList.add('d-block');

    fetch(
      `${WEBAPI_URL}/search/movie?api_key=${WEBAPI_KEY}&query=${valueInputSearch}`
    )
      .then((response) => response.json())
      .then((json) => {
        json.results.forEach((movie) => {
          document.querySelector('.movieSearchResults').innerHTML += `
          <div class="col-md-3 col-4">
            <div class="card mb-3">
              <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="..." class="img-fluid" />
            </div>
          </div>
        `;
        });
      });
  });
}