-- MySQL dump 10.13  Distrib 5.7.17, for macos10.12 (x86_64)
--
-- Host: localhost    Database: my_schema
-- ------------------------------------------------------
-- Server version	5.7.17

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `food`
--

DROP TABLE IF EXISTS `food`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `food` (
  `food_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `info` varchar(500) NOT NULL,
  PRIMARY KEY (`food_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `food`
--

LOCK TABLES `food` WRITE;
/*!40000 ALTER TABLE `food` DISABLE KEYS */;
/*!40000 ALTER TABLE `food` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gallery`
--

DROP TABLE IF EXISTS `gallery`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gallery` (
  `gallery_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `info` varchar(45) NOT NULL,
  `url` varchar(200) DEFAULT NULL,
  `users_id` int(11) unsigned NOT NULL,
  PRIMARY KEY (`gallery_id`),
  UNIQUE KEY `users_id_UNIQUE` (`users_id`),
  CONSTRAINT `gallery_ibfk_1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gallery`
--

LOCK TABLES `gallery` WRITE;
/*!40000 ALTER TABLE `gallery` DISABLE KEYS */;
INSERT INTO `gallery` VALUES (6,'ddd','sfadsfddd','foodimg/koreanfood1512323033240.jpeg',1);
/*!40000 ALTER TABLE `gallery` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) unsigned NOT NULL,
  `username` varchar(20) NOT NULL,
  `password` char(60) NOT NULL,
  `email` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'jungee','$2a$10$i6BpIeKpuXARDhz43qDpnuKU7qxR5.SA5t3T3/hTbFeWgcT2/4HIu',''),(2,'j1','1234',''),(3,'jungee135','$2a$10$5HgMg14Oy99D3A983PU.jO72JIuDsnwanU9kHqbUn7UtnRaPHV4/m',''),(4,'111','$2a$10$dXB8KUefz1ryqS7KXfOkAegSS5IJkNM.6FYRMXYpq6PTZev6hsY0G',NULL),(5,'1111','$2a$10$giuLdh2pjV2UTMeXbpbTwOBC7S5yiJVxzp91lu/huL218KMQqHn7W',NULL),(6,'hihi','$2a$10$ffEThm3EC1gkfggUpn83ieVE//XjlfGOwdIj6523pbQk5Dtj9TCdG',NULL),(7,'dd','$2a$10$R/3dvWCFjzr/lTbHV3t/perB.PZP1UyWWeFXjPe2Ho4nCH7OMzCz.',NULL),(8,'jungee1234','$2a$10$0ObeMN2P6CM8YtIYieA4UOUuAmHeCc8e/bE8.j.Sc8i0fnEVl88o.',NULL),(9,'ddd','$2a$10$mFDkpgzpT3EyXiuvf4Kc7.f0Di7Nh.a7JVmEVsRW1hbXg5PUSmqu2',NULL),(10,'1234','$2a$10$dVuNKwQZdkPIKK77p.T7P.0.YV21quOWjqQ10fDksPmn5.IDNxinC',NULL),(11,'jjj','$2a$10$2wuqTbgongsbEZDyJmCKJ.mjwnfTfxzu.tx7ToPfJfGa2cyPU39hi',NULL),(12,'test','$2a$10$ogHQfN8s/7cxOSPA8ErJ3u2FaqyDhKmLw4mX1wIe/aAiknlNDV3Oe',NULL),(13,'test1','$2a$10$/60hWclURfLMW6Xp5pPM2.FBdye.kOSqj8s/OmqGKY0xTKBF0kxP2',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-12-04 12:30:35
