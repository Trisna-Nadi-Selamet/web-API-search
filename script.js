$('.search-button').on('click', function () {
  $.ajax({
    url: 'http://www.omdbapi.com/?apikey=4deb5178&s=' + $('.input-keyword').val(),
    success: (results) => {
      const movies = results.Search;
      let cards = '';
      movies.forEach((m) => {
        cards += `
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
      });
      $('.movie-container').html(cards);
      $('.modal-detail-button').on('click', function () {
        //   console.log($(this).data('imdbid')); test step id
        $.ajax({
          url: 'http://www.omdbapi.com/?apikey=4deb5178&i=' + $(this).data('imdbid'),
          success: (m) => {
            const movieDetail = `<div class="container-fluid">
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
            $('.modal-body').html(movieDetail);
          },
          error: (e) => {
            console.log(e.reponseText);
          },
        });
      });
    },
    error: (e) => {
      console.log(e.reponseText);
    },
  });
});
