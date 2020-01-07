
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
        if (!req.session.loggedin) return res.redirect('/login');
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
        let fileType = req.body.fileType;
        let fileName = req.body.fileName;
        try{
            if(req.files){
                let file1 = req.files.file1;
                file1.mv(`${__dirname}/uploads/${fileName}${fileType}`);
            }
        }
        catch (err){
            res.status(500).send(err);
        }
        
        // send the candidate details to the database
        let query = "INSERT INTO `candidates` (first_name, last_name, id, mail, gender, birthdate, phone_number, address, stage) VALUES ('" +
            first_name + "', '" + last_name + "', '" + id + "', '" + mail + "', '" + gender + "', '" + birthdate + "', '" + phone_number + "', '" + address + "', '" + stage + "')";
    db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            if(req.files) {
                let query2 = "INSERT INTO `documents` (doc_user,date_entered, doc_stage, candidate_id, doc_name) VALUES ('"+first_name+"','"+ new Date().toISOString().slice(0,10)+"' ,'"+ stage + "','"+ result.insertId + "', '" + fileName +"')";
        

                db.query(query2, (err, result)=>{
                    if(err) return res.status(500).send(err);  
                    res.redirect('/');
        
                });
            }
            else
            res.redirect('/');
     });
},

    editCandidatePage: (req, res) => {
        if (!req.session.loggedin) return res.redirect('/login');

        let candidateId = req.params.id;
        let query = "SELECT * FROM `candidates` WHERE serial_number = '" + candidateId + "'";
        let query2 = "SELECT * from `documents` WHERE candidate_id = '" + candidateId + "'";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }

            if (!req.session.loggedin) return res.redirect('/login');
            
            db.query(query2, (err, result2)=> {

                if(err) return res.status(500).send(err);

                res.render('edit-candidate.ejs', {
                    title: "Edit Candidate",
                    candidate: result[0],
                    documents: result2,
                    message: ''
                })
            });
        });
    },

    editCandidate: (req, res) => {
        if (!req.session.loggedin) return res.redirect('/login');

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
        if (!req.session.loggedin) return res.redirect('/login');

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