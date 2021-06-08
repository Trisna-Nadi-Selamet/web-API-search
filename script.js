// $('.search-button').on('click', function () {
//   $.ajax({
//     url: 'http://www.omdbapi.com/?apikey=4deb5178&s=' + $('.input-keyword').val(),
//     success: (results) => {
//       const movies = results.Search;
//       let cards = '';
//       movies.forEach((m) => {
//         cards += showCards(m);
//       });
//       $('.movie-container').html(cards);
//       $('.modal-detail-button').on('click', function () {
//         //   console.log($(this).data('imdbid')); test step id
//         $.ajax({
//           url: 'http://www.omdbapi.com/?apikey=4deb5178&i=' + $(this).data('imdbid'),
//           success: (m) => {
//             const movieDetail = showMovies(m);
//             $('.modal-body').html(movieDetail);
//           },
//           error: (e) => {
//             console.log(e.reponseText);
//           },
//         });
//       });
//     },
//     error: (e) => {
//       console.log(e.reponseText);
//     },
//   });
// });

//menggunakan fetch
// const searchButton = document.querySelector('.search-button');
// //event handle ----->
// searchButton.addEventListener('click', function () {
//   const inputKeyword = document.querySelector('.input-keyword');
//   fetch('http://www.omdbapi.com/?apikey=4deb5178&s=' + inputKeyword.value)
//     .then((res) => res.json())
//     .then((res) => {
//       const movies = res.Search;
//       let cards = '';
//       movies.forEach((m) => (cards += showCards(m)));
//       const movieContainer = document.querySelector('.movie-container');
//       movieContainer.innerHTML = cards;

//       //ketiks tombol di klik
//       const modalDetailButton = document.querySelectorAll('.modal-detail-button');
//       modalDetailButton.forEach((btn) => {
//         btn.addEventListener('click', function () {
//           // console.log(this); event klik id
//           const imdbid = this.dataset.imdbid;
//           fetch('http://www.omdbapi.com/?apikey=4deb5178&i=' + imdbid)
//             .then((res) => res.json()) //promise
//             .then((m) => {
//               //olahan promise
//               const movieDetail = showMovies(m);
//               const modalBody = document.querySelector('.modal-body');
//               modalBody.innerHTML = movieDetail;
//             });
//         });
//       });
//     });
// });

//asyn Wait
const searchButton = document.querySelector('.search-button');
searchButton.addEventListener('click', async function () {
  try {
    const inputKeyword = document.querySelector('.input-keyword');
    const movies = await getMovies(inputKeyword.value);
    updateUI(movies);
  } catch (err) {
    alert(err);
  }
});

function getMovies(keyword) {
  return fetch('http://www.omdbapi.com/?apikey=4deb5178&s=' + keyword)
    .then((res) => {
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      return res.json();
    })
    .then((res) => {
      if (res.Response === 'False') {
        throw new Error(res.Error);
      }
      return res.Search;
    });
}
function updateUI(movies) {
  let cards = '';
  movies.forEach((m) => (cards += showCards(m)));
  const movieContainer = document.querySelector('.movie-container');
  movieContainer.innerHTML = cards;
}

//event binding
document.addEventListener('click', async function (e) {
  if (e.target.classList.contains('modal-detail-button')) {
    const imdbid = e.target.dataset.imdbid;
    const movieDetail = await getMovieDetail(imdbid);
    updateDeatil(movieDetail);
  }
});

function getMovieDetail(imdbid) {
  return fetch('http://www.omdbapi.com/?apikey=4deb5178&i=' + imdbid)
    .then((res) => res.json()) //promise
    .then((m) => m);
}
function updateDeatil(m) {
  const movieDetail = showMovies(m);
  const modalBody = document.querySelector('.modal-body');
  modalBody.innerHTML = movieDetail;
}

function showCards(m) {
  return `
  <div class="col-md-4 my-3">
   <div class="card">
   <img src="${m.Poster}" class="card-img-top" />
   <div class="card-body">
     <h5 class="card-title">${m.Title}</h5>
     <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
     <a href="#" class="btn btn-primary modal-detail-button" data-toggle="modal" data-target="#showMoviesmodal" data-imdbid="${m.imdbID}">Show Details</a>
   </div>
 </div>
</div>`;
}
function showMovies(m) {
  return `<div class="container-fluid">
  <div class="row">
    <div class="col-md-3">
      <img src="${m.Poster}" class="img-fluid" />
    </div>
    <div class="col-md">
      <ul class="lit-group">
        <li class="list-group-item"><h4> ${m.Title} ${m.Year}</h4></li>
        <li class="list-group-item"><strong>Director :</strong> ${m.Director}</li>
        <li class="list-group-item"><strong>Actors :</strong> ${m.Actors}</li>
        <li class="list-group-item"><strong>Write :</strong> ${m.Writer}</li>
        <li class="list-group-item"><strong>Plot :</strong><br /> ${m.Plot}</li>
      </ul>
    </div>
  </div>
</div>`;
}
