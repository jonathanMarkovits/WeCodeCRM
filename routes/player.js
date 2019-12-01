const fs = require('fs');

module.exports = {
    addPlayerPage: (req, res) => {
        res.render('add-player.ejs', {
            title: "Welcome to Socka | Add a new player",
            message: ''
        });
    },
    addPlayer: (req, res) => {
        if (!req.files) {
            return res.status(400).send("No files were uploaded.");
        }

        let message = '';
        let first_name = req.body.first_name;
        let last_name = req.body.last_name;
        let stage = 1;
        let username = req.body.username;
        let uploadedFile = req.files.image;
        let image_name = uploadedFile.name;
        let fileExtension = uploadedFile.mimetype.split('/')[1];
        image_name = username + '.' + fileExtension;

        let usernameQuery = "SELECT * FROM `stage1` WHERE user_name = '" + username + "'";

        db.query(usernameQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (result.length > 0) {
                message = 'Username already exists';
                res.render('add-player.ejs', {
                    message,
                    title: "Welcome to Socka | Add a new player"
                });
            } else {
                // check the filetype before uploading it
                if (uploadedFile.mimetype === 'image/png' || uploadedFile.mimetype === 'image/jpeg' || uploadedFile.mimetype === 'image/gif') {
                    // upload the file to the /public/assets/img directory
                    uploadedFile.mv(`public/assets/img/${image_name}`, (err) => {
                        if (err) {
                            return res.status(500).send(err);
                        }
                        // send the player's details to the database
                        let query = "INSERT INTO `stage1` (first_name, last_name, stage, image, user_name) VALUES ('" +
                            first_name + "', '" + last_name + "', '" + stage + "', '" + image_name + "', '" + username + "')";
                        db.query(query, (err, result) => {
                            if (err) {
                                return res.status(500).send(err);
                            }
                            res.redirect('/');
                        });
                    });
                } else {
                    message = "Invalid File format. Only 'gif', 'jpeg' and 'png' images are allowed.";
                    res.render('add-player.ejs', {
                        message,
                        title: "Welcome to Socka | Add a new player"
                    });
                }
            }
        });
    },
    editPlayerPage: (req, res) => {
        let candidateId = req.params.id;
        let candidateStage = req.params.stage;
        let query = "SELECT * FROM `stage" + candidateStage + "` WHERE id = '" + candidateId + "' ";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('edit-player.ejs', {
                title: "Edit  Player",
                player: result[0],
                message: ''
            });
        });
    },
    editPlayer: (req, res) => {
        let candidateId = req.params.id;
        let currentStage = req.params.stage;
        let first_name = req.body.first_name;
        let last_name = req.body.last_name;
        let newStage = req.body.new_stage;

        if (currentStage === newStage) {
            let query = "UPDATE `stage" + currentStage + "` SET `first_name` = '" + first_name + "', `last_name` = '" + last_name + "' WHERE `stage" + currentStage + "`.`id` = '" + candidateId + "'";
            db.query(query, (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                }
                res.redirect('/');
            });
        } else {
            // let image_name = req.body.username + ".jpeg";
            let username = req.body.username;
            let getImageQuery = 'SELECT image from `stage' + currentStage + '` WHERE id = "' + candidateId + '"';
            let getUsernameQuery = 'SELECT user_name from `stage' + currentStage + '` WHERE id = "' + candidateId + '"';
            let deleteUserQuery = 'DELETE FROM stage' + currentStage + ' WHERE id = "' + candidateId + '"';
            //let query = "INSERT INTO `stage" + newStage + "` (first_name, last_name, stage, image, user_name) VALUES ('" +
            //                first_name + "', '" + last_name + "', '" + newStage + "', '" + image + "', '" + username + "')";
            db.query(getImageQuery, (err, result) => {
                if (err) {
                    console.log(err);
                }

                let image = result[0].image;
                // let image = "aa.jpeg";

                

                db.query(getUsernameQuery, (err, result) => {
                    if (err) {
                        console.log(err);
                    }

                    let username = result[0].user_name;
                    console.log(username);

                    let usernameQuery = "SELECT * FROM `stage" + newStage + "` WHERE user_name = '" + username + "'";

                    db.query(usernameQuery, (err, result) => {
                        if (err) {
                            // return res.status(500).send(err);
                            console.log(err);
                        }
                        if (result.length > 0) {
                            // message = 'Username already exists';
                            // res.render('add-player.ejs', {
                            //     message,
                            //     title: "Welcome to Socka | Add a new player"
                            // });
                            console.log("Username already exists");
                        } else {
                            // check the filetype before uploading it

                            // upload the file to the /public/assets/img directory

                            // send the player's details to the database
                            let query = "INSERT INTO `stage" + newStage + "` (first_name, last_name, stage, image, user_name) VALUES ('" +
                                first_name + "', '" + last_name + "', '" + newStage + "', '" + image + "', '" + username + "')";
                            db.query(query, (err, result) => {
                                if (err) {
                                    // return res.status(500).send(err);
                                    console.log(err);
                                }
                                // res.redirect('/');
                            });
                        }
                    });
                });

                db.query(deleteUserQuery, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.redirect('/');
                });
            });
        }
    },
        deletePlayer: (req, res) => {
            let playerId = req.params.id;
            let getImageQuery = 'SELECT image from `players` WHERE id = "' + playerId + '"';
            let deleteUserQuery = 'DELETE FROM players WHERE id = "' + playerId + '"';

            db.query(getImageQuery, (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                }

                let image = result[0].image;

                fs.unlink(`public/assets/img/${image}`, (err) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    db.query(deleteUserQuery, (err, result) => {
                        if (err) {
                            return res.status(500).send(err);
                        }
                        res.redirect('/');
                    });
                });
            });
        }
    };