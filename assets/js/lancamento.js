const WEBAPI_KEY = '3a6dacbb2c787551536f07cfc546eba1';
const WEBAPI_URL = `https://api.themoviedb.org/3`;

const init = () => {
  loadUpcomingMovies();
  search();
}
init();

function loadUpcomingMovies() {
  fetch(`${WEBAPI_URL}/movie/upcoming?api_key=${WEBAPI_KEY}`)
    .then((response) => response.json())
    .then((json) => {
      json.results.forEach((movie) => {
        document.querySelector('.lancamento').innerHTML += `
          <div class="col-md-3 col-4">
            <div class="card mb-3">
              <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="..." class="img-fluid" />
            </div>
          </div>
        `;
      });
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