module.exports = {
    getLoginPage: (req, res) => {
        res.render('login.ejs', {
            message: '',
            title: 'WeCode'
        });
    },

    login: (req, res) => {
        let username = req.body.username;
        let password = req.body.password;

        if (username && password) {
            db.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function (error, results, fields) {
                if (results.length > 0) {
                    req.session.loggedin = true;
                    req.session.username = username;
                    res.redirect('/');
                } else {
                    res.render('login.ejs', {
                        message: 'Incorrect Username and/or Password!',
                        title: 'WeCode'
                    });
                }
                res.end();
            });
        } else {
            res.render('login.ejs', {
                message: 'Please enter Username and Password!',
                title: 'WeCode'
            });
            res.end();
        }
    }
};