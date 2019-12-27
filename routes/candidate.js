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
        let first_name = req.body.first_name;
        let last_name = req.body.last_name;
        let full_name = first_name+" "+last_name;
        let id = req.body.id;
        let mail = req.body.mail;
        let gender = req.body.gender;
        let birthdate = req.body.birthdate
        let phone_number = req.body.phone_number;
        let address = req.body.address;
        let stage = 1;
        let file1 = req.files.file1;
        let file2 = req.files.file2;
        // send the candidate details to the database
        let query = "INSERT INTO `candidates` (first_name, last_name, id, mail, gender, birthdate, phone_number, address, stage) VALUES ('" +
            first_name + "', '" + last_name + "', '" + id + "', '" + mail + "', '" + gender + "', '" + birthdate + "', '" + phone_number + "', '" + address + "', '" + stage + "')";
        let query2 = "INSERT INTO `documents` (doc, doc_user, date_entered, doc_stage, doc_candidate) VALUES ('" +file1 + "', '"+first_name+"', '" + birthdate + "', '" + stage + "','"+ full_name + "')";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            db.query(query2, (err, reesult)=>{
                if(err) return res.status(500).send(err);  
                res.redirect('/');
     
            });
        });
    },

    editCandidatePage: (req, res) => {
        let candidateId = req.params.id;
        let query = "SELECT * FROM `candidates` WHERE serial_number = '" + candidateId + "'";

        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }

            if (!req.session.loggedin) return res.redirect('/login');
            res.render('edit-candidate.ejs', {
                title: "Edit Candidate",
                candidate: result[0],
                message: ''
            });
        });
    },

    editCandidate: (req, res) => {
        let candidateSerialNumber = req.params.id;
        let first_name = req.body.first_name;
        let last_name = req.body.last_name;
        let newStage = req.body.new_stage[req.body.new_stage.length - 1];

        // send the candidate's details to the database
        let insertUserQuery = "UPDATE `candidates` SET `first_name` = '" + first_name + "', `last_name` = '" + last_name + "', `stage` = '" + newStage + "' WHERE `serial_number` = '" + candidateSerialNumber + "'";
        db.query(insertUserQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });
    },

    deleteCandidate: (req, res) => {
        let candidateSerialNumber = req.params.id;
        let deleteUserQuery = 'DELETE FROM `candidates` WHERE serial_number = "' + candidateSerialNumber + '"';

        db.query(deleteUserQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });
    }
};