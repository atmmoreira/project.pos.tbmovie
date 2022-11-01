const WEBAPI_KEY = '3a6dacbb2c787551536f07cfc546eba1';
const WEBAPI_URL = `https://api.themoviedb.org/3`;

const init = () => {
  loadUpcomingMovies();
  generateGenresList();
  handleGenreMovies();
}
init();

function loadUpcomingMovies() {
  fetch(`${WEBAPI_URL}/movie/upcoming?api_key=${WEBAPI_KEY}`)
    .then((response) => response.json())
    .then((json) => {
      const resultMovies = json.results;
      const randomId = Math.floor(Math.random() * resultMovies.length);

      const carousel = document.querySelector('.movies');
      carousel.innerHTML = `
          <div class="row">
            <div class="col-md-6 text-center">
              <img src="https://image.tmdb.org/t/p/w500/${resultMovies[randomId].poster_path}" alt="..." class="img-fluid" />
            </div>
            <div class="col-md-6">
              <h1 class="title-movie mb-4"><a href="https://www.themoviedb.org/movie/${resultMovies[randomId].id}" target="_blank">${resultMovies[randomId].title}</a></h1>
              <h4 class="mb-3">
                ${resultMovies[randomId].overview}
              </h4>
              <div class="mb-3">
                <div class="row">
                  <div class="col-md-12"><b>Data Lançamento:</b> ${resultMovies[randomId].release_date}</div>
                </div>
              </div>
              <h2 class="avaliacao-movie">
                Avaliação: ${resultMovies[randomId].vote_average}
              </h2>
            </div>
          </div>
        `;
    });
}

function generateGenresList() {
  fetch(`${WEBAPI_URL}/genre/movie/list?api_key=${WEBAPI_KEY}&language=pt`)
    .then((response) => response.json())
    .then((json) => {
      const categoryMovies = document.querySelector('.category');

      for (const key in json) {
        const listGenres = Array.from(json[key]);
        listGenres.forEach((el) => {
          categoryMovies.innerHTML += `<option value="${el.id}"> ${el.name} </option>`;
        });
      }
    });
}

function handleGenreMovies() {
  const categoryMovies = document.querySelector('.category');
  const loadMovies = document.querySelector('.movies');

  categoryMovies.addEventListener('change', () => {
    console.log(categoryMovies.value);
  });
}

function filterMoviesByCategory(category){

}
