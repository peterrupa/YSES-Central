-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Dec 20, 2014 at 10:49 AM
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
  `is_exec` int(1) NOT NULL,
  `picture` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `accounts`
--

INSERT INTO `accounts` (`username`, `password`, `first_name`, `middle_name`, `last_name`, `org_class`, `department`, `student_number`, `org_batch`, `univ_batch`, `mentor`, `birthday`, `home_address`, `college_address`, `is_exec`, `picture`) VALUES
('tricycle', 'b3afa1d451da8bab35e52323c5fe6e19bd2cde2905529789bfe4f787', 'Peter Bernard', 'Mariano', 'Rupa', 'Active', 'jpad', '2013-45106', 'RAMpage', '2012', 'arvielimbo', '1996-11-29', 'Block 1 Lot 10 Nova Romania, Deparo, Caloocan', 'Mendoza Dorm', 0, 'public/uploads/pending/tricycle.jpg'),
('zaizai', 'b3afa1d451da8bab35e52323c5fe6e19bd2cde2905529789bfe4f787', 'Zion Ruth', 'Borres', 'Gragasin', 'Alumni', 'hr', '2013-11111', 'RAMpage', '2014', 'tricycle', '1996-06-06', 'Deparo, Caloocan', 'PUP', 0, 'public/uploads/pending/zaizai.jpg');

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
  `mentor` varchar(50) NOT NULL,
  `birthday` date NOT NULL,
  `home_address` varchar(100) NOT NULL,
  `college_address` varchar(100) NOT NULL,
  `is_exec` int(1) NOT NULL,
  `picture` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `accounts_tricycle_mentees`
--

CREATE TABLE IF NOT EXISTS `accounts_tricycle_mentees` (
  `mentees` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `accounts_tricycle_mentees`
--

INSERT INTO `accounts_tricycle_mentees` (`mentees`) VALUES
('zaizai'),
('tricycle');

-- --------------------------------------------------------

--
-- Table structure for table `accounts_zaizai_mentees`
--

CREATE TABLE IF NOT EXISTS `accounts_zaizai_mentees` (
  `mentees` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `announcement_posts`
--

CREATE TABLE IF NOT EXISTS `announcement_posts` (
  `department` varchar(30) NOT NULL,
  `message` varchar(500) NOT NULL,
  `date` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
