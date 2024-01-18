(() => {
  const mainDiv = document.querySelector(".main-div");
  const movieBox = document.querySelector("#character-box");
  const reviewTemplate = document.querySelector("#movie-template");
  const filmCon = document.querySelector("#film-con");
  const baseUrl = `https://swapi.dev/api/people/`;

  function getMovies() {
    fetch(`${baseUrl}?page=2`)
      .then((response) => response.json())
      .then(function (response) {
        console.log(response.results);
        const movies = response.results;
        const ul = document.createElement("ul");
        movies.forEach((movie) => {
          const li = document.createElement("li");
          const a = document.createElement("a");
          //  console.log(movie.name);
          //console.log(movie.films[0]);

          a.textContent = movie["name"];
          a.dataset.film = movie.films[0];

          li.appendChild(a);
          ul.appendChild(li);
        });
        movieBox.appendChild(ul);
      })
      .then(function () {
        const links = document.querySelectorAll("#character-box li a");
        links.forEach((link) => {
          link.addEventListener("click", getFilm);
        });
      })
      .catch((error) => {
        console.error(
          "You don't have internet or your internet is slow, try again later.",
          error
        );
        mainDiv.innerHTML =
          "Failed to load. Some data requirements failed to load. Please try again later.";
      });
  }
  function getFilm(e) {
    const filmID = e.currentTarget.dataset.film;
    //https://swapi.dev/api/films/1/

    fetch(`${filmID}`)
      .then((response) => response.json())
      .then(function (response) {
        filmCon.innerHTML = "";

        const template = document.importNode(reviewTemplate.content, true);

        const reviewBody = template.querySelector(".review-description");
        const movieTitle = template.querySelector(".movie-title");

        movieTitle.innerHTML = response.title;
        reviewBody.innerHTML = response.opening_crawl;

        // reviewBody.innerHTML = response.title;
        filmCon.appendChild(template);
      })
      .catch((error) => {
        console.error(
          "You don't have internet or your internet is slow, try again later.",
          error
        );

        mainDiv.innerHTML = "Failed to load content. Please try again.";
      });
  }

  getMovies();
})();
