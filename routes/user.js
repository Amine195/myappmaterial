module.exports = (app) => {

    // Home Page
    app.get('/', (req, res, next) => {
        res.render('index', {title: 'Index || GZL'});
    });

    // Register Page
    app.get('/register', (req, res, next) => {
        res.render('user/register', {title: 'Register || GZL'});
    });

    // Login Page
    app.get('/login', (req, res, next) => {
        res.render('user/login', {title: 'Login || GZL'});
    });

}