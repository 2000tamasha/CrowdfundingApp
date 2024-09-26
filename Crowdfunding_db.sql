-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: crowdfunding_db
-- ------------------------------------------------------
-- Server version	8.0.39

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
-- Table structure for table `category`
--

DROP TABLE IF EXISTS category;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE category (
  CATEGORY_ID varchar(5) NOT NULL,
  `NAME` varchar(30) DEFAULT NULL,
  PRIMARY KEY (CATEGORY_ID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES category WRITE;
/*!40000 ALTER TABLE category DISABLE KEYS */;
INSERT INTO category VALUES ('C001','Medical'),('C002','Education'),('C003','Environment');
/*!40000 ALTER TABLE category ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fundraiser`
--

DROP TABLE IF EXISTS fundraiser;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE fundraiser (
  FUNDRAISER_ID varchar(5) NOT NULL,
  ORGANIZER varchar(30) DEFAULT NULL,
  CAPTION varchar(150) DEFAULT NULL,
  TARGET_FUNDING int DEFAULT NULL,
  CURRENT_FUNDING int DEFAULT NULL,
  CITY varchar(50) DEFAULT NULL,
  `ACTIVE` enum('Active','Suspended') NOT NULL,
  CATEGORY_ID varchar(5) DEFAULT NULL,
  PRIMARY KEY (FUNDRAISER_ID),
  KEY CATEGORY_ID (CATEGORY_ID),
  CONSTRAINT fundraiser_ibfk_1 FOREIGN KEY (CATEGORY_ID) REFERENCES category (CATEGORY_ID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fundraiser`
--

LOCK TABLES fundraiser WRITE;
/*!40000 ALTER TABLE fundraiser DISABLE KEYS */;
INSERT INTO fundraiser VALUES ('F001','Ronnie Hong','Support for Cancer Treatment',10000,4500,'New York','Active','C001'),('F002','Blake Murphy','Help Build School in Rural Area',20000,13000,'Los Angeles','Active','C002'),('F003','Charlize Sadleir','Reforesting Project for the Amazon',15000,7000,'Rio de Janeiro','Active','C003'),('F004','Raven Ziazan','Scholarship Fund for Underprivileged Students',12000,3000,'San Francisco','Active','C002'),('F005','Henry Diggs','Clean Water Initiative',18000,9000,'Cape Town','Active','C003');
/*!40000 ALTER TABLE fundraiser ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-09-26 13:51:51
