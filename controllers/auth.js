exports.getLogin = (req, res, next) => {

    console.log('session', res.session)
    res.render("auth/login", {
        path: "/login",
        pageTitle: "Login",
        isAuthenticated: false
    });
};

exports.postLogin = (req, res, next) => {
    res.session.isLoggedIn = true
    res.redirect("/")
}
