function checkMovieAdded(data) {

    if (!user) {
        return false;
    }
    if (!!user && !user.movieList) {
        return true;
    }

    return (user.movieList.filter(movie => movie.id === data.id)).length === 0;
}

function addMovie(data) {

    if (!user.movieList) {
        user.movieList = [];
    }
    user.movieList.push(data);
    localStorage.setItem(user.email, JSON.stringify(user));

}


function fillMovieList() {

    if (!user.movieList) {
        user.movieList = [];
    }

    let movieList = document.getElementById('movie_list');
    movieList.innerHTML = '';

    user.movieList.forEach(movie => {


        let getMovieName = movie.title;

        let movieLi = document.createElement('li');
        movieLi.classList.add('list-group-item')

        let movieName = document.createElement('h6');
        movieName.innerText = getMovieName;

        let removeButton = document.createElement('button');
        removeButton.classList.add('btn-danger');
        removeButton.innerText = 'remove';
        removeButton.addEventListener('click', () => {
            user.movieList = user.movieList.filter(m => m.id !== movie.id);
            localStorage.setItem(user.email, JSON.stringify(user));
            fillMovieList();
        });


        movieList.appendChild(movieLi);
        movieLi.appendChild(movieName);
        movieLi.appendChild(removeButton);
    });


}