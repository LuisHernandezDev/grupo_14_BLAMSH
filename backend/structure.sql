CREATE DATABASE  IF NOT EXISTS `blamsh` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci */;
USE `blamsh`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: blamsh
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.28-MariaDB

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
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category` varchar(45) DEFAULT NULL,
  `description` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Indumentaria',NULL),(2,'Equipamiento y Repuestos',NULL),(3,'Accesorios',NULL);
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` varchar(100) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `category_id` int(11) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `categori_FK` (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (35,'Pantalón','Pantalón resistente y cómodo para la práctica de motocross.','img-1699498399282-pantalon.png',56.00,1),(44,'Conjunto Jersey y Pantalón','Conjunto de alta calidad para tus competiciones','img-1699498439740-jersey_motocross.png',86.00,2),(45,'Casco','Casco de seguridad y estilo para los motociclistas','img-1699498466029-casco_motocross.png',45.00,1),(46,'Guantes','Guantes resistentes para el agarre y protección en tu motocicleta','img-1699498493787-Guantes.png',30.00,1),(47,'Lentes','Lentes de protección para los ojos en actividades de motocross','img-1699498532586-lentes.jpeg',56.00,1),(48,'Lentes negros','Lentes de protección para los ojos en actividades de motocross','img-1699498580196-lentes_negros.jpeg',65.00,3),(49,'Cadena Motocicleta','Cadena de alta resistencia para tu motocicletas','img-1699498709528-cadena_motocross.jpeg',120.00,2),(50,'Neumáticos','Neumático trasero de alto agarre','img-1699498826875-neumaticos.jpeg',45.00,2),(51,'Casco','Casco de protección para motocross nuevo','img-1699498860294-casco_motocross.png',54.00,2),(52,'Guantes','Guantes para motocross','img-1699498885705-Guantes.png',32.00,3),(54,'Herramientas de Reparación','Kit de herramientas esenciales para reparaciones de emergencia','img-1699499032434-Kit_de_herramientas.jpg',25.00,1),(62,'Lentes de Protección','Lentes de Protección para motocross con lente anti-rayaduras','img-1699499134530-lentes_rayaduras.jpeg',15.00,3),(63,'Conjunto de Llaves','Conjunto de llaves métricas para el mantenimiento de la moto','img-1699499203611-llaves_metricas.jpg',32.00,3),(64,'Kit de Pegatinas','Kit de pegatinas de alta calidad para personalizar la moto','img-1699499289667-calcomanias.jpg',32.00,3),(65,'Camiseta Impermeable','Camiseta impermeable para protegerte en condiciones climáticas adversas','img-1699499443533-camiseta_impermeable.png',38.00,1),(66,'Jersey de Competición','Jersey de alta calidad para competir','img-1699499490172-jersey_motocross.png',45.00,2),(67,'Conjunto Jersey y Pantalón Blanco','Conjunto de alta calidad para tus competiciones','img-1699499580805-conjunto_motocross.jpg',89.00,1),(68,'Protector de Manos','Protector de manos resistente','img-1699499725813-protector_de_manos.jpg',67.00,2);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products_sizes`
--

DROP TABLE IF EXISTS `products_sizes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products_sizes` (
  `id_product` int(11) NOT NULL,
  `id_size` int(11) NOT NULL,
  `stock` int(11) DEFAULT NULL,
  KEY `id_product_FK` (`id_product`),
  KEY `id_size_FK` (`id_size`),
  CONSTRAINT `id_product_FK` FOREIGN KEY (`id_product`) REFERENCES `products` (`id`),
  CONSTRAINT `id_size_FK` FOREIGN KEY (`id_size`) REFERENCES `sizes` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products_sizes`
--

LOCK TABLES `products_sizes` WRITE;
/*!40000 ALTER TABLE `products_sizes` DISABLE KEYS */;
INSERT INTO `products_sizes` VALUES (35,3,NULL),(44,3,NULL),(44,4,NULL),(45,2,NULL),(46,2,NULL),(47,2,NULL),(48,2,NULL),(49,2,NULL),(50,4,NULL),(51,2,NULL),(52,1,NULL),(52,3,NULL),(54,2,NULL),(62,3,NULL),(62,4,NULL),(63,2,NULL),(64,2,NULL),(65,1,NULL),(65,2,NULL),(65,3,NULL),(65,4,NULL),(66,2,NULL),(66,3,NULL),(67,1,NULL),(67,2,NULL),(67,3,NULL),(67,4,NULL),(68,1,NULL),(68,2,NULL);
/*!40000 ALTER TABLE `products_sizes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rols`
--

DROP TABLE IF EXISTS `rols`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rols` (
  `id` int(11) NOT NULL,
  `nameRol` varchar(45) DEFAULT NULL,
  `description` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rols`
--

LOCK TABLES `rols` WRITE;
/*!40000 ALTER TABLE `rols` DISABLE KEYS */;
INSERT INTO `rols` VALUES (1,'customer','Cliente puede comprar'),(2,'admin','Admin puede crear productos');
/*!40000 ALTER TABLE `rols` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sizes`
--

DROP TABLE IF EXISTS `sizes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sizes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `size` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sizes`
--

LOCK TABLES `sizes` WRITE;
/*!40000 ALTER TABLE `sizes` DISABLE KEYS */;
INSERT INTO `sizes` VALUES (1,'XL'),(2,'M'),(3,'S'),(4,'L');
/*!40000 ALTER TABLE `sizes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `identification` varchar(30) DEFAULT NULL,
  `firstName` varchar(80) DEFAULT NULL,
  `lastName` varchar(100) DEFAULT NULL,
  `phone` bigint(20) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(75) DEFAULT NULL,
  `rol_id` int(11) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `date_creation` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `rol_FK` (`rol_id`),
  CONSTRAINT `rol_FK` FOREIGN KEY (`rol_id`) REFERENCES `rols` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,NULL,'jose','perez',1234,'joseperez@gmail.com','123',1,'1696034827562_img_Captura de pantalla 2023-05-02 190811.png','2023-09-30 00:47:07'),(2,NULL,'josefa','camejo',123,'josefa@gmail.com','123',1,'1696036028063_img_Captura de pantalla 2023-05-02 190811 - copia.png','2023-09-30 01:07:08'),(3,NULL,'Simon','Bolivar',1234,'simon@gmail.com','$2b$10$RoYgTo9pgD6kKgYFzZLWRuPfMoywOYPxcRuUb9JoYx9wQIPR.w.fG',2,'1697150186807_img_soy-el-admin.jpg','2023-09-30 02:18:41'),(4,NULL,'Simon2','Bolivar2',1234,'simon2@gmail.com','$2b$10$2HVW38K.0BYPI/47uOslf.E9rX3p/MoxIUdvGMeIKImPacT357N9W',1,'C:\\Users\\56961\\Desktop\\Proyecto\\PROYECTO INTEGRADOR\\grupo_14_BLAMSH\\public\\images\\users\\1696041878287_img_Captura de pantalla 2023-05-02 190811 - copia.png','2023-09-30 02:44:38'),(5,NULL,'Simon23','Bolivar23',1234,'simon23@gmail.com','$2b$10$2omFXRf0Jx1.i3v4IkyNsOevBB0YTWbZ/phfe3Z.MD9JJzOdELdcG',1,'C:\\Users\\56961\\Desktop\\Proyecto\\PROYECTO INTEGRADOR\\grupo_14_BLAMSH\\controllers\\public\\images\\users\\1696042127087_img_Captura de pantalla 2023-05-02 190811 - copia.png','2023-09-30 02:48:47'),(6,NULL,'Simon234','Bolivar234',1234,'simon234@gmail.com','$2b$10$Zcca.Z1AvswTWNj4k7ApCeokQW6QrlbgaNxnQLD3LW8BcIIE9yf6q',1,'C:\\Users\\56961\\Desktop\\Proyecto\\PROYECTO INTEGRADOR\\grupo_14_BLAMSH\\controllers\\public\\images\\users\\1696042445787_img_Captura de pantalla 2023-05-02 190811 - copia.png','2023-09-30 02:54:05'),(7,NULL,'Simon2345','Bolivar2345',1234,'simon2345@gmail.com','$2b$10$2HfAxuBw9zWl.yKK0BmOO.GBUR6CoIMs2XjRaBdep10muFbpDaIBe',1,'C:\\Users\\56961\\Desktop\\Proyecto\\PROYECTO INTEGRADOR\\public\\images\\users\\1696042484402_img_Captura de pantalla 2023-05-02 190811 - copia.png','2023-09-30 02:54:44'),(8,NULL,'Simon23456','Bolivar23456',12346,'simon23456@gmail.com','$2b$10$1lfVKcsQ1JMRw4BR8ncW4elSOHZqbZWqfktF7gRQTR/1QDMlwRfTy',1,'C:\\Users\\56961\\Desktop\\Proyecto\\PROYECTO INTEGRADOR\\grupo_14_BLAMSH\\controllers\\public\\images\\users\\1696042527086_img_Captura de pantalla 2023-05-02 190811 - copia.png','2023-09-30 02:55:27'),(9,NULL,'Simon234567','Bolivar234567',12346,'simon234567@gmail.com','$2b$10$WnDsEj5y2cdANbxqygqLiOWLA0yxQ53pxnyPnJqbZlaL0Qpgl8zG.',1,'C:\\Users\\56961\\Desktop\\Proyecto\\PROYECTO INTEGRADOR\\grupo_14_BLAMSH\\public\\images\\users\\1696042614654_img_Captura de pantalla 2023-05-02 190811 - copia.png','2023-09-30 02:56:54'),(10,NULL,'Simon2345678','Bolivar2345678',12346,'simon2345678@gmail.com','$2b$10$yRFkPhAkdj.5DMoqxScS7Oj/OFJLQgTPkwV8LX7lRphTnV5wa9gDG',1,'C:\\Users\\56961\\Desktop\\Proyecto\\PROYECTO INTEGRADOR\\grupo_14_BLAMSH\\public\\images\\users\\1696044046590_img_Captura de pantalla 2023-05-02 190811 - copia.png','2023-09-30 03:20:46'),(11,NULL,'francisco','demiranda',12346,'miranda@gmail.com','$2b$10$TRmQ.1Gy20aOL33q/ImQQ.aTb/slKSQDCdYOW69/Y2/9bKsoVl9Qm',1,'C:\\Users\\56961\\Desktop\\Proyecto\\PROYECTO INTEGRADOR\\grupo_14_BLAMSH\\controllers\\public\\images\\users\\1696044287105_img_Captura de pantalla 2023-05-02 190811 - copia.png','2023-09-30 03:24:47'),(12,NULL,'Andres','Bello',5555555,'andres@gmail.com','$2b$10$C.PkOS7VdvV.IMhrXNFGpeRTVffI5fo6b9OlrMdx3kuP1QByW70N2',1,'1696214989924_img_Captura de pantalla 2023-06-22 223409.png','2023-09-30 04:12:11'),(13,NULL,'Andres1','Bello1',123,'andres1@gmail.com','$2b$10$AY7BJq2BB6pDJVN9608OX.gNOtaywM9MB5lfh8iAXuUWV/TBtKbJ.',1,'1696047232219_img_Captura de pantalla 2023-05-02 190811 - copia.png','2023-09-30 04:13:52'),(14,NULL,'pepa','perez',12345,'pepa@gmail.com','$2b$10$vayVT4QYLK8FR6TSioSgDOwC7ydYx9QX2.4thH47Rq5sn85jLmOEy',1,'1696047441369_img_Captura de pantalla 2023-05-02 190811 - copia.png','2023-09-30 04:17:21'),(15,NULL,'Jose Antonio','Paez',99999,'paez@gmail.com','$2b$10$45x2YF6XyRkCXWQwyXM8E.Qrcn/KTpGt3RbdwSKvH4JMR6eivsKKe',1,'1696215718358_img_Captura de pantalla 2023-05-02 190811 - copia.png','2023-10-02 03:01:58');
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

-- Dump completed on 2023-11-09 22:56:03
