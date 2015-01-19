-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jan 19, 2015 at 06:22 PM
-- Server version: 5.6.17
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `yses_central`
--

-- --------------------------------------------------------

--
-- Table structure for table `accounts`
--

CREATE TABLE IF NOT EXISTS `accounts` (
  `username` varchar(50) NOT NULL,
  `password` varchar(150) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `middle_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `org_class` varchar(20) NOT NULL,
  `department` varchar(30) NOT NULL,
  `student_number` varchar(10) NOT NULL,
  `org_batch` varchar(20) NOT NULL,
  `univ_batch` varchar(4) NOT NULL,
  `mentor` varchar(50) DEFAULT NULL,
  `birthday` date NOT NULL,
  `home_address` varchar(100) NOT NULL,
  `college_address` varchar(100) NOT NULL,
  `picture` varchar(50) NOT NULL,
  `full_name` varchar(150) NOT NULL,
  `exec_position` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `accounts`
--

INSERT INTO `accounts` (`username`, `password`, `first_name`, `middle_name`, `last_name`, `org_class`, `department`, `student_number`, `org_batch`, `univ_batch`, `mentor`, `birthday`, `home_address`, `college_address`, `picture`, `full_name`, `exec_position`) VALUES
('almermamer', '247a3394f50d50c119f9f846a1853433df83b0f3922a71154ece4bb5eb6c666f', 'Almer', 'Taculog', 'Mendoza', 'Active', 'Junior Projects and Activities', '2013-12112', 'RAMpage', '2013', 'kath28', '1996-11-08', 'Pateros, Rizal', 'Vetmed Dorm', 'public/uploads/almermamer.jpg', 'Almer Taculog Mendoza', NULL),
('arvielimbo', '247a3394f50d50c119f9f846a1853433df83b0f3922a71154ece4bb5eb6c666f', 'Arvie', 'Abrencillo', 'Limbo', 'Active', 'Finance', '2012-12321', 'rainByte', '2012', 'Angela Roscel Brojas Almoro', '1111-11-10', 'Quezon', 'New Dorm', 'public/uploads/arvielimbo.jpg', 'Arvie Abrencillo Limbo', NULL),
('badluckbrian', '247a3394f50d50c119f9f846a1853433df83b0f3922a71154ece4bb5eb6c666f', 'Bad', 'Luck', 'Brian', 'Alumni', 'Scholastics', '2006-11111', 'Charter Member', '2006', 'Good Guy Greg', '1111-11-11', 'Internetz', 'Internetz', 'public/uploads/badluckbrian.png', 'Bad Luck Brian', 'Scholastics Head'),
('getLostPanget', '247a3394f50d50c119f9f846a1853433df83b0f3922a71154ece4bb5eb6c666f', 'Maria Theresa', 'Salvador', 'Nicdao', 'Active', 'Scholastics', '2011-56717', 'rainByte', '2011', 'Tere''s Mentor', '1994-10-29', 'Hermosa, Bataan', 'Silverios Compound', 'public/uploads/getLostPanget.jpg', 'Maria Theresa Salvador Nicdao', NULL),
('kath28', '247a3394f50d50c119f9f846a1853433df83b0f3922a71154ece4bb5eb6c666f', 'Katherine', 'So', 'Villegas', 'Active', 'Senior Projects and Activities', '2012-22222', 'rainByte', '2012', 'Suzette De Torres', '1995-01-28', 'Candelaria, Quezon', 'Silverios Compound', 'public/uploads/kath28.jpg', 'Katherine So Villegas', NULL),
('kimini07', '247a3394f50d50c119f9f846a1853433df83b0f3922a71154ece4bb5eb6c666f', 'Kim Joshua', 'Caicdoy', 'Advincula', 'Active', 'Senior Projects and Activities', '2011-12312', 'Jenga', '2011', 'Kim''s Mentor', '3232-12-31', 'Makati', 'Bella Cartash', 'public/uploads/kimini07.jpg', 'Kim Joshua Caicdoy Advincula', 'Deputy Executive Officer'),
('marieflor', '247a3394f50d50c119f9f846a1853433df83b0f3922a71154ece4bb5eb6c666f', 'Marie Flor', 'Ramos', 'Bawanan', 'Active', 'Junior Projects and Activities', '2012-12321', 'RAMpage', '2012', 'getLostPanget', '1995-04-22', 'Solano, Nueva Viscaya', 'Pearl Street', 'public/uploads/pending/marieflor.jpg', 'Marie Floe Ramos Bawanan', NULL),
('penguinlove', '247a3394f50d50c119f9f846a1853433df83b0f3922a71154ece4bb5eb6c666f', 'Maria Clarissa', 'Sulit', 'Estremos', 'Active', 'Secretariat', '2011-55645', 'He-4', '2011', 'Cla''s Mentor', '5234-04-27', 'Binangonan, Rizal', 'Bella Cartash', 'public/uploads/penguinlove.jpg', 'Maria Clarissa Sulit Estremos', 'Executive Assistant'),
('queenjubs', '247a3394f50d50c119f9f846a1853433df83b0f3922a71154ece4bb5eb6c666f', 'Jhubielyn', 'Go', 'Garachico', 'Active', 'Senior Projects and Activities', '2012-51343', 'rainByte', '2012', 'Idk lol', '1995-11-12', 'Somewhere', 'Silverios Compound', 'public/uploads/queenjubs.jpg', 'Jhubielyn Go Garachico', NULL),
('qylegeronimo', '247a3394f50d50c119f9f846a1853433df83b0f3922a71154ece4bb5eb6c666f', 'Qyle', 'De Los Angeles', 'San Juan', 'Active', 'Junior Projects and Activities', '2012-11111', 'RAMpage', '2012', 'penguinlove', '1996-06-07', 'Naga City', 'Vetmed Dorm', 'public/uploads/qylegeronimo.jpg', 'Qyle De Los Angeles San Juan', NULL),
('treelover', '247a3394f50d50c119f9f846a1853433df83b0f3922a71154ece4bb5eb6c666f', 'Emerald', 'Fajutag', 'Fallarme', 'Active', 'Scholastics', '2011-43243', 'He-4', '2011', 'Ian F Del Barrio', '1994-10-12', 'Taguig', 'Women''s Dorm', 'public/uploads/treelover.jpg', 'Emerald Fajutag Fallarme', NULL),
('tricycle', '247a3394f50d50c119f9f846a1853433df83b0f3922a71154ece4bb5eb6c666f', 'Peter Bernard', 'Mariano', 'Rupa', 'Active', 'Junior Projects and Activities', '2013-45106', 'RAMpage', '2013', 'arvielimbo', '1996-11-29', 'Block 1 Lot 10 Nova Romania, Deparo, Caloocan', 'Mendoza Dorm', 'public/uploads/tricycle.jpg', 'Peter Bernard Mariano Rupa', NULL),
('youryayness', '247a3394f50d50c119f9f846a1853433df83b0f3922a71154ece4bb5eb6c666f', 'Desery', 'Ramos', 'Sabado', 'Active', 'Human Resources', '2011-43432', 'Jenga', '2011', 'Yay''s Mentor', '3212-12-27', 'Muntinlupa', 'Student''s Dorm', 'public/uploads/youryayness.jpg', 'Desery Ramos Sabado', 'Human Resources Head');

-- --------------------------------------------------------

--
-- Table structure for table `accounts_mentee`
--

CREATE TABLE IF NOT EXISTS `accounts_mentee` (
  `mentee` varchar(50) NOT NULL,
  `mentor` varchar(50) NOT NULL,
  PRIMARY KEY (`mentee`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `accounts_mentee`
--

INSERT INTO `accounts_mentee` (`mentee`, `mentor`) VALUES
('almermamer', 'kath28'),
('Joseph Matthew Reinoso Marcos', 'treelover'),
('marieflor', 'getLostPanget'),
('Mon Cedrick Glipo Frias', 'queenjubs'),
('qylegeronimo', 'penguinlove'),
('tricycle', 'arvielimbo');

-- --------------------------------------------------------

--
-- Table structure for table `accounts_pending`
--

CREATE TABLE IF NOT EXISTS `accounts_pending` (
  `username` varchar(50) NOT NULL,
  `password` varchar(150) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `middle_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `org_class` varchar(20) NOT NULL,
  `department` varchar(30) NOT NULL,
  `student_number` varchar(10) NOT NULL,
  `org_batch` varchar(20) NOT NULL,
  `univ_batch` varchar(4) NOT NULL,
  `mentor` varchar(50) DEFAULT NULL,
  `birthday` date NOT NULL,
  `home_address` varchar(100) NOT NULL,
  `college_address` varchar(100) NOT NULL,
  `picture` varchar(50) NOT NULL,
  `full_name` varchar(150) NOT NULL,
  `exec_position` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `accounts_pending`
--

INSERT INTO `accounts_pending` (`username`, `password`, `first_name`, `middle_name`, `last_name`, `org_class`, `department`, `student_number`, `org_batch`, `univ_batch`, `mentor`, `birthday`, `home_address`, `college_address`, `picture`, `full_name`, `exec_position`) VALUES
('zaiizaii', '247a3394f50d50c119f9f846a1853433df83b0f3922a71154ece4bb5eb6c666f', 'Zion Ruth', 'Borres', 'Gragasin', 'Active', 'Junior Projects and Activities', '2013-53423', 'RAMpage', '2013', 'Peter Bernard Rupa', '1996-06-06', 'Deparo, Caloocan', 'PUP', 'public/uploads/pending/zaiizaii.jpg', 'Zion Ruth Borres Gragasin', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `accounts_pending_mentee`
--

CREATE TABLE IF NOT EXISTS `accounts_pending_mentee` (
  `mentee` varchar(50) NOT NULL,
  `mentor` varchar(50) NOT NULL,
  PRIMARY KEY (`mentee`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `announcement_posts`
--

CREATE TABLE IF NOT EXISTS `announcement_posts` (
  `department` varchar(30) NOT NULL,
  `message` varchar(500) NOT NULL,
  `date` datetime DEFAULT CURRENT_TIMESTAMP,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=46 ;

--
-- Dumping data for table `announcement_posts`
--

INSERT INTO `announcement_posts` (`department`, `message`, `date`, `id`, `title`) VALUES
('Projects and Activities', 'Good evening YSERS. We are here to ask you who are interested in being a committee head this coming PF 2014. Thank you!', '2015-01-08 18:59:03', 1, 'Committee Heads Survey'),
('Secretariat', 'Hi, we''re cuties! <3 hihi', '2015-01-08 20:32:14', 2, 'Urgent message for everyone!'),
('Executive', 'hai lol', '2015-01-08 20:48:58', 3, 'hello yses'),
('Visuals and Logistics', 'RING DING DING DING RING DING DING DING DING', '2015-01-08 20:49:48', 4, 'WHAT DOES THE FOX SAY?'),
('Scholastics', 'Mag-aral tayo mabuti. <3', '2015-01-08 20:50:15', 5, 'A very important message from the best department ever'),
('Finance', 'Magbayad kayo!', '2015-01-08 20:50:29', 6, 'Hoy!'),
('Human Resources', 'explicit material.', '2015-01-08 20:51:12', 7, 'This announcement contains explicit material.'),
('Secretariat', 'Hello, YSERS! Please send to me your articles. Thanks!', '2015-01-09 00:39:55', 19, 'CatalYSES'),
('Secretariat', 'Test', '2015-01-09 00:45:53', 23, '123'),
('Secretariat', 'test', '2015-01-09 00:48:49', 24, '321'),
('Secretariat', 'Real time announcement testing.', '2015-01-12 13:59:01', 25, 'Hi.'),
('Secretariat', 'TEST', '2015-01-12 13:59:43', 26, 'TEST'),
('Secretariat', 'dsadsa', '2015-01-12 14:03:57', 27, 'dsada'),
('Secretariat', 'dsdads', '2015-01-12 14:04:29', 28, 'wqewqeqw'),
('Secretariat', 'HIHI.', '2015-01-12 14:05:40', 29, 'WORKS NOW.'),
('Secretariat', 'HAHAHAHA', '2015-01-12 14:09:26', 30, 'HAHA'),
('Secretariat', 'HOLY SHIT', '2015-01-12 14:12:09', 31, 'REAL TIME SHIT'),
('Secretariat', 'dsadsada', '2015-01-12 14:12:32', 32, 'asd'),
('Secretariat', 'dasdsadsa', '2015-01-12 14:12:55', 33, 'wqeqw'),
('Secretariat', 'edsdsd', '2015-01-12 14:21:57', 34, 'ewqeqw'),
('Secretariat', 'Animations!', '2015-01-12 22:00:37', 35, 'New feature'),
('Secretariat', 'awawawa', '2015-01-12 22:00:45', 36, 'wew'),
('Human Resources', 'bug daw?', '2015-01-12 22:01:34', 37, 'HI'),
('Human Resources', 'das', '2015-01-12 22:03:06', 38, 'fds'),
('Senior Projects and Activities', 'ddas', '2015-01-12 22:03:20', 39, 'cvx'),
('Senior Projects and Activities', 'dsad', '2015-01-12 22:03:35', 40, 'ds'),
('Secretariat', 'TEST', '2015-01-15 01:03:34', 41, 'Tset'),
('Secretariat', 'ds', '2015-01-15 01:05:20', 42, 'as'),
('Senior Projects and Activities', '2', '2015-01-15 01:07:14', 43, 'dota'),
('Senior Projects and Activities', 'yeah', '2015-01-15 01:07:22', 44, 'fk'),
('Senior Projects and Activities', 'MESSAGE', '2015-01-18 18:53:46', 45, 'Title');

-- --------------------------------------------------------

--
-- Table structure for table `chat_log`
--

CREATE TABLE IF NOT EXISTS `chat_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sender` varchar(50) NOT NULL,
  `recipient` varchar(50) NOT NULL,
  `message` varchar(500) NOT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `fin_tricycle_transactions`
--

CREATE TABLE IF NOT EXISTS `fin_tricycle_transactions` (
  `date` datetime NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fee` varchar(50) NOT NULL,
  `fee_paid` int(11) NOT NULL,
  `fee_left` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `fin_ysers_bracket`
--

CREATE TABLE IF NOT EXISTS `fin_ysers_bracket` (
  `username` varchar(50) NOT NULL,
  `bracket` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `fin_ysers_fees`
--

CREATE TABLE IF NOT EXISTS `fin_ysers_fees` (
  `id` int(11) NOT NULL,
  `fee` varchar(50) NOT NULL,
  `fee_cost` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `fin_ysers_fee_record`
--

CREATE TABLE IF NOT EXISTS `fin_ysers_fee_record` (
  `username` varchar(50) NOT NULL,
  `fee` varchar(50) NOT NULL,
  `fee_left` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `logbook_posts`
--

CREATE TABLE IF NOT EXISTS `logbook_posts` (
  `username` varchar(50) NOT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `message` varchar(1000) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=59 ;

--
-- Dumping data for table `logbook_posts`
--

INSERT INTO `logbook_posts` (`username`, `date`, `message`, `id`) VALUES
('tricycle', '2015-01-10 21:06:26', 'Hello. This is my first senseful post here in the logbook.\n\nBasically this is a dumbed down version of Facebook status. Although it''s not that complex, I am still proud on what I have been able to pull off though. Of course, with the help of all YSES Central developers, this portion is now functional.\n\nSo thank you guys. I am looking forward na mas maganda at satisfactory to our own standards ang susunod na mga features. Let''s do our best to make this one something we are very proud of.', 39),
('badluckbrian', '2015-01-10 22:38:11', 'Writes XSS vulnerability script\n\n<script>alert("fails.")</script>', 42),
('tricycle', '2015-01-12 14:13:20', 'test', 43),
('tricycle', '2015-01-12 14:20:38', 'ha', 44),
('tricycle', '2015-01-12 22:00:07', 'Le animation?', 45),
('penguinlove', '2015-01-13 12:02:34', 'Hi!', 46),
('tricycle', '2015-01-13 12:08:54', 'Hello, world!', 47),
('youryayness', '2015-01-15 01:23:10', 'hart', 48),
('youryayness', '2015-01-15 01:23:43', 'haaayy', 49),
('youryayness', '2015-01-15 01:23:49', 'gfdg', 50),
('penguinlove', '2015-01-15 23:15:39', 'spam!!', 51),
('penguinlove', '2015-01-15 23:15:41', 'sad', 52),
('penguinlove', '2015-01-15 23:15:44', 'qwewqeqw', 53),
('penguinlove', '2015-01-15 23:15:46', 'cxzcxzczx', 54),
('penguinlove', '2015-01-15 23:15:48', 'fdfsfds', 55),
('penguinlove', '2015-01-15 23:16:48', 'sa', 56),
('kimini07', '2015-01-18 18:53:07', 'HELLO!', 57),
('kimini07', '2015-01-18 18:55:31', 'dsadsawqeqweqw', 58);

-- --------------------------------------------------------

--
-- Table structure for table `logbook_tricycle_hidden_posts`
--

CREATE TABLE IF NOT EXISTS `logbook_tricycle_hidden_posts` (
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `org_batch`
--

CREATE TABLE IF NOT EXISTS `org_batch` (
  `batch` varchar(50) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=22 ;

--
-- Dumping data for table `org_batch`
--

INSERT INTO `org_batch` (`batch`, `id`) VALUES
('Charter Member', 1),
('Synergy', 2),
('Nidaime Quatro', 3),
('Gitara', 4),
('Ecclesiastes 4:9', 5),
('Bato Balani', 6),
('Dyeese', 7),
('Century', 8),
('Quadfore', 9),
('13EST©', 10),
('Divide Et Impera X', 11),
('BoltXV', 12),
('+0- Net Charge', 13),
('Aglet', 14),
('1''s Complement', 15),
('Equifinality', 16),
('Jenga', 17),
('He-4', 18),
('rainByte', 19),
('4tified', 20),
('RAMpage', 21);

-- --------------------------------------------------------

--
-- Table structure for table `pad_jpadsters_attendance`
--

CREATE TABLE IF NOT EXISTS `pad_jpadsters_attendance` (
  `username` varchar(50) NOT NULL,
  `event` varchar(50) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `pad_jpadsters_attendance`
--

INSERT INTO `pad_jpadsters_attendance` (`username`, `event`, `id`) VALUES
('almermamer', 'Introduction to Nodejs', 1),
('tricycle', 'Introduction to Nodejs', 2),
('tricycle', 'Nodejs File Uploading', 3);

-- --------------------------------------------------------

--
-- Table structure for table `pad_jpadsters_event`
--

CREATE TABLE IF NOT EXISTS `pad_jpadsters_event` (
  `event` varchar(50) NOT NULL,
  `date` date NOT NULL,
  PRIMARY KEY (`event`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `pad_jpadsters_event`
--

INSERT INTO `pad_jpadsters_event` (`event`, `date`) VALUES
('Introduction to Nodejs', '2015-01-14'),
('MongoDB', '2015-01-16'),
('Nodejs File Uploading', '2015-01-15');

-- --------------------------------------------------------

--
-- Table structure for table `pad_jpadsters_scores`
--

CREATE TABLE IF NOT EXISTS `pad_jpadsters_scores` (
  `username` varchar(50) NOT NULL,
  `score` int(11) NOT NULL,
  `task` varchar(50) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=9 ;

--
-- Dumping data for table `pad_jpadsters_scores`
--

INSERT INTO `pad_jpadsters_scores` (`username`, `score`, `task`, `id`) VALUES
('tricycle', 10, 'Quiz #1', 1),
('tricycle', 5, 'Quiz #2', 2),
('almermamer', 7, 'Quiz #1', 3),
('almermamer', 3, 'Quiz #2', 4),
('qylegeronimo', 0, 'Quiz #1', 5),
('qylegeronimo', 0, 'Quiz #2', 6),
('marieflor', 0, 'Quiz #1', 7),
('marieflor', 0, 'Quiz #2', 8);

-- --------------------------------------------------------

--
-- Table structure for table `pad_jpadsters_task`
--

CREATE TABLE IF NOT EXISTS `pad_jpadsters_task` (
  `task` varchar(50) NOT NULL,
  `date` date NOT NULL,
  `maxscore` int(11) NOT NULL,
  PRIMARY KEY (`task`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `pad_jpadsters_task`
--

INSERT INTO `pad_jpadsters_task` (`task`, `date`, `maxscore`) VALUES
('Quiz #1', '2015-01-14', 10),
('Quiz #2', '2015-01-16', 5);

-- --------------------------------------------------------

--
-- Table structure for table `scho_checklist`
--

CREATE TABLE IF NOT EXISTS `scho_checklist` (
  `username` varchar(50) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sem` varchar(50) NOT NULL,
  `subject` varchar(50) NOT NULL,
  `grade` decimal(3,2) NOT NULL,
  `units` decimal(2,1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=13 ;

--
-- Dumping data for table `scho_checklist`
--

INSERT INTO `scho_checklist` (`username`, `id`, `sem`, `subject`, `grade`, `units`) VALUES
('tricycle', 1, '1st Sem 2014-2015', 'CMSC 21', '1.25', '3.0'),
('tricycle', 2, '1st Sem 2014-2015', 'CMSC 57', '1.75', '3.0'),
('tricycle', 3, '1st Sem 2014-2015', 'HUM 2', '1.75', '3.0'),
('tricycle', 4, '1st Sem 2014-2015', 'NASC 2', '2.00', '3.0'),
('tricycle', 5, '1st Sem 2014-2015', 'STAT 1', '2.75', '3.0'),
('tricycle', 6, '1st Sem 2014-2015', 'MATH 27', '2.50', '3.0'),
('kimini07', 7, '1st Sem 2014-2015', 'CMSC 165', '1.25', '3.0'),
('kimini07', 8, '1st Sem 2014-2015', 'CMSC 141', '1.75', '3.0'),
('kimini07', 9, '1st Sem 2014-2015', 'MATH 28', '2.75', '3.0'),
('kimini07', 10, '1st Sem 2014-2015', 'JAP 10', '2.00', '3.0'),
('kimini07', 11, '1st Sem 2014-2015', 'CMSC 190', '1.50', '1.0'),
('kimini07', 12, '1st Sem 2014-2015', 'ENG 10', '3.00', '3.0');

-- --------------------------------------------------------

--
-- Table structure for table `scho_sem_list`
--

CREATE TABLE IF NOT EXISTS `scho_sem_list` (
  `sem` varchar(50) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `scho_sem_list`
--

INSERT INTO `scho_sem_list` (`sem`, `id`) VALUES
('1st Sem 2014-2015', 1),
('2nd Sem 2014-2015', 2),
('Summer 2014-2015', 3);

-- --------------------------------------------------------

--
-- Table structure for table `sec_ysers_attendance`
--

CREATE TABLE IF NOT EXISTS `sec_ysers_attendance` (
  `username` varchar(50) NOT NULL,
  `event` varchar(50) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `sec_ysers_attendance`
--

INSERT INTO `sec_ysers_attendance` (`username`, `event`, `id`) VALUES
('tricycle', 'GA #1', 1),
('tricycle', 'GA #2', 2);

-- --------------------------------------------------------

--
-- Table structure for table `sec_ysers_event`
--

CREATE TABLE IF NOT EXISTS `sec_ysers_event` (
  `event` varchar(50) NOT NULL,
  `date` date NOT NULL,
  PRIMARY KEY (`event`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `sec_ysers_event`
--

INSERT INTO `sec_ysers_event` (`event`, `date`) VALUES
('GA #1', '2015-01-12'),
('GA #2', '2015-01-15');

-- --------------------------------------------------------

--
-- Table structure for table `test`
--

CREATE TABLE IF NOT EXISTS `test` (
  `test` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `test`
--

INSERT INTO `test` (`test`) VALUES
('2015-01-15');

-- --------------------------------------------------------

--
-- Table structure for table `vl_inventory`
--

CREATE TABLE IF NOT EXISTS `vl_inventory` (
  `item` varchar(50) NOT NULL,
  `condition` int(11) NOT NULL,
  `borrower` varchar(50) DEFAULT NULL,
  `comments` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
