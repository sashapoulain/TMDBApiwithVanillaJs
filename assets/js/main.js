document.addEventListener('DOMContentLoaded', () => {
    let form = document.getElementById('searchForm')



    if (window.location.pathname === '/index.html' || window.location.pathname === '/') {
        form.addEventListener('submit', function (ev) {
            ev.preventDefault();
            searchMovies();
        })


        async function searchMovies() {
            const query = document.getElementById('query').value.trim();
            if (query) {
                const url = `https://api.themoviedb.org/3/search/movie?api_key=20384d97a60b1bc7703ffa54852f1607&query=${encodeURIComponent(query)}`;

                try {
                    const resp = await fetch(url)
                    const data = await resp.json();
                    // console.log(data);
                    renderMovies(data.results);
                }
                catch (error) {
                    // console.log(error);
                }
            }
        }
        function renderMovies(movies) {
            const list = document.getElementById('moviesList');
            list.innerHTML = '';
            if (movies.length > 0) {
                movies.forEach(movie => {
                    const li = document.createElement('li');
                    li.classList.add('movie');
                    li.innerHTML = `

                    <div class="movie-card mb-3">
                        <div class="movie-poster">
                            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="img-fluid" alt="${movie.title}">
                        </div>
                        <div class="movie-detail-wrapper">
                            <div class="movie-detail">
                                <h5 class="movie-title">${movie.title}</h5>
                                <p><span>${movie.release_date}</span></p>
                                <p><i class="bi bi-star-fill"></i> ${movie.vote_average}</p>
                            </div>
                       

                        </div>
                    </div>
                `
                    list.appendChild(li);
                });
            } else {
                list.innerHTML = `
                    
                    <div class="no-results">
                    <h2>Sonuç Bulunamadı</h2>
                    </div>
                    `
            }
        }

        const url = `https://api.themoviedb.org/3/movie/popular?api_key=20384d97a60b1bc7703ffa54852f1607&language=en-US&page=1`


        fetch(url).then(res => {
            if (!res.ok) {
                throw new Error('error' + res.statusText)
            }
            return res.json()
        })
            .then(data => {
                // console.log(data.results)
                const results = data.results;
                // console.log(results)
                const moviesList = document.getElementById('moviesList')
                results.forEach((movie) => {
                    // console.log(movie)
                    const movieCard = `
                    <li class="mt-4">
                       <div class="movie-card mb-3">
                          <div class="movie-poster">
                             <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="img-fluid" alt="${movie.title}">
                          </div>
                          <div class="movie-detail-wrapper">
                             <div class="movie-detail">
                                <h2>${movie.title}</h2>
                                <p><span>${movie.release_date}</span></p>
                                <p><i class="bi bi-star-fill"></i> ${movie.vote_average}</p>
                             </div>
                             <div class="info">
                                <a data-toggle="tooltip" title="Click me!"><i class="bi bi-info-circle movie-info" data-movie-id="${movie.id}"></i></a>
                             </div>
                          </div>
                       </div>
                    </li>
              `;
                    moviesList.innerHTML += movieCard
                })
                const infoIcon = document.querySelectorAll('.movie-info')
                infoIcon.forEach((icon) => {
                    icon.addEventListener('click', () => {
                        let tooltips = document.querySelectorAll('[data-toggle="tooltip"]');
                        for (let i = 0; i < tooltips.length; i++) {
                            let tooltip = new bootstrap.Tooltip(tooltips[i]);
                        }
                        const movieId = icon.dataset.movieId;
                        window.location.href = `movie-details.html?id=${movieId}`;
                    })
                })
            })
    }
    if (window.location.pathname === '/movie-details.html') {

        // console.log('deneme')
        const movieId = new URLSearchParams(window.location.search).get('id');
        // console.log(movieId)
        const url =
            'https://api.themoviedb.org/3/movie/' + movieId + '?api_key=20384d97a60b1bc7703ffa54852f1607&language=en-US&page=1';
        fetch(url).then(r => {
            return r.json()
            // console.log(r.json())
        }).then(d => {
            // console.log(d)
            const cardDet = document.getElementById('card-det')
            cardDet.innerHTML = `
            
               <div class="movie-card mb-3">
                        <div class="movie-poster">
                            <img src="https://image.tmdb.org/t/p/w500/${d.poster_path}" class="img-fluid" alt="title">
                        </div>
                        <div class="movie-detail-wrapper">
                            <div class="movie-detail">
                                <h2 class="card-title" id="movie-title">${d.title}</h2>
                                <p class="card-text" id="movie-overview">${d.overview}</p>
                            </div>
                        </div>
                    </div>

            `
        })
    }



})


