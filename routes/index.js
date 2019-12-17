module.exports = {
    getHomePage: (req, res) => {
        if (!req.session.loggedin) return res.redirect('/login');

        //counting all candidates from all stages
        let query0 = "SELECT * FROM candidates WHERE stage = 6";
        let query1 = "SELECT * FROM candidates WHERE stage = 1";
        let query2 = "SELECT * FROM candidates WHERE stage = 2";
        let query3 = "SELECT * FROM candidates WHERE stage = 3";    
        let query4 = "SELECT * FROM candidates WHERE stage = 4";
        let query5 = "SELECT * FROM candidates WHERE stage = 5";
        let query6 = "SELECT * FROM rejected";
        db.query(query0, (err, results0) =>{
            if(err)
                res.redirect('/');
                
            db.query(query1, (err, results1) =>{
                if(err)
                    res.redirect('/');
                db.query(query2,  (err, results2) =>{
                    if(err)
                        res.redirect('/');
                    db.query(query3,  (err, results3) =>{
                        if(err)
                            res.redirect('/');
                            db.query(query4,  (err, results4) =>{
                                if(err)
                                    res.redirect('/');
                                    db.query(query5,  (err, results5) =>{
                                        if(err)
                                            res.redirect('/');
                                        db.query(query6, (err, results6) =>{

                            
                                        res.render('index.ejs', {
                                        title: "Welcome",
                                        stage: 0,
                                        r1: results1.length,
                                        r2: results2.length,
                                        r3: results3.length,
                                        r4: results4.length,
                                        r5: results5.length,
                                        r6: results0.length,
                                        r7: results6.length
                                        });
                                    })
                                });
                            });
                    });
                });
            });
        });
 },

    getStage1: (req, res) => {
        if (!req.session.loggedin) return res.redirect('/login');
        let query = "SELECT * FROM `candidates` WHERE stage = 1 ORDER BY id ASC"; // query database to get all the players

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
        let query = "SELECT * FROM `candidates` WHERE stage = 2 ORDER BY id ASC"; // query database to get all the players

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
        let query = "SELECT * FROM `candidates` WHERE stage = 3 ORDER BY id ASC"; // query database to get all the players

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
        let query = "SELECT * FROM `candidates` WHERE stage = 4 ORDER BY id ASC"; // query database to get all the players

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
        let query = "SELECT * FROM `candidates` WHERE stage = 5 ORDER BY id ASC"; // query database to get all the players

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
    },
    getStage6: (req, res) => {
        if (!req.session.loggedin) return res.redirect('/login');
        let query = "SELECT * FROM `candidates` WHERE stage = 6 ORDER BY id ASC"; // query database to get all the players

        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('table.ejs', {
                title: "WeCode",
                candidates: result,
                stage: 6
            });
        });
    },
    getRejected: (req, res) => {
        if (!req.session.loggedin) return res.redirect('/login');
        let query = "SELECT * FROM `rejected` ORDER BY id ASC"; // query database to get all the players

        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('table.ejs', {
                title: "WeCode",
                candidates: result,
                stage: 7
            });
        });
    }
};