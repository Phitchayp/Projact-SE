CREATE DATABASE  IF NOT EXISTS `databasese` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `databasese`;
-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: localhost    Database: databasese
-- ------------------------------------------------------
-- Server version	8.0.23

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `allusers`
--

DROP TABLE IF EXISTS `allusers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `allusers` (
  `id` int NOT NULL,
  `email` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `fullname` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`,`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `allusers`
--

LOCK TABLES `allusers` WRITE;
/*!40000 ALTER TABLE `allusers` DISABLE KEYS */;
INSERT INTO `allusers` VALUES (1,'ailada.w@ku.th','ailada'),(2,'ailada.w@live.ku.th','ailadaa'),(3,'ailadaaice1718@gmail.com','aaailada');
/*!40000 ALTER TABLE `allusers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `box`
--

DROP TABLE IF EXISTS `box`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `box` (
  `id` int NOT NULL AUTO_INCREMENT,
  `info` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `box`
--

LOCK TABLES `box` WRITE;
/*!40000 ALTER TABLE `box` DISABLE KEYS */;
INSERT INTO `box` VALUES (1,'ประกาศ');
/*!40000 ALTER TABLE `box` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course`
--

DROP TABLE IF EXISTS `course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `course` (
  `courseid` int NOT NULL AUTO_INCREMENT,
  `course_year` int DEFAULT NULL,
  `subject_id` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `subject_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `credit` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `category` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`courseid`)
) ENGINE=InnoDB AUTO_INCREMENT=129 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course`
--

LOCK TABLES `course` WRITE;
/*!40000 ALTER TABLE `course` DISABLE KEYS */;
INSERT INTO `course` VALUES (1,2565,'03603111','Programming Fundamentals I','3(2-3-6)','วิชาแกน'),(2,2565,'03603112','Programming Fundamentals II','3(2-3-6)','วิชาแกน'),(3,2565,'03603171','Introduction to Computer Engineering and Informatics','3(3-0-6)','วิชาบังคับ'),(4,2565,'03603251','Database Systems','3(3-0-6)','วิชาบังคับ'),(5,2565,'03603252','Database Systems Laboratory','1(0-3-2)','วิชาบังคับ'),(6,2565,'03603212','Abstract Data Types and Problem Solving','3(3-0-6)','วิชาบังคับ'),(7,2565,'03603213','Algorithm Design and Analysis','3(3-0-6)','วิชาบังคับ'),(8,2565,'03603214','Programming Skills Development Laboratory','1(0-3-2)','วิชาบังคับ'),(9,2565,'03603341','Software Engineering','4(3-3-8)','วิชาบังคับ'),(10,2565,'03603211','Discrete Mathematics','3(3-0-6)','วิชาบังคับ'),(11,2565,'03603312','Probability and Statistics for Informatics','3(3-0-6)','วิชาบังคับ'),(12,2565,'03603325','Data Communications and Computer Networks','3(3-0-6)','วิชาบังคับ'),(13,2565,'03603332','Operating Systems','3(3-0-6)','วิชาบังคับ'),(14,2565,'03601203','Electronics for Computer Engineers','3(3-0-6)','วิชาบังคับ'),(15,2565,'03601303','Electronics Laboratory for Computer Engineers','1(0-3-2)','วิชาบังคับ'),(16,2565,'03603221','Digital Systems Design','3(3-0-6)','วิชาบังคับ'),(17,2565,'03603222','Logic Circuit Laboratory','1(0-3-2)','วิชาบังคับ'),(18,2565,'03603223','Computer Architecture and Organization','3(3-0-6)','วิชาบังคับ'),(19,2565,'03603323','Introduction to Embedded Systems','3(3-0-6)','วิชาบังคับ'),(20,2565,'03603324','Embedded Systems Laboratory','1(0-3-2)','วิชาบังคับ'),(21,2565,'03603299','Exploratory Project in Computing','1(0-3-2)','วิชาบังคับ'),(22,2565,'03603497','Seminar','1','วิชาบังคับ'),(23,2565,'03603421','Internetworking with TCP/IP','3(3-0-6)','วิชาเลือก'),(24,2565,'03603422','Wireless and Mobile Networks','3(3-0-6)','วิชาเลือก'),(25,2565,'03603423','Network Programming','3(3-0-6)','วิชาเลือก'),(26,2565,'03603424','Computer Networks Laboratory I','1(0-3-2)','วิชาเลือก'),(27,2565,'03603425','Computer Networks Laboratory II','1(0-3-2)','วิชาเลือก'),(28,2565,'03603426','Computer Security','3(3-0-6)','วิชาเลือก'),(29,2565,'03603427','Mobile Computing','3(3-0-6)','วิชาเลือก'),(30,2565,'03603428','Internet of Things','3(3-0-6)','วิชาเลือก'),(31,2565,'03603411','Functional Programming','3(3-0-6)','วิชาเลือก'),(32,2565,'03603423','Network Programming','3(3-0-6)','วิชาเลือก'),(33,2565,'03603435','Cloud Computing','3(3-0-6)','วิชาเลือก'),(34,2565,'03603436','Web Application Development','3(3-0-6)','วิชาเลือก'),(35,2565,'03603437','Mobile Application Development','3(3-0-6)','วิชาเลือก'),(36,2565,'03603441','Object-Oriented Analysis and Design','3(3-0-6)','วิชาเลือก'),(37,2565,'03603482','User Experience Design','3(3-0-6)','วิชาเลือก'),(38,2565,'03603484','Computer Game Development','3(3-0-6)','วิชาเลือก'),(39,2565,'01204466','Deep Learing','3(3-0-6)','วิชาเลือก'),(40,2565,'03603351','Introduction to Data Science','3(3-0-6)','วิชาเลือก'),(41,2565,'03603452','Data Mining','3(3-0-6)','วิชาเลือก'),(42,2565,'03603461','Artificial Intelligence','3(3-0-6)','วิชาเลือก'),(43,2565,'03603462','Statistical Learning','3(3-0-6)','วิชาเลือก'),(44,2565,'03603463','Biologically-Inspired Computational Intelligence','3(3-0-6)','วิชาเลือก'),(45,2565,'03603371','Digital Signal Processing for Computer Engineers','3(3-0-6)','วิชาเลือก'),(46,2565,'03603372','Digital Image Processing','3(3-0-6)','วิชาเลือก'),(47,2565,'03603461','Artificial Intelligence','3(3-0-6)','วิชาเลือก'),(48,2565,'03603464','Computer Vision','3(3-0-6)','วิชาเลือก'),(49,2565,'03603481','Computer Graphics','3(3-0-6)','วิชาเลือก'),(50,2565,'03603484','Computer Game Development','3(3-0-6)','วิชาเลือก'),(51,2565,'03603485','Digital Audio and Computer Music','3(3-0-6)','วิชาเลือก'),(52,2565,'03603495','Computer Engineering and Informatics Project Preparation','1(0-3-2)','วิชาเลือก'),(53,2565,'03603499','Computer Engineering and Informatics Project','2(0-6-3)','วิชาเลือก'),(54,2565,'01204411','Quantum Computing','3(3-0-6)','วิชาเลือก'),(55,2565,'01204213','Theory of Computaiton','3(3-0-6)','วิชาเลือก'),(56,2565,'03603432','Programming Language Concepts','3(3-0-6)','วิชาเลือก'),(57,2565,'03603451','Information Technology Management','3(3-0-6)','วิชาเลือก'),(58,2565,'03603471','Embedded Systems Interfacing','3(3-0-6)','วิชาเลือก'),(59,2565,'03603496','Selected Topics in Computer Engineering and Informatics','1','วิชาเลือก'),(60,2565,'03603498','Special Problems','1','วิชาเลือก'),(61,2565,'03600390','Co-operative Education Preparation','3(3-0-6)','วิชาเลือก'),(62,2565,'03600490','Co-operative Education','6','วิชาเลือก'),(63,2565,'03603352','Laws and Ethics in Information Technology','3(3-0-6)','วิชาเลือก'),(64,2565,'03600013','Essential Computer Tools and Skills','1(0-3-2)','วิชาทั่วไป'),(65,2569,'03603111','Programming Fundamentals I','3(2-3-6)','วิชาแกน'),(66,2569,'03603112','Programming Fundamentals II','3(2-3-6)','วิชาแกน'),(67,2569,'03603171','Introduction to Computer Engineering and Informatics','3(3-0-6)','วิชาบังคับ'),(68,2569,'03603251','Database Systems','3(3-0-6)','วิชาบังคับ'),(69,2569,'03603252','Database Systems Laboratory','1(0-3-2)','วิชาบังคับ'),(70,2569,'03603212','Abstract Data Types and Problem Solving','3(3-0-6)','วิชาบังคับ'),(71,2569,'03603213','Algorithm Design and Analysis','3(3-0-6)','วิชาบังคับ'),(72,2569,'03603214','Programming Skills Development Laboratory','1(0-3-2)','วิชาบังคับ'),(73,2569,'03603341','Software Engineering','4(3-3-8)','วิชาบังคับ'),(74,2569,'03603211','Discrete Mathematics','3(3-0-6)','วิชาบังคับ'),(75,2569,'03603312','Probability and Statistics for Informatics','3(3-0-6)','วิชาบังคับ'),(76,2569,'03603325','Data Communications and Computer Networks','3(3-0-6)','วิชาบังคับ'),(77,2569,'03603332','Operating Systems','3(3-0-6)','วิชาบังคับ'),(78,2569,'03601203','Electronics for Computer Engineers','3(3-0-6)','วิชาบังคับ'),(79,2569,'03601303','Electronics Laboratory for Computer Engineers','1(0-3-2)','วิชาบังคับ'),(80,2569,'03603221','Digital Systems Design','3(3-0-6)','วิชาบังคับ'),(81,2569,'03603222','Logic Circuit Laboratory','1(0-3-2)','วิชาบังคับ'),(82,2569,'03603223','Computer Architecture and Organization','3(3-0-6)','วิชาบังคับ'),(83,2569,'03603323','Introduction to Embedded Systems','3(3-0-6)','วิชาบังคับ'),(84,2569,'03603324','Embedded Systems Laboratory','1(0-3-2)','วิชาบังคับ'),(85,2569,'03603299','Exploratory Project in Computing','1(0-3-2)','วิชาบังคับ'),(86,2569,'03603497','Seminar','1','วิชาบังคับ'),(87,2569,'03603421','Internetworking with TCP/IP','3(3-0-6)','วิชาเลือก'),(88,2569,'03603422','Wireless and Mobile Networks','3(3-0-6)','วิชาเลือก'),(89,2569,'03603423','Network Programming','3(3-0-6)','วิชาเลือก'),(90,2569,'03603424','Computer Networks Laboratory I','1(0-3-2)','วิชาเลือก'),(91,2569,'03603425','Computer Networks Laboratory II','1(0-3-2)','วิชาเลือก'),(92,2569,'03603426','Computer Security','3(3-0-6)','วิชาเลือก'),(93,2569,'03603427','Mobile Computing','3(3-0-6)','วิชาเลือก'),(94,2569,'03603428','Internet of Things','3(3-0-6)','วิชาเลือก'),(95,2569,'03603411','Functional Programming','3(3-0-6)','วิชาเลือก'),(96,2569,'03603423','Network Programming','3(3-0-6)','วิชาเลือก'),(97,2569,'03603435','Cloud Computing','3(3-0-6)','วิชาเลือก'),(98,2569,'03603436','Web Application Development','3(3-0-6)','วิชาเลือก'),(99,2569,'03603437','Mobile Application Development','3(3-0-6)','วิชาเลือก'),(100,2569,'03603441','Object-Oriented Analysis and Design','3(3-0-6)','วิชาเลือก'),(101,2569,'03603482','User Experience Design','3(3-0-6)','วิชาเลือก'),(102,2569,'03603484','Computer Game Development','3(3-0-6)','วิชาเลือก'),(103,2569,'01204466','Deep Learing','3(3-0-6)','วิชาเลือก'),(104,2569,'03603351','Introduction to Data Science','3(3-0-6)','วิชาเลือก'),(105,2569,'03603452','Data Mining','3(3-0-6)','วิชาเลือก'),(106,2569,'03603461','Artificial Intelligence','3(3-0-6)','วิชาเลือก'),(107,2569,'03603462','Statistical Learning','3(3-0-6)','วิชาเลือก'),(108,2569,'03603463','Biologically-Inspired Computational Intelligence','3(3-0-6)','วิชาเลือก'),(109,2569,'03603371','Digital Signal Processing for Computer Engineers','3(3-0-6)','วิชาเลือก'),(110,2569,'03603372','Digital Image Processing','3(3-0-6)','วิชาเลือก'),(111,2569,'03603461','Artificial Intelligence','3(3-0-6)','วิชาเลือก'),(112,2569,'03603464','Computer Vision','3(3-0-6)','วิชาเลือก'),(113,2569,'03603481','Computer Graphics','3(3-0-6)','วิชาเลือก'),(114,2569,'03603484','Computer Game Development','3(3-0-6)','วิชาเลือก'),(115,2569,'03603485','Digital Audio and Computer Music','3(3-0-6)','วิชาเลือก'),(116,2569,'03603495','Computer Engineering and Informatics Project Preparation','1(0-3-2)','วิชาเลือก'),(117,2569,'03603499','Computer Engineering and Informatics Project','2(0-6-3)','วิชาเลือก'),(118,2569,'01204411','Quantum Computing','3(3-0-6)','วิชาเลือก'),(119,2569,'01204213','Theory of Computaiton','3(3-0-6)','วิชาเลือก'),(120,2569,'03603432','Programming Language Concepts','3(3-0-6)','วิชาเลือก'),(121,2569,'03603451','Information Technology Management','3(3-0-6)','วิชาเลือก'),(122,2569,'03603471','Embedded Systems Interfacing','3(3-0-6)','วิชาเลือก'),(123,2569,'03603496','Selected Topics in Computer Engineering and Informatics','1','วิชาเลือก'),(124,2569,'03603498','Special Problems','1','วิชาเลือก'),(125,2569,'03600390','Co-operative Education Preparation','3(3-0-6)','วิชาเลือก'),(126,2569,'03600490','Co-operative Education','6','วิชาเลือก'),(127,2569,'03603352','Laws and Ethics in Information Technology','3(3-0-6)','วิชาเลือก'),(128,2569,'03600013','Essential Computer Tools and Skills','1(0-3-2)','วิชาทั่วไป');
/*!40000 ALTER TABLE `course` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `credit`
--

DROP TABLE IF EXISTS `credit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `credit` (
  `credit` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `unit` int DEFAULT NULL,
  `lecter_h` int DEFAULT NULL,
  `lab_h` int DEFAULT NULL,
  `practice_h` int DEFAULT NULL,
  PRIMARY KEY (`credit`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `credit`
--

LOCK TABLES `credit` WRITE;
/*!40000 ALTER TABLE `credit` DISABLE KEYS */;
/*!40000 ALTER TABLE `credit` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `register`
--

DROP TABLE IF EXISTS `register`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `register` (
  `idregister` int NOT NULL AUTO_INCREMENT,
  `subj_id` int DEFAULT NULL,
  `subj_name` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `unit` int DEFAULT NULL,
  `lab_sec` int DEFAULT NULL,
  `lecture_sec` int DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `major` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `year` int DEFAULT NULL,
  `day` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `time` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `room` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Instructor` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`idregister`,`room`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `register`
--

LOCK TABLES `register` WRITE;
/*!40000 ALTER TABLE `register` DISABLE KEYS */;
INSERT INTO `register` VALUES (1,1234,'match',3,0,1,100,'t12',4,'mon','10-12','1456','somjai'),(2,145,'scien',3,1,0,50,'t12',3,'mon','12-14','8520','somjit'),(3,120,'eng',1,1,0,20,'t12',2,'mon','10-12','8555','somdee');
/*!40000 ALTER TABLE `register` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roomlab`
--

DROP TABLE IF EXISTS `roomlab`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roomlab` (
  `building` int DEFAULT NULL,
  `room` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `quantity` int DEFAULT NULL,
  PRIMARY KEY (`room`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roomlab`
--

LOCK TABLES `roomlab` WRITE;
/*!40000 ALTER TABLE `roomlab` DISABLE KEYS */;
INSERT INTO `roomlab` VALUES (23,'15120',100),(23,'1520',100),(23,'labcom1',50),(23,'labcom2',50),(23,'labcom7',50),(23,'labcom8',50);
/*!40000 ALTER TABLE `roomlab` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `time`
--

DROP TABLE IF EXISTS `time`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `time` (
  `id` int NOT NULL AUTO_INCREMENT,
  `dayS` date NOT NULL,
  `timeS` time NOT NULL,
  `dayF` date NOT NULL,
  `timeF` time NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `time`
--

LOCK TABLES `time` WRITE;
/*!40000 ALTER TABLE `time` DISABLE KEYS */;
INSERT INTO `time` VALUES (1,'2024-03-06','00:00:00','2024-03-27','00:14:00');
/*!40000 ALTER TABLE `time` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usersed`
--

DROP TABLE IF EXISTS `usersed`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usersed` (
  `idusered` int NOT NULL AUTO_INCREMENT,
  `email` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`idusered`,`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usersed`
--

LOCK TABLES `usersed` WRITE;
/*!40000 ALTER TABLE `usersed` DISABLE KEYS */;
/*!40000 ALTER TABLE `usersed` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-24 15:57:48
