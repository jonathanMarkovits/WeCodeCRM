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
* option for login page
* all the tables in the DB should contain all fields from the section above
* show only the information that relevant to the current stage and the next stage (in 'personal file' page)
* show only the fields of stage 1 (in the section above) in the 'table' pages.
* in the 'home' page, show more information like how many candidates in each stage.
* a feature to export information to PDF.
* a feature to send SMS (for a reminder).
* an option to sort the table by field.
* validting inputs for tables 
* read about SQL engines

## Remarks
* file size is maximum 16MB
* comments size is maximum 500 characters.
## mySql queries for initializing the DB

CREATE TABLE IF NOT EXISTS `comments` (
  `commentID` int(5) NOT NULL AUTO_INCREMENT,
  `commentContent` varchar(500) NOT NULL,
  `commentUser` varchar(100) NOT NULL,
  `dateEntered` datetime NOT NULL,
  `commentStage` int(11) NOT NULL,
  `commentCandidate` varchar(100) NOT NULL,
  PRIMARY KEY (`commentID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;

CREATE TABLE IF NOT EXISTS `documents` (
  `docID` int(5) NOT NULL AUTO_INCREMENT,
  `doc` mediumblob,
  `docUser` varchar(100) NOT NULL,
  `dateEntered` datetime NOT NULL,
  `docStage` int(11) NOT NULL,
  `docCandidate` varchar(100) NOT NULL,
  PRIMARY KEY (`docID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;


CREATE DATABASE IF NOT EXISTS wecode;

CREATE TABLE IF NOT EXISTS `stage1` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `stage` int(11) NOT NULL,
  `image` varchar(255) NOT NULL,
  `user_name` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;

CREATE TABLE IF NOT EXISTS `stage2` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `stage` int(11) NOT NULL,
  `image` varchar(255) NOT NULL,
  `user_name` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;

CREATE TABLE IF NOT EXISTS `stage3` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `stage` int(11) NOT NULL,
  `image` varchar(255) NOT NULL,
  `user_name` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;

CREATE TABLE IF NOT EXISTS `stage4` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `stage` int(11) NOT NULL,
  `image` varchar(255) NOT NULL,
  `user_name` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;

CREATE TABLE IF NOT EXISTS `stage5` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `stage` int(11) NOT NULL,
  `image` varchar(255) NOT NULL,
  `user_name` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;

CREATE TABLE IF NOT EXISTS `accounts` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

INSERT INTO `accounts` (`id`, `username`, `password`, `email`) VALUES (1, 'test', 'test', 'test@test.com');

ALTER TABLE `accounts` ADD PRIMARY KEY (`id`);
ALTER TABLE `accounts` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
