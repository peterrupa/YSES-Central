-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jan 14, 2015 at 05:36 PM
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
('arvielimbo', '247a3394f50d50c119f9f846a1853433df83b0f3922a71154ece4bb5eb6c666f', 'Arvie', 'Abrencillo', 'Limbo', 'Active', 'Finance', '2012-12321', 'Synergy', '2012', 'Angela Roscel Brojas Almoro', '1111-11-10', 'Quezon', 'New Dorm', 'public/uploads/arvielimbo.jpg', 'Arvie Abrencillo Limbo', NULL),
('badluckbrian', '247a3394f50d50c119f9f846a1853433df83b0f3922a71154ece4bb5eb6c666f', 'Bad', 'Luck', 'Brian', 'Alumni', 'Scholastics', '2006-11111', 'Charter', '2006', 'Good Guy Greg', '1111-11-11', 'Internetz', 'Internetz', 'public/uploads/badluckbrian.png', 'Bad Luck Brian', 'Scholastics Head'),
('kath28', '247a3394f50d50c119f9f846a1853433df83b0f3922a71154ece4bb5eb6c666f', 'Katherine', 'So', 'Villegas', 'Active', 'Senior Projects and Activities', '2012-22222', 'Synergy', '2012', 'Suzette De Torres', '1995-01-28', 'Candelaria, Quezon', 'Silverios Compound', 'public/uploads/kath28.jpg', 'Katherine So Villegas', NULL),
('kimini07', '247a3394f50d50c119f9f846a1853433df83b0f3922a71154ece4bb5eb6c666f', 'Kim Joshua', 'Caicdoy', 'Advincula', 'Active', 'Senior Projects and Activities', '2011-12312', 'Synergy', '2011', 'Kim''s Mentor', '3232-12-31', 'Makati', 'Bella Cartash', 'public/uploads/kimini07.jpg', 'Kim Joshua Caicdoy Advincula', 'Deputy Executive Officer'),
('penguinlove', '247a3394f50d50c119f9f846a1853433df83b0f3922a71154ece4bb5eb6c666f', 'Maria Clarissa', 'Sulit', 'Estremos', 'Active', 'Secretariat', '2011-55645', 'Synergy', '2011', 'Cla''s Mentor', '5234-04-27', 'Binangonan, Rizal', 'Bella Cartash', 'public/uploads/penguinlove.jpg', 'Maria Clarissa Sulit Estremos', 'Executive Assistant'),
('queenjubs', '247a3394f50d50c119f9f846a1853433df83b0f3922a71154ece4bb5eb6c666f', 'Jhubielyn', 'Go', 'Garachico', 'Active', 'Senior Projects and Activities', '2012-51343', 'Synergy', '2012', 'Idk lol', '1995-11-12', 'Somewhere', 'Silverios Compound', 'public/uploads/queenjubs.jpg', 'Jhubielyn Go Garachico', NULL),
('qylegeronimo', '247a3394f50d50c119f9f846a1853433df83b0f3922a71154ece4bb5eb6c666f', 'Qyle', 'De Los Angeles', 'San Juan', 'Active', 'Junior Projects and Activities', '2012-11111', 'RAMpage', '2012', 'penguinlove', '1996-06-07', 'Naga City', 'Vetmed Dorm', 'public/uploads/qylegeronimo.jpg', 'Qyle De Los Angeles San Juan', NULL),
('tricycle', '247a3394f50d50c119f9f846a1853433df83b0f3922a71154ece4bb5eb6c666f', 'Peter Bernard', 'Mariano', 'Rupa', 'Active', 'Junior Projects and Activities', '2013-45106', 'RAMpage', '2013', 'arvielimbo', '1996-11-29', 'Block 1 Lot 10 Nova Romania, Deparo, Caloocan', 'Mendoza Dorm', 'public/uploads/tricycle.jpg', 'Peter Bernard Mariano Rupa', NULL),
('youryayness', '247a3394f50d50c119f9f846a1853433df83b0f3922a71154ece4bb5eb6c666f', 'Desery', 'Ramos', 'Sabado', 'Active', 'Human Resources', '2011-43432', 'Synergy', '2011', 'Yay''s Mentor', '3212-12-27', 'Muntinlupa', 'Student''s Dorm', 'public/uploads/youryayness.jpg', 'Desery Ramos Sabado', 'Human Resources Head');

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
('getLostPanget', '247a3394f50d50c119f9f846a1853433df83b0f3922a71154ece4bb5eb6c666f', 'Maria Theresa', 'Salvador', 'Nicdao', 'Active', 'Scholastics', '2011-56717', 'Synergy', '2011', 'Tere''s Mentor', '1994-10-29', 'Hermosa, Bataan', 'Silverios Compound', 'public/uploads/pending/getLostPanget.jpg', 'Maria Theresa Salvador Nicdao', NULL),
('username', '26bdbdd16f7a11eff3e5fd8b1d0590798bf6835a93df3eceb3398c98ef324ef3', 'first', 'middle', 'last', 'Active', 'Visuals and Logistics', '2012-43132', 'Charter', '2012', 'tricycle', '1111-03-21', 'home address', 'college address', 'public/uploads/pending/username.jpg', 'first middle last', 'Visuals and Logistics Head'),
('zaiizaii', '247a3394f50d50c119f9f846a1853433df83b0f3922a71154ece4bb5eb6c666f', 'Zion Ruth', 'Borres', 'Gragasin', 'Active', 'Junior Projects and Activities', '2013-53423', 'RAMpage', '2013', 'tricycle', '1996-06-06', 'Deparo, Caloocan', 'PUP', 'public/uploads/pending/zaiizaii.jpg', 'Zion Ruth Borres Gragasin', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `accounts_pending_mentee`
--

CREATE TABLE IF NOT EXISTS `accounts_pending_mentee` (
  `mentee` varchar(50) NOT NULL,
  `mentor` varchar(50) NOT NULL,
  PRIMARY KEY (`mentee`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `accounts_pending_mentee`
--

INSERT INTO `accounts_pending_mentee` (`mentee`, `mentor`) VALUES
('almermamer', 'username'),
('Marie Flor Ramos Bawanan', 'getLostPanget'),
('Mentee 1', 'username');

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=41 ;

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
('Senior Projects and Activities', 'dsad', '2015-01-12 22:03:35', 40, 'ds');

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=48 ;

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
('tricycle', '2015-01-13 12:08:54', 'Hello, world!', 47);

-- --------------------------------------------------------

--
-- Table structure for table `logbook_tricycle_hidden_posts`
--

CREATE TABLE IF NOT EXISTS `logbook_tricycle_hidden_posts` (
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `pad_jpadsters_attendance`
--

CREATE TABLE IF NOT EXISTS `pad_jpadsters_attendance` (
  `username` varchar(50) NOT NULL,
  `event` varchar(50) NOT NULL,
  `did_attend` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `pad_jpadsters_event`
--

CREATE TABLE IF NOT EXISTS `pad_jpadsters_event` (
  `event` varchar(50) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `pad_jpadsters_scores`
--

CREATE TABLE IF NOT EXISTS `pad_jpadsters_scores` (
  `username` varchar(50) NOT NULL,
  `score` int(11) NOT NULL,
  `max_score` int(11) NOT NULL,
  `event` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `scho_14151_checklist`
--

CREATE TABLE IF NOT EXISTS `scho_14151_checklist` (
  `username` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `scho_14151_tricycle`
--

CREATE TABLE IF NOT EXISTS `scho_14151_tricycle` (
  `subject` varchar(50) NOT NULL,
  `units` int(11) NOT NULL,
  `grade` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `scho_sem_list`
--

CREATE TABLE IF NOT EXISTS `scho_sem_list` (
  `sem` varchar(50) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `sec_ysers_attendance`
--

CREATE TABLE IF NOT EXISTS `sec_ysers_attendance` (
  `username` varchar(50) NOT NULL,
  `event` varchar(50) NOT NULL,
  `did_attend` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `sec_ysers_event`
--

CREATE TABLE IF NOT EXISTS `sec_ysers_event` (
  `event` varchar(50) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

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
