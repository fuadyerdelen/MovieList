let positionX = 0;
let timer = setInterval(_crsRight, 3000);

function crsLeft() {
    if (positionX < 0) positionX += 206;
    document.getElementById('movieList').style.transform = 'translateX(' + positionX + 'px)';
    clearInterval(timer);
}

function crsRight() {
    clearInterval(timer);
    _crsRight();
}

function _crsRight() {
    let maxSlide = -(20 * 206 - window.innerWidth);
    if (positionX > maxSlide) positionX -= 206;
    else positionX = 0;
    document.getElementById('movieList').style.transform = 'translateX(' + positionX + 'px)';
}

let movies = [];
let movieList = document.getElementById('movieList');




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

        let listItem = document.createElement('li');
        listItem.classList.add('list-group-item', 'border-0');

        let card = document.createElement('div');
        card.classList.add('card', 'slider-card');
        card.style.cursor = 'pointer';
        card.style.height = '420px';
        card.style.width = '200px';


        let slider_img_a = document.createElement('a');
        slider_img_a.addEventListener('click', () => showMovieDetails(movie.getLink()));

        let slider_img = document.createElement('img');
        slider_img.classList.add('card-img-top', 'poster');
        slider_img.setAttribute('src', movie.getPoster());
        slider_img.setAttribute('alt', 'movie poster');

        let card_body = document.createElement('div');
        card_body.classList.add('card-body');

        let card_title_a = document.createElement('a');
        card_title_a.addEventListener('click', () => showMovieDetails(movie.getLink()));

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

        let rate_star = document.createElement("img");
        rate_star.setAttribute('src', 'picture/star.png');
        rate_star.setAttribute('alt', 'movie star');
        rate_star.style.width = '16px';



        movieList.appendChild(listItem);
        listItem.appendChild(card);
        card.appendChild(slider_img_a);
        slider_img_a.appendChild(slider_img);
        card.appendChild(card_body);
        card_body.appendChild(card_title_a);
        card_title_a.appendChild(movie_name);
        card_body.appendChild(movie_atribute);
        movie_atribute.appendChild(movie_year);
        movie_atribute.appendChild(movie_rate);
        movie_rate.appendChild(rate_star);

    });
}

function showMovieDetails(link) {
    let modal = new bootstrap.Modal(document.getElementById('movie_detail_modal'), {});
    return fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=218017c9311f39308d2dd5101ce25b23&language=en-US&page=' + page)
        .then(res => res.json()).then(data => {
            //...

            modal.show();
        });
}

fetchMovies().then(() => fillMovies());


// Next manin Content

let page = 1;

async function fetchTopRatedMovies() {
    return fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=218017c9311f39308d2dd5101ce25b23&language=en-US&page=' + page)
        .then(res => res.json()).then(data => data.results);
}

fillContent();

function nextContent() {
    page++;
    fillContent();
}

function previousContent() {
    page--;
    fillContent();
}

function fillContent(url) {

    let main_content = document.getElementById('main-content');
    main_content.innerHTML = '';
    let movieCardGroup = document.createElement('div');
    movieCardGroup.classList.add('movie-cards-group');
    main_content.appendChild(movieCardGroup);

    const data = fetchTopRatedMovies();

    data.then(results => {

        console.log(results);
        results.forEach(film => {
            let link = 'https://api.themoviedb.org/3/movie/' + film.id + '?api_key=218017c9311f39308d2dd5101ce25b23&language=tr-TR';

            let cont_card = document.createElement('div');
            cont_card.classList.add('card', 'cont-card');
            cont_card.style.cursor = 'pointer';

            let cont_image_a = document.createElement('a');
            cont_image_a.addEventListener('click', () => showMovieDetails(link));
            cont_image_a.style.co

            let cont_image = document.createElement('img');
            cont_image.classList.add('card-img-top', 'cont-poster', 'poster');
            cont_image.setAttribute('alt', 'movie poster');

            let cont_card_body = document.createElement('div');
            cont_card_body.classList.add('cont-card-body', 'card-body');


            let cont_movie_name_a = document.createElement('a');
            cont_movie_name_a.addEventListener('click', () => showMovieDetails(link));

            let cont_movie_name = document.createElement('h5');
            cont_movie_name.classList.add('card-title');
            cont_movie_name.innerHTML = 'movie name';

            let cont_ul = document.createElement('ul');
            cont_ul.classList.add('list-group', 'list-group-flush', 'cont-list');

            let cont_year = document.createElement('li');
            cont_year.classList.add('list-group-item');

            let cont_rate = document.createElement('li');
            cont_rate.classList.add('list-group-item');


            movieCardGroup.appendChild(cont_card);
            cont_card.appendChild(cont_image_a);
            cont_image_a.appendChild(cont_image);
            cont_card.appendChild(cont_card_body);
            cont_card_body.appendChild(cont_movie_name_a);
            cont_movie_name_a.appendChild(cont_movie_name);
            cont_card_body.appendChild(cont_ul);
            cont_ul.appendChild(cont_year);
            cont_ul.appendChild(cont_rate);
        })
    })

};

