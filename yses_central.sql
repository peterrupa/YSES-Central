-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jan 08, 2015 at 06:48 PM
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
  `exec_position` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `accounts`
--

INSERT INTO `accounts` (`username`, `password`, `first_name`, `middle_name`, `last_name`, `org_class`, `department`, `student_number`, `org_batch`, `univ_batch`, `mentor`, `birthday`, `home_address`, `college_address`, `picture`, `full_name`, `exec_position`) VALUES
('qylegeronimo', '247a3394f50d50c119f9f846a1853433df83b0f3922a71154ece4bb5eb6c666f', 'Qyle', 'De Los Angeles', 'San Juan', 'Active', 'Junior Projects and Activities', '2012-11111', 'RAMpage', '2012', 'penguinlove', '1996-06-07', 'Naga City', 'Vetmed Dorm', 'public/uploads/qylegeronimo.jpg', 'Qyle De Los Angeles San Juan', NULL),
('tricycle', '247a3394f50d50c119f9f846a1853433df83b0f3922a71154ece4bb5eb6c666f', 'Peter Bernard', 'Mariano', 'Rupa', 'Active', 'Junior Projects and Activities', '2013-45106', 'RAMpage', '2013', 'arvielimbo', '1996-11-29', 'Block 1 Lot 10 Nova Romania, Deparo, Caloocan', 'Mendoza Dorm', 'public/uploads/tricycle.jpg', 'Peter Bernard Mariano Rupa', NULL),
('badluckbrian', '247a3394f50d50c119f9f846a1853433df83b0f3922a71154ece4bb5eb6c666f', 'Bad', 'Luck', 'Brian', 'Alumni', 'Scholastics', '2006-11111', 'Charter', '2006', 'Good Guy Greg', '1111-11-11', 'Internetz', 'Internetz', 'public/uploads/badluckbrian.png', 'Bad Luck Brian', 'Scholastics Head'),
('kath28', '247a3394f50d50c119f9f846a1853433df83b0f3922a71154ece4bb5eb6c666f', 'Katherine', 'So', 'Villegas', 'Active', 'Senior Projects and Activities', '2012-22222', 'Synergy', '2012', 'Suzette De Torres', '1995-01-28', 'Candelaria, Quezon', 'Silverios Compound', 'public/uploads/kath28.jpg', 'Katherine So Villegas', NULL),
('almermamer', '247a3394f50d50c119f9f846a1853433df83b0f3922a71154ece4bb5eb6c666f', 'Almer', 'Taculog', 'Mendoza', 'Active', 'Junior Projects and Activities', '2013-12112', 'RAMpage', '2013', 'kath28', '1996-11-08', 'Pateros, Rizal', 'Vetmed Dorm', 'public/uploads/almermamer.jpg', 'Almer Taculog Mendoza', NULL),
('queenjubs', '247a3394f50d50c119f9f846a1853433df83b0f3922a71154ece4bb5eb6c666f', 'Jhubielyn', 'Go', 'Garachico', 'Active', 'Senior Projects and Activities', '2012-51343', 'Synergy', '2012', 'Idk lol', '1995-11-12', 'Somewhere', 'Silverios Compound', 'public/uploads/queenjubs.jpg', 'Jhubielyn Go Garachico', NULL),
('kimini07', '247a3394f50d50c119f9f846a1853433df83b0f3922a71154ece4bb5eb6c666f', 'Kim Joshua', 'Caicdoy', 'Advincula', 'Active', 'Senior Projects and Activities', '2011-12312', 'Synergy', '2011', 'Kim''s Mentor', '3232-12-31', 'Makati', 'Bella Cartash', 'public/uploads/kimini07.jpg', 'Kim Joshua Caicdoy Advincula', 'Deputy Executive Officer'),
('penguinlove', '247a3394f50d50c119f9f846a1853433df83b0f3922a71154ece4bb5eb6c666f', 'Maria Clarissa', 'Sulit', 'Estremos', 'Active', 'Secretariat', '2011-55645', 'Synergy', '2011', 'Cla''s Mentor', '5234-04-27', 'Binangonan, Rizal', 'Bella Cartash', 'public/uploads/penguinlove.jpg', 'Maria Clarissa Sulit Estremos', 'Executive Assistant'),
('youryayness', '247a3394f50d50c119f9f846a1853433df83b0f3922a71154ece4bb5eb6c666f', 'Desery', 'Ramos', 'Sabado', 'Active', 'Human Resources', '2011-43432', 'Synergy', '2011', 'Yay''s Mentor', '3212-12-27', 'Muntinlupa', 'Student''s Dorm', 'public/uploads/youryayness.jpg', 'Desery Ramos Sabado', 'Human Resources Head'),
('arvielimbo', '247a3394f50d50c119f9f846a1853433df83b0f3922a71154ece4bb5eb6c666f', 'Arvie', 'Abrencillo', 'Limbo', 'Active', 'Finance', '2012-12321', 'Synergy', '2012', 'Angela Roscel Brojas Almoro', '1111-11-10', 'Quezon', 'New Dorm', 'public/uploads/arvielimbo.jpg', 'Arvie Abrencillo Limbo', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `accounts_almermamer_mentees`
--

CREATE TABLE IF NOT EXISTS `accounts_almermamer_mentees` (
  `mentees` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `accounts_arvielimbo_mentees`
--

CREATE TABLE IF NOT EXISTS `accounts_arvielimbo_mentees` (
  `mentees` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `accounts_arvielimbo_mentees`
--

INSERT INTO `accounts_arvielimbo_mentees` (`mentees`) VALUES
('tricycle');

-- --------------------------------------------------------

--
-- Table structure for table `accounts_badluckbrian_mentees`
--

CREATE TABLE IF NOT EXISTS `accounts_badluckbrian_mentees` (
  `mentees` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `accounts_kath28_mentees`
--

CREATE TABLE IF NOT EXISTS `accounts_kath28_mentees` (
  `mentees` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `accounts_kath28_mentees`
--

INSERT INTO `accounts_kath28_mentees` (`mentees`) VALUES
('almermamer');

-- --------------------------------------------------------

--
-- Table structure for table `accounts_kimini07_mentees`
--

CREATE TABLE IF NOT EXISTS `accounts_kimini07_mentees` (
  `mentees` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
  `exec_position` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `accounts_penguinlove_mentees`
--

CREATE TABLE IF NOT EXISTS `accounts_penguinlove_mentees` (
  `mentees` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `accounts_penguinlove_mentees`
--

INSERT INTO `accounts_penguinlove_mentees` (`mentees`) VALUES
('qylegeronimo');

-- --------------------------------------------------------

--
-- Table structure for table `accounts_queenjubs_mentees`
--

CREATE TABLE IF NOT EXISTS `accounts_queenjubs_mentees` (
  `mentees` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `accounts_queenjubs_mentees`
--

INSERT INTO `accounts_queenjubs_mentees` (`mentees`) VALUES
('Mon Cedrick Glipo Frias');

-- --------------------------------------------------------

--
-- Table structure for table `accounts_qylegeronimo_mentees`
--

CREATE TABLE IF NOT EXISTS `accounts_qylegeronimo_mentees` (
  `mentees` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `accounts_tricycle_mentees`
--

CREATE TABLE IF NOT EXISTS `accounts_tricycle_mentees` (
  `mentees` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `accounts_youryayness_mentees`
--

CREATE TABLE IF NOT EXISTS `accounts_youryayness_mentees` (
  `mentees` varchar(50) DEFAULT NULL
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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=25 ;

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
('Secretariat', 'test', '2015-01-09 00:48:49', 24, '321');

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
  `message` varchar(500) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

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
