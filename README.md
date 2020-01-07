# WeCodeCRM
Building a CRM app for WeCode

## Useful links
* Basic web app: https://dev.to/achowba/build-a-simple-app-using-node-js-and-mysql-19me
* Login page: https://codeshack.io/basic-login-system-nodejs-express-mysql/
* CSS classes: https://www.w3schools.com/bootstrap4/bootstrap_ref_all_classes.asp

## Fields for the DB tables
* stage 1 - create candidates - ID/ first name/ last name/ mail/ gender/ rank(0,1,2)/ birthdate/ phone number/ address/ text field
* stage 2 - phone interview - does pass/ comments
* stage 3 - home exam - does send/ does submited/ deadline/ comments
* stage 4 - selection day - time to arrive/ does arrive/ docs/ comments/ grades for 4 tests/ final grade
* stage 5 - interview - date and time/ is the candidate updated/ comments/ docs

## node packages npm install command 
* npm install express express-fileupload body-parser mysql ejs req-flash --save

## TDL
* option for login page - security imporvment needed
* all the tables in the DB should contain all fields from the section above
* show only the information that relevant to the current stage and the next stage (in 'personal file' page)
* show only the fields of stage 1 (in the section above) in the 'table' pages.
* in the 'home' page, show more information like how many candidates in each stage.
* a feature to export information to PDF.
* a feature to send SMS (for a reminder).
* an option to sort the table by field.
* validting inputs for tables 
* read about SQL engines
* add who is the user entering the data
* delete doc_stage column
* consider deleting the documents table and save directly on server
* handle input correction as it makes problems when entering chars in id at sql , for example.
* how to know which user is currently writing
* notify that same name will cause problems
## Remarks
* file size is maximum 16MB
* comments size is maximum 500 characters.
## mySql queries for initializing the DB

CREATE DATABASE IF NOT EXISTS wecode;

CREATE TABLE IF NOT EXISTS `comments` (
  `comment_id` int(5) NOT NULL AUTO_INCREMENT,
  `comment_content` varchar(500) NOT NULL,
  `comment_user` varchar(100) NOT NULL,
  `date_entered` datetime NOT NULL,
  `comment_stage` int(11) NOT NULL,
  `comment_candidate` varchar(100) NOT NULL,
  PRIMARY KEY (`comment_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;

CREATE TABLE IF NOT EXISTS `documents` (
  `doc_id` int(5) NOT NULL AUTO_INCREMENT,
  `doc` mediumblob,
  `doc_user` varchar(100) NOT NULL,
  `date_entered` datetime NOT NULL,
  `doc_stage` int(11) NOT NULL,
  `doc_candidate` varchar(100) NOT NULL,
  PRIMARY KEY (`doc_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;

CREATE TABLE IF NOT EXISTS `candidates` (
  `serial_number` int(5) NOT NULL AUTO_INCREMENT,
  `stage` int(11) NOT NULL,
  `id` int(11) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `mail` varchar(255) NOT NULL,
  `gender` varchar(255) NOT NULL,
  `rank` int(11),
  `birthdate` DATE NOT NULL,
  `phone_number` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `text` varchar(255),
  `pass_stage2` BOOLEAN,
  `send_stage3` BOOLEAN,
  `submited_stage3` BOOLEAN,
  `deadline_stage3` datetime,
  `arriving_time_stage4` datetime,
  `does_arrive_stage4` BOOLEAN,
  `grade_test1_stage4` int(11),
  `grade_test2_stage4` int(11),
  `grade_test3_stage4` int(11),
  `grade_test4_stage4` int(11),
  `final_grade_stage4` int(11),
  `interview_date_time_stage5` datetime,
  `is_notified_stage5` BOOLEAN,
  PRIMARY KEY (`serial_number`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;

CREATE TABLE IF NOT EXISTS `accounts` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;


INSERT INTO `candidates` (stage, id, first_name, last_name, mail, gender, birthdate, phone_number, address)
VALUES
(1, 30808, 'yoav', 'shotland', 'sh@sh.net', 'male', 16/12/92, 050505050, 'kehilat varsha 1'),
(1, 30808, 'roni', 'oron', 'rn@sh.net', 'female', 15/12/92, 051505050, 'kehilat varsha 2'),
(1, 30808, 'jonathan', 'markovits', 'jo@sh.net', 'male', 14/12/92, 052505050, 'kehilat varsha 3'),
(1, 30808, 'ben', 'bialick', 'ben@sh.net', 'female', 13/12/92, 053505050, 'kehilat varsha 4'),
(1, 30808, 'shir', 'shasha', 'shir@sh.net', 'male', 12/12/92, 054505050, 'kehilat varsha 5'); 

INSERT INTO `accounts` (`id`, `username`, `password`, `email`) VALUES (1, 'test', 'test', 'test@test.com');

ALTER TABLE candidates
  ADD COLUMN `is_rejected` BOOLEAN NOT NULL DEFAULT FALSE;

CREATE TABLE IF NOT EXISTS `rejected` (
  `serial_number` int(11) NOT NULL auto_increment,
  `id` int(11) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `gender` varchar(255) NOT NULL,
  `birthdate` DATE NOT NULL,
  `phone_number` varchar(255) NOT NULL,
  `mail` varchar(255) NOT NULL,

  PRIMARY KEY (`serial_number`)
  
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

