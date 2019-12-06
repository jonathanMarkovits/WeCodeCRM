module.exports = {
    getHomePage: (req, res) => {
        if (!req.session.loggedin) return res.redirect('/login');

        res.render('index.ejs', {
            title: "Welcome",
            stage: 0
        });
    },

    getStage1: (req, res) => {
        if (!req.session.loggedin) return res.redirect('/login');
        let query = "SELECT * FROM `stage1` ORDER BY id ASC"; // query database to get all the players

        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('table.ejs', {
                title: "WeCode",
                candidates: result,
                stage: 1
            });
        });
    },

    getStage2: (req, res) => {
        if (!req.session.loggedin) return res.redirect('/login');
        let query = "SELECT * FROM `stage2` ORDER BY id ASC"; // query database to get all the players

        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('table.ejs', {
                title: "WeCode",
                candidates: result,
                stage: 2
            });
        });
    },

    getStage3: (req, res) => {
        if (!req.session.loggedin) return res.redirect('/login');
        let query = "SELECT * FROM `stage3` ORDER BY id ASC"; // query database to get all the players

        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('table.ejs', {
                title: "WeCode",
                candidates: result,
                stage: 3
            });
        });
    },

    getStage4: (req, res) => {
        if (!req.session.loggedin) return res.redirect('/login');
        let query = "SELECT * FROM `stage4` ORDER BY id ASC"; // query database to get all the players

        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('table.ejs', {
                title: "WeCode",
                candidates: result,
                stage: 4
            });
        });
    },

    getStage5: (req, res) => {
        if (!req.session.loggedin) return res.redirect('/login');
        let query = "SELECT * FROM `stage5` ORDER BY id ASC"; // query database to get all the players

        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('table.ejs', {
                title: "WeCode",
                candidates: result,
                stage: 5
            });
        });
    }
};