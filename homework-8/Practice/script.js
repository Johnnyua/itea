window.addEventListener('load', init);

function init() {
    // users [
    //     {name
    //     email
    //     password}
    // ]

    if (!localStorage.users) {
        localStorage.setItem('users', '[]');
    }

    var logIn = document.getElementById('log-in');
    var registration = document.getElementById('registration');
    var account = document.getElementById('account');
    var logInBtn = document.querySelector('#log-in [type="button"]');
    var registrationBtn = document.querySelector('#registration [type="button"]');
    var accountBtn = document.querySelector('#account [type="button"]');
    var user = {};
    
    logInBtn.addEventListener('click', logInHandler);
    registrationBtn.addEventListener('click', registrationHandler);
    accountBtn.addEventListener('click', accountHandler);

    function logInHandler() {
        var users = JSON.parse(localStorage.users);
        var email = document.querySelector('#log-in [type="email"]');
        var password = document.querySelector('#log-in [type="password"]');

        //var currentUser = users.find((u) => u.email === email.value && u.password === password.value);
        const indexOfUser = findUser(users, email.value, password.value);

        indexOfUser !== -1
            ? ((logIn.style.display = "none"),
                (account.style.display = "flex"),
                Object.assign(user, users[indexOfUser]),
                showAccount())
            : ((logIn.style.display = "none"),
                (registration.style.display = "flex"));
    }

    function findUser(users, email, password) {
      indexOfUser = users.findIndex(
        (u) => u.email === email && u.password === password
      );
      return indexOfUser;
    }

    function registrationHandler() {
        
        for (var child of registration.children) {
            if (child.type !== 'button') user[child.name] = child.value;
        }

        var tmpUsers = JSON.parse(localStorage.users);
        tmpUsers.push(user);
        localStorage.users = JSON.stringify(tmpUsers);
        showAccount();
    }

    function showAccount() {
        registration.style.display = 'none'; 
        account.style.display = 'flex';

        for (var child of account.children) {
            if (child.type !== 'button') {
                child.value = user[child.name];
                // user[child.name] = child.value;
                // switch (child.type) {
                //     case 'email': child.value = user.email; break;
                //     case 'password': child.value = user.password; break;
                //     case 'text': child.value = user.name; break;
                // }
            };
        }
    }

    function accountHandler(e) {
        var users = JSON.parse(localStorage.users);
        const index = findUser(users, user.email, user.password);
        for (var child of account.children) {
            if (child.type !== 'button') {
                users[index][child.name] = child.value;
            }
        }
        localStorage.users = JSON.stringify(users);
        logIn.style.display = "flex";
        account.style.display = "none";
    }
}