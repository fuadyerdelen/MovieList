// slider function

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

// card elemnt

let lang = 'en-En';

function createCard(film) {

    let link = 'https://api.themoviedb.org/3/movie/' + film.id + '?api_key=218017c9311f39308d2dd5101ce25b23&language=' + lang;

    let getPoster = 'https://image.tmdb.org/t/p/w185' + film.poster_path;

    let cont_card = document.createElement('div');
    cont_card.classList.add('card', 'cont-card', 'border-info');


    let cont_image_a = document.createElement('a');
    cont_image_a.addEventListener('click', () => showMovieDetails(link));


    let cont_image = document.createElement('img');
    cont_image.classList.add('card-img-top', 'cont-poster', 'poster');
    cont_image.setAttribute('src', getPoster)
    cont_image.setAttribute('alt', 'movie poster');


    let cont_card_body = document.createElement('div');
    cont_card_body.classList.add('cont-card-body', 'card-body');


    let cont_movie_name_a = document.createElement('a');
    cont_movie_name_a.addEventListener('click', () => showMovieDetails(link));

    let cont_movie_name = document.createElement('h5');
    cont_movie_name.classList.add('card-title');
    cont_movie_name.innerHTML = film.title;

    let cont_ul = document.createElement('ul');
    cont_ul.classList.add('list-group', 'list-group-flush', 'cont-list');

    let cont_year = document.createElement('li');
    cont_year.classList.add('list-group-item');
    const convertDate = (date) => {
        const dateArr = date.split('-');
        return dateArr[2] + '/' + dateArr[1] + '/' + dateArr[0];
    }
    cont_year.innerHTML = convertDate(film.release_date);

    let cont_rate = document.createElement('li');
    cont_rate.classList.add('list-group-item');
    cont_rate.innerHTML = film.vote_average;

    let rate_star = document.createElement("img");
    rate_star.setAttribute('src', 'picture/star.png');
    rate_star.setAttribute('alt', 'movie star');
    rate_star.style.width = '16px';


    cont_card.appendChild(cont_image_a);
    cont_image_a.appendChild(cont_image);
    cont_card.appendChild(cont_card_body);
    cont_card_body.appendChild(cont_movie_name_a);
    cont_movie_name_a.appendChild(cont_movie_name);
    cont_card_body.appendChild(cont_ul);
    cont_ul.appendChild(cont_year);
    cont_ul.appendChild(cont_rate);
    cont_rate.appendChild(rate_star);

    return cont_card;
}


// fill movie Slider
function fillPopularMovies() {

    let movieList = document.getElementById('movieList');
    movieList.innerHTML = '';
    fetch('https://api.themoviedb.org/3/movie/popular?api_key=218017c9311f39308d2dd5101ce25b23&language=' + lang + 'N&page=1')
        .then(res => res.json()).then(data => {
            data.results.forEach(film => {

                let listItem = document.createElement('li');
                listItem.classList.add('list-group-item', 'border-0');
                let card = createCard(film);

                movieList.appendChild(listItem);
                listItem.appendChild(card);
            })
        });
}

// fill movie Card Group
function fillTopRatedMovies() {

    let main_content = document.getElementById('main-content');
    main_content.innerHTML = '';
    let movieCardGroup = document.createElement('div');
    movieCardGroup.classList.add('movie-cards-group');
    main_content.appendChild(movieCardGroup);

    fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=218017c9311f39308d2dd5101ce25b23&language=' + lang + '&page=' + page)
        .then(res => res.json()).then(data => {
            //  console.log(data); why results?....
            data.results.forEach(film => {

                let card = createCard(film);
                movieCardGroup.appendChild(card);

            })
        });
}

// Movie details
function showMovieDetails(link) {

    let modal = new bootstrap.Modal(document.getElementById('movie_detail_modal'), {});

    return fetch(link)
        .then(res => res.json()).then(data => {

            console.log(data);

            let detailPoster = document.getElementById('movie_details_poster');
            let detailOverview = document.getElementById('movie_detail_summary');
            let detailName = document.getElementById('movie_details_name');
            let detailRate = document.getElementById('movie_details_rate');
            let detailSlogan = document.getElementById('movie_detail_slogan');
            let detailDate = document.getElementById('movie_detail_year');

            let getPoster = 'https://image.tmdb.org/t/p/w185' + data.poster_path;

            const convertDate = (date) => {
                const dateArr = date.split('-');
                return dateArr[2] + '/' + dateArr[1] + '/' + dateArr[0];
            }

            detailPoster.setAttribute('src', getPoster);
            detailOverview.innerHTML = data.overview;
            detailName.innerHTML = data.title;
            detailSlogan.innerHTML = data.tagline;
            detailRate.innerHTML = data.vote_average;
            detailDate.innerHTML = convertDate(data.release_date);

             

            const btnAdd = document.getElementById('add_movie_btn');
            if (!checkMovieAdded(data)) {
                btnAdd.setAttribute("disabled", "true");
            } else {
                btnAdd.removeAttribute("disabled");
                const addMovieFunc = () => {
                    addMovie(data);
                    btnAdd.setAttribute("disabled", "true");
                    btnAdd.removeEventListener('click', addMovieFunc);
                }
                btnAdd.addEventListener('click', addMovieFunc);
            }




            modal.show();
        });
}


// Chance languange 
function chanceLang(a, b) {
    document.getElementById('dropdownMenuLink').innerHTML = b;
    lang = a;
    fillPopularMovies();
    fillTopRatedMovies();
}


// Next manin Content
let page = 1;

fillPopularMovies();
fillTopRatedMovies();


function nextContent() {
    page++;
    fillTopRatedMovies();
}

function previousContent() {
    page--;
    fillTopRatedMovies();
}



document.getElementById('icon_btn').addEventListener('click', () => {
    window.location.reload();
})