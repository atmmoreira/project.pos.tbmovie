const WEBAPI_KEY = '3a6dacbb2c787551536f07cfc546eba1';
const WEBAPI_URL = `https://api.themoviedb.org/3`;

const init = () => {
  loadUpcomingMovies();
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