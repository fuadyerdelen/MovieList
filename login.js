let user = null;

function register(username, password) {

    let getName = document.getElementById('registerInputName').value;
    let getEmail = document.getElementById('registerInputEmail1').value;
    let getPassword = document.getElementById('registerInputPassword1').value;

    email = getEmail;
    username = getName;
    password = getPassword;

    let newUser = {

        email: email,
        username: username,
        password: password,

    }

    localStorage.setItem(email, JSON.stringify(newUser));
};




function login() {

    let getEmail = document.getElementById('loginInputEmail1').value;
    let getPassword = document.getElementById('loginInputPassword1').value;

    user = JSON.parse(localStorage.getItem(getEmail));


    if (!!user && user.email === getEmail && user.password === getPassword) {
        window.alert('Wellcome' + ' ' + user.username)
        document.getElementById('login_btn').classList.add('d-none');
        document.getElementById('register_btn').classList.add('d-none');
        document.getElementById('logout_btn').classList.remove('d-none');
        document.getElementById('mylist_btn').classList.remove('d-none');

    } else {
        window.alert('Password ore email is not valid!')
    }

    document.getElementById('user').innerText = user.username;

};

function logout() {
    user = null;
    document.getElementById('login_btn').classList.remove('d-none');
    document.getElementById('register_btn').classList.remove('d-none');
    document.getElementById('logout_btn').classList.add('d-none');
    document.getElementById('mylist_btn').classList.add('d-none');
}