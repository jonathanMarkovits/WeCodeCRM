module.exports = {
    getHomePage: (req, res) => {
        res.render('index.ejs', { title: "Welcome" });
    },

    getStage1: (req, res) => {
        let query = "SELECT * FROM `stage1` ORDER BY id ASC"; // query database to get all the players
        
        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('table.ejs', {
                title: "Welcome to Socka",
                candidates: result
            });
        });
    },

    getStage2: (req, res) => {
        let query = "SELECT * FROM `stage2` ORDER BY id ASC"; // query database to get all the players
        
        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('table.ejs', {
                title: "Welcome to Socka",
                candidates: result
            });
        });
    },

    getStage3: (req, res) => {
        let query = "SELECT * FROM `stage3` ORDER BY id ASC"; // query database to get all the players
        
        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('table.ejs', {
                title: "Welcome to Socka",
                candidates: result
            });
        });
    },

    getStage4: (req, res) => {
        let query = "SELECT * FROM `stage4` ORDER BY id ASC"; // query database to get all the players
        
        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('table.ejs', {
                title: "Welcome to Socka",
                candidates: result
            });
        });
    },

    getStage5: (req, res) => {
        let query = "SELECT * FROM `stage5` ORDER BY id ASC"; // query database to get all the players
        
        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('table.ejs', {
                title: "Welcome to Socka",
                candidates: result
            });
        });
    }
};