function login() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var data = {
        username: username,
        password: password
    };

    if (username == "admin" && password == "admin") {
        //open home.html from login.html
        window.location.href = "file://wsl.localhost/Ubuntu/home/saleemi/website/home.html";
    } else {
        //show text "Login failed"
        document.getElementById("login-error").style.display = "block";
    }
}