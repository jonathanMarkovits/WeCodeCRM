const fs = require('fs');

module.exports = {
    addCandidatePage: (req, res) => {
        if (!req.session.loggedin) return res.redirect('/login');

        res.render('add-candidate.ejs', {
            title: "Welcome to WeCode CRM",
            message: ''
        });
    },

    addCandidate: (req, res) => {
        //let message = '';
        let first_name = req.body.first_name;
        let last_name = req.body.last_name;
        let mail = req.body.mail;
        let gender = req.body.gender;
        let birthdate = req.body.birthdate
        let phone_number = req.body.phone_number;
        let stage = 1;

        // send the player's details to the database
        let query = "INSERT INTO `candidates` (first_name, last_name, stage) VALUES ('" +
            first_name + "', '" + last_name + "', '" + stage + "')";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });
    },

    editCandidatePage: (req, res) => {
        let candidateId = req.params.id;
        //let candidateStage = req.params.stage;
        let query = "SELECT * FROM `candidates` WHERE serial_number = '" + candidateId + "'";

        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }

            if (!req.session.loggedin) return res.redirect('/login');
            res.render('edit-candidate.ejs', {
                title: "Edit  Candidate",
                candidate: result[0],
                message: ''
            });
        });
    },

    editCandidate: (req, res) => {
        let candidateId = req.params.id;
        //let currentStage = req.params.stage;
        let first_name = req.body.first_name;
        let last_name = req.body.last_name;
        let newStage = req.body.new_stage[req.body.new_stage.length - 1];

        // send the candidate's details to the database
        let insertUserQuery = "UPDATE `candidates` SET `first_name` = '" + first_name + "', `last_name` = '" + last_name + "', `stage` = '" + newStage + "' WHERE `serial_number` = '" + candidateId + "'";
        db.query(insertUserQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });
    },

    deleteCandidate: (req, res) => {
        let playerId = req.params.id;
        //let stage = req.params.stage;
        let deleteUserQuery = 'DELETE FROM `candidates` WHERE serial_number = "' + playerId + '"';


        db.query(deleteUserQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });
    }
};