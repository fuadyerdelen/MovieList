// function crsLeft() {
//     // transform: translateX(-190 px);

//     document.querySelectorAll('.carousel-li').forEach(function (element) {

//         element.style.transform = 'translateX(-120px)';
//     });
// }

// function crsRight() {

//     document.querySelectorAll('.carousel-li').forEach(function (element) {

//         element.style.transform = 'translateX(120px)';
//         element.style.transitionDuration = '2s';
//     });
// }

let movies = [];
let slider = document.getElementById('slider');

async function fetchMovies() {
    return fetch('https://api.themoviedb.org/3/movie/popular?api_key=218017c9311f39308d2dd5101ce25b23&language=tr-TR&page=1')
        .then(res => res.json()).then(data => {
            data.results.forEach(m => {
                let movie = {};
                movie.poster = m.poster_path;
                movie.id = m.id;
                movie.year = m.release_date;
                movie.rate = m.vote_average;
                movie.name = m.title;
                movie.getLink = function () {
                    return 'https://api.themoviedb.org/3/movie/' + this.id +
                        '?api_key=218017c9311f39308d2dd5101ce25b23&language=tr-TR';
                }
                movie.getPoster = function () {
                    return 'https://image.tmdb.org/t/p/w185' + this.poster;
                }
                movies.push(movie);
            })
        });
}

function fillMovies() {
    movies.forEach(movie => {

        let card = document.createElement('div');
        card.classList.add('card');

        let slider_img_a = document.createElement('a');
        slider_img_a.setAttribute('href', movie.getLink());

        let slider_img = document.createElement('img');
        slider_img.classList.add('card-img-top', 'poster');
        slider_img.setAttribute('src', movie.getPoster());
        slider_img.setAttribute('alt', 'movie poster');

        let card_body = document.createElement('div');
        card_body.classList.add('card-body');

        let card_title_a = document.createElement('a');
        card_title_a.setAttribute('href', movie.getLink());

        let movie_name = document.createElement('h5');
        movie_name.classList.add('card-title');
        movie_name.innerHTML = movie.name;

        let movie_atribute = document.createElement('ul');
        movie_atribute.classList.add('list-group', 'list-group-flush');

        let movie_year = document.createElement('li');
        movie_year.classList.add('list-group-item');
        movie_year.innerHTML = movie.year;

        let movie_rate = document.createElement('li');
        movie_rate.classList.add('list-group-item');
        movie_rate.innerHTML = movie.rate;



        slider.appendChild(card);
        card.appendChild(slider_img_a);
        slider_img_a.appendChild(slider_img);
        card.appendChild(card_body);
        card_body.appendChild(card_title_a);
        card_title_a.appendChild(movie_name);
        card_body.appendChild(movie_atribute);
        movie_atribute.appendChild(movie_year);
        movie_atribute.appendChild(movie_rate);

    });
}

fetchMovies().then(() => fillMovies());