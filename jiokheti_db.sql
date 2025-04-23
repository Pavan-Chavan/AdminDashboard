-- MySQL dump 10.13  Distrib 8.0.13, for Win64 (x86_64)
--
-- Host: localhost    Database: krushimaha
-- ------------------------------------------------------
-- Server version	8.0.13

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `apmc_crop_prices`
--

DROP TABLE IF EXISTS `apmc_crop_prices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `apmc_crop_prices` (
  `apmc_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `date` date NOT NULL,
  `crop_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `variety` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `unit` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `arrival_quantity` int(11) DEFAULT NULL,
  `min_price` decimal(10,2) DEFAULT NULL,
  `max_price` decimal(10,2) DEFAULT NULL,
  `avg_price` decimal(10,2) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`apmc_name`,`date`,`crop_name`,`variety`),
  KEY `idx_apmc_name` (`apmc_name`),
  KEY `idx_crop_name` (`crop_name`),
  KEY `idx_date` (`date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8
/*!50100 PARTITION BY RANGE (year(`date`))
(PARTITION p2025 VALUES LESS THAN (2026) ENGINE = InnoDB,
 PARTITION p2026 VALUES LESS THAN (2027) ENGINE = InnoDB,
 PARTITION p2027 VALUES LESS THAN (2028) ENGINE = InnoDB,
 PARTITION p_future VALUES LESS THAN MAXVALUE ENGINE = InnoDB) */;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `apmc_crop_prices`
--

LOCK TABLES `apmc_crop_prices` WRITE;
/*!40000 ALTER TABLE `apmc_crop_prices` DISABLE KEYS */;
/*!40000 ALTER TABLE `apmc_crop_prices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `blog_posts`
--

DROP TABLE IF EXISTS `blog_posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `blog_posts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `category` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `sub_category` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `content` text NOT NULL,
  `slug` varchar(255) NOT NULL,
  `seo_title` varchar(255) DEFAULT NULL,
  `seo_description` text,
  `keywords` varchar(500) DEFAULT NULL,
  `featured_image` varchar(500) DEFAULT NULL,
  `author` varchar(100) NOT NULL,
  `published_date` date DEFAULT NULL,
  `updated_date` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `canonical_url` varchar(500) DEFAULT NULL,
  `og_title` varchar(255) DEFAULT NULL,
  `og_description` text,
  `og_url` varchar(500) DEFAULT NULL,
  `twitter_title` varchar(255) DEFAULT NULL,
  `twitter_description` text,
  `tags` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `is_enable` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blog_posts`
--

LOCK TABLES `blog_posts` WRITE;
/*!40000 ALTER TABLE `blog_posts` DISABLE KEYS */;
INSERT INTO `blog_posts` VALUES (32,'2025 मध्ये शेतकऱ्यांसाठी टॉप 5 दुष्काळ प्रतिरोधक पिके','[{\"category_name\":\"पिकांची माहिती\",\"category_color_class\":\"#417505\",\"slug\":\"crop-information\"},{\"category_name\":\"नवीन माहिती\",\"category_color_class\":\"#417505\",\"slug\":\"new-information\"}]','[]','<p>शेती हा भारताचा आत्मा आहे, आणि शेतकऱ्यांचे जीवन पिकांवर अवलंबून आहे. पण बदलत्या हवामानामुळे आणि कमी पावसामुळे शेती करणे कठीण झाले आहे. दुष्काळाच्या परिस्थितीतही चांगले उत्पन्न देणारी पिके निवडणे हे शेतकऱ्यांसाठी एक स्मार्ट पर्याय आहे. या ब्लॉगमध्ये आम्ही 2025 मध्ये भारतीय शेतकऱ्यांसाठी टॉप 5 दुष्काळ प्रतिरोधक पिकांबद्दल सांगणार आहोत, ज्यामुळे तुम्हाला कमी पाण्यातही चांगली कमाई करता येईल.</p><p><br></p><h2>1. बाजरी (Pearl Millet)</h2><p>बाजरी हे भारतातील सर्वात लोकप्रिय दुष्काळ प्रतिरोधक पीक आहे. कमी पाणी आणि खराब मातीमध्येही हे पीक चांगले वाढते. बाजरीला फक्त 200–300 मिमी पाऊस पुरेसा असतो, आणि त्याची लागवड खरीप हंगामात केली जाते. बाजरीमध्ये प्रोटीन, फायबर आणि लोह भरपूर असते, त्यामुळे बाजारात त्याला मागणीही खूप आहे.</p><ul><li><strong>लागवड टिप्स:</strong> माती चांगली निचरा करणारी असावी आणि बियाणे 2–3 सेंमी खोलीवर पेरावे.</li><li><strong>फायदे:</strong> कमी खर्चात जास्त उत्पन्न, आणि पशुंसाठीही चारा म्हणून वापरता येते.</li></ul><p><br></p><h2>2. ज्वारी (Sorghum)</h2><p>ज्वारी हे आणखी एक उत्तम पीक आहे जे दुष्काळातही टिकते. हे पीक कमी पाण्यात वाढते आणि उष्ण हवामानातही चांगले उत्पन्न देते. भारतात ज्वारीचा वापर अन्न, चारा आणि औद्योगिक उत्पादनांसाठी होतो.</p><ul><li><strong>माती आणि हवामान:</strong> चिकणमाती किंवा वालुकामय माती योग्य. 25–35 अंश सेल्सिअस तापमान चांगले.</li><li><strong>फायदे:</strong> बाजारात मागणी स्थिर आणि खर्च कमी.</li></ul><h4><br></h4><h2>3. नाचणी (Finger Millet)</h2><p>नाचणी हे पोषक तत्वांनी भरलेले पीक आहे. याला कमी पाणी लागते आणि दुष्काळग्रस्त भागातही चांगले वाढते. नाचणीमध्ये कॅल्शियम आणि फायबर जास्त असते, ज्यामुळे आरोग्यासाठीही फायदेशीर आहे.</p><ul><li><strong>लागवड टिप्स:</strong> जून-जुलैमध्ये पेरणी करा, आणि खताचा वापर मर्यादित ठेवा.</li><li><strong>फायदे:</strong> छोट्या शेतकऱ्यांसाठी कमी गुंतवणुकीत जास्त नफा.</li></ul><h4><br></h4><h2>4. गवार (Cluster Bean)</h2><p>गवार हे एक औद्योगिक पीक आहे ज्याला दुष्काळातही चांगले उत्पन्न मिळते. याचा वापर गम (Guar Gum) बनवण्यासाठी होतो, ज्याला आंतरराष्ट्रीय बाजारात मागणी आहे. कमी पाणी आणि उष्ण हवामानातही हे पीक चांगले वाढते.</p><ul><li><strong>लागवड टिप्स:</strong> हलकी माती आणि 2–3 पाणी देणे पुरेसे.</li><li><strong>फायदे:</strong> निर्यातीमुळे जास्त किंमत मिळते.</li></ul><h4><br></h4><h2>5. मटकी (Moth Bean)</h2><p>मटकी हे कमी पाण्यात वाढणारे पीक आहे जे दुष्काळग्रस्त भागातील शेतकऱ्यांसाठी वरदान आहे. हे पीक 60–70 दिवसांत तयार होते आणि त्याला जास्त काळजीची गरज नसते.</p><ul><li><strong>लागवड टिप्स:</strong> खरीप हंगामात पेरणी करा आणि माती सेंद्रिय खताने समृद्ध करा.</li><li><strong>फायदे:</strong> कमी कालावधीत उत्पन्न आणि बाजारात मागणी.</li></ul><h4><br></h4><h4>निष्कर्ष</h4><p>दुष्काळ ही शेतकऱ्यांसाठी मोठी समस्या आहे, पण योग्य पिकांची निवड करून तुम्ही तुमचे उत्पन्न सुरक्षित करू शकता. बाजरी, ज्वारी, नाचणी, गवार आणि मटकी ही पिके कमी पाण्यातही चांगले परिणाम देतात आणि बाजारात त्यांना मागणीही आहे. 2025 मध्ये या पिकांचा विचार करून तुमच्या शेतीला नवीन दिशा द्या.</p>','top-5-drought-resistant-crops-for-indian-farmers-in-2025','2025 मध्ये शेतकऱ्यांसाठी टॉप 5 दुष्काळ प्रतिरोधक पिके','शेती हा भारताचा आत्मा आहे, आणि शेतकऱ्यांचे जीवन पिकांवर अवलंबून आहे. पण बदलत्या हवामानामुळे आणि कमी पावसामुळे शेती करणे कठीण झाले आहे. दुष्काळाच्या परिस्थितीतही चांगले उत्पन्न देणारी पिके निवडणे हे शेतकऱ्यांसाठी एक स्मार्ट पर्याय आहे.','दुष्काळ प्रतिरोधक पिके, दुष्काळ, पिके, jiokheti','/images/blog-thumbnail/featured_blog_img_05-04-25-08-17-42_4katht54.jpeg.jpeg','Jio Kheti','2025-03-23','2025-04-05 08:17:44','https://www.jiokheti.com/blog/top-5-drought-resistant-crops-for-indian-farmers-in-2025','2025 मध्ये शेतकऱ्यांसाठी टॉप 5 दुष्काळ प्रतिरोधक पिके','शेती हा भारताचा आत्मा आहे, आणि शेतकऱ्यांचे जीवन पिकांवर अवलंबून आहे. पण बदलत्या हवामानामुळे आणि कमी पावसामुळे शेती करणे कठीण झाले आहे. दुष्काळाच्या परिस्थितीतही चांगले उत्पन्न देणारी पिके निवडणे हे शेतकऱ्यांसाठी एक स्मार्ट पर्याय आहे.','https://www.jiokheti.com/blog/top-5-drought-resistant-crops-for-indian-farmers-in-2025','2025 मध्ये शेतकऱ्यांसाठी टॉप 5 दुष्काळ प्रतिरोधक पिके','शेती हा भारताचा आत्मा आहे, आणि शेतकऱ्यांचे जीवन पिकांवर अवलंबून आहे. पण बदलत्या हवामानामुळे आणि कमी पावसामुळे शेती करणे कठीण झाले आहे. दुष्काळाच्या परिस्थितीतही चांगले उत्पन्न देणारी पिके निवडणे हे शेतकऱ्यांसाठी एक स्मार्ट पर्याय आहे.','[{\"tag_name\":\"दुष्काळ\",\"slug\":\"dusskaal\",\"tag_color\":\"#233223\"},{\"tag_name\":\"दुष्काळ प्रतिरोधक पिके\",\"slug\":\"dusskaal-prtirodhk-pike\",\"tag_color\":\"#233223\"},{\"tag_name\":\"पिके\",\"slug\":\"pike\",\"tag_color\":\"#233223\"}]',1),(33,'पशु संवर्धन: पशुपालनातून अधिक नफा कसा मिळवावा?','[{\"category_name\":\"पशु संवर्धन\",\"category_color_class\":\"#417505\",\"slug\":\"animal-husbandry\"},{\"category_name\":\"नवीन माहिती\",\"category_color_class\":\"#417505\",\"slug\":\"new-information\"}]','[]','<p>पशु संवर्धन हा शेतीचा एक महत्त्वाचा भाग आहे. गायी, म्हशी, शेळ्या आणि कोंबड्यांसारख्या पशुधनामुळे शेतकऱ्यांना दूध, मांस, अंडी आणि शेणखत मिळते, ज्यामुळे त्यांचे उत्पन्न वाढते. परंतु, पशुपालनातून अधिक नफा मिळवण्यासाठी योग्य नियोजन आणि काळजी घ्यावी लागते. या ब्लॉगमध्ये, आम्ही तुम्हाला पशु संवर्धनातील काही प्रभावी टिप्स सांगणार आहोत, ज्यामुळे तुम्ही तुमच्या पशुधनाची उत्पादकता वाढवू शकता.</p><p><br></p><h2>1. पशुंसाठी पौष्टिक आहार</h2><p>पशुंच्या आरोग्यासाठी आणि उत्पादनासाठी त्यांचा आहार खूप महत्त्वाचा आहे. गायी आणि म्हशींना हिरवा चारा (जसे की मका, ज्वारी), कोरडा चारा (भुस्सा), आणि खुराक (धान्य, पेंड) यांचे संतुलित मिश्रण द्यावे.</p><p><br></p><ul><li><strong>टिप:</strong> पशुंना दररोज 20-30 लिटर स्वच्छ पाणी द्या. पाण्याची कमतरता दुधाच्या उत्पादनावर परिणाम करते.</li><li>शेळ्यांसाठी झाडांची पाने आणि कोंबड्यांसाठी प्रथिनयुक्त खाद्य (जसे की मका आणि सोयाबीन) देणे फायदेशीर ठरते.</li></ul><p><br></p><h2>2. नियमित आरोग्य तपासणी</h2><p>पशुंचे नियमित लसीकरण आणि आरोग्य तपासणी केल्याने रोगांचा धोका कमी होतो. खुरकूत, तोंडपका आणि इतर रोगांपासून संरक्षणासाठी पशुवैद्यकाकडून लस देणे आवश्यक आहे.</p><p><br></p><ul><li><strong>सल्ला:</strong> पशुंना कीटक आणि जंतांपासून वाचवण्यासाठी गोठ्याची स्वच्छता ठेवा आणि कीटकनाशकांचा वापर करा.</li></ul><h3><br></h3><h3><a href=\"https://www.jiokheti.com/bajarbhav\" rel=\"noopener noreferrer\" target=\"_blank\"><strong>आजचे ताजे बाजारभाव बघण्यासाठी इथे क्लिक करा. </strong></a></h3><p><br></p><h2>3. योग्य निवारा व्यवस्था</h2><p>पशुंसाठी स्वच्छ, हवेशीर आणि सुरक्षित गोठा असावा. पावसाळ्यात ओलावा टाळण्यासाठी गोठ्याला छत आणि योग्य निचरा व्यवस्था असावी. थंडीत पशुंना थंडीपासून वाचवण्यासाठी गोणपाटाचा वापर करा.</p><p><br></p><ul><li><strong>फायदा:</strong> चांगला निवारा पशुंचे आरोग्य सुधारतो आणि उत्पादनात वाढ होते.</li></ul><p><br></p><h2>4. दूध आणि मांस उत्पादन वाढवा</h2><p><br></p><ul><li><strong>दूध:</strong> गायी आणि म्हशींच्या दुधाचे प्रमाण वाढवण्यासाठी त्यांना कॅल्शियम आणि खनिजांचे पूरक आहार द्या. दुधाळ जनावरांना दिवसातून दोनदा दूध काढा.</li><li><strong>मांस:</strong> शेळ्या आणि कोंबड्यांचे वजन वाढवण्यासाठी त्यांना नियमित खाद्य आणि व्यायामाची संधी द्या.</li></ul><p><br></p><h2>5. बाजाराची माहिती ठेवा</h2><p>पशु संवर्धनातून नफा मिळवण्यासाठी बाजारभावाची माहिती असणे गरजेचे आहे. दूध, अंडी आणि मांसाचे दर कधी वाढतात आणि कधी कमी होतात, याचा अंदाज ठेवा. Jio Kheti वर तुम्हाला दररोजचे बाजारभाव मिळतील, ज्यामुळे तुम्हाला योग्य वेळी विक्री करता येईल.</p><p><br></p><h2>निष्कर्ष</h2><p>पशु संवर्धन हे शेतकऱ्यांसाठी उत्पन्नाचे एक उत्तम साधन आहे. योग्य आहार, आरोग्याची काळजी, चांगला निवारा आणि बाजाराची माहिती यामुळे तुम्ही तुमच्या पशुधनातून अधिक नफा मिळवू शकता. Jio Kheti तुम्हाला पशुपालनातील नवीन माहिती आणि टिप्स देत राहील, ज्यामुळे तुमचे शेती आणि पशु संवर्धन अधिक यशस्वी होईल.</p>','how-to-get-more-profit-from-animal-husbandry','पशु संवर्धन: पशुपालनातून अधिक नफा कसा मिळवावा?','पशु संवर्धन हा शेतीचा एक महत्त्वाचा भाग आहे. गायी, म्हशी, शेळ्या आणि कोंबड्यांसारख्या पशुधनामुळे शेतकऱ्यांना दूध, मांस, अंडी आणि शेणखत मिळते','पशु संवर्धन, पशुपालन, बाजारभाव, Jio Kheti, शेती, farmer tips','/images/blog-thumbnail/featured_blog_img_05-04-25-08-17-29_27t64g08.jpeg.jpeg','Jio Kheti Team','2025-03-26','2025-04-05 08:17:31','https://www.jiokheti.com/blog/how-to-get-more-profit-from-animal-husbandry','पशु संवर्धन: पशुपालनातून अधिक नफा कसा मिळवावा?','पशु संवर्धन हा शेतीचा एक महत्त्वाचा भाग आहे. गायी, म्हशी, शेळ्या आणि कोंबड्यांसारख्या पशुधनामुळे शेतकऱ्यांना दूध, मांस, अंडी आणि शेणखत मिळते','https://www.jiokheti.com/blog/how-to-get-more-profit-from-animal-husbandry','पशु संवर्धन: पशुपालनातून अधिक नफा कसा मिळवावा?','पशु संवर्धन हा शेतीचा एक महत्त्वाचा भाग आहे. गायी, म्हशी, शेळ्या आणि कोंबड्यांसारख्या पशुधनामुळे शेतकऱ्यांना दूध, मांस, अंडी आणि शेणखत मिळते','[{\"tag_name\":\"पशु संवर्धन\",\"slug\":\"pshu-snvrdhn\",\"tag_color\":\"#233223\"},{\"tag_name\":\"पशुपालन\",\"slug\":\"pshupaaln\",\"tag_color\":\"#233223\"},{\"tag_name\":\"Jio Kheti\",\"slug\":\"jio-kheti\",\"tag_color\":\"#233223\"}]',1),(34,'शेती अनुदान आणि किमान आधारभूत किंमत: शेतकऱ्यांसाठी सरकारचे पाठबळ','[{\"category_name\":\"कृषी योजना\",\"category_color_class\":\"#417505\",\"slug\":\"agricultural-schemes\"},{\"category_name\":\"नवीन माहिती\",\"category_color_class\":\"#417505\",\"slug\":\"new-information\"}]','[]','<p>शेती हा भारताच्या अर्थव्यवस्थेचा पाया आहे, आणि शेतकऱ्यांचे जीवनमान उंचावण्यासाठी भारत सरकार विविध योजना आणि अनुदानांद्वारे प्रयत्न करत आहे. यापैकी \"शेती अनुदान\" आणि \"किमान आधारभूत किंमत (MSP)\" या दोन महत्त्वाच्या बाबी शेतकऱ्यांना आर्थिक स्थैर्य देण्यासाठी महत्त्वाच्या आहेत. या ब्लॉगमध्ये, Jio Kheti तुम्हाला या योजनांचे फायदे, तोटे आणि शेतकऱ्यांवर होणारा परिणाम सोप्या भाषेत समजावून सांगेल.</p><p><br></p><h2>शेती अनुदान म्हणजे काय?</h2><p><br></p><p>शेती अनुदान म्हणजे सरकार शेतकऱ्यांना त्यांचे उत्पन्न वाढवण्यासाठी आणि उत्पादन खर्च कमी करण्यासाठी देते. यामध्ये खत, बियाणे, पाणी व्यवस्थापन किंवा पीक विमा यासारख्या गोष्टींसाठी आर्थिक मदत मिळते. उदाहरणार्थ, 2017-18 मध्ये सरकारने कृषी क्षेत्रासाठी सुमारे 0.4% जास्त बजेट वाढवले, पण एकूण GDP च्या तुलनेत हे प्रमाण 2.5% वरून 2% पर्यंत कमी झाले. तरीही, हे अनुदान शेतकऱ्यांना कमी खर्चात शेती करण्यास आणि अधिक नफा मिळवण्यास मदत करते.</p><p><br></p><h2>किमान आधारभूत किंमत (MSP) म्हणजे काय?</h2><p><br></p><p>किमान आधारभूत किंमत (MSP) ही सरकारने ठरवलेली अशी किंमत आहे, ज्यावर शेतकऱ्यांचे पीक खरेदी करण्याचे आश्वासन दिले जाते. दरवर्षी खरीप आणि रब्बी हंगामासाठी ही किंमत जाहीर केली जाते. भात, गहू, मका, ऊस, ज्वारी, बाजरी आणि सोयाबीन यासारख्या निवडक पिकांना MSP चा लाभ मिळतो. 2018-19 मध्ये सरकारने भात आणि मक्यासाठी प्रति क्विंटल 200 रुपयांची वाढ जाहीर केली होती, ज्यामुळे शेतकऱ्यांना आधार मिळाला.</p><p><br></p><h2>MSP चे फायदे</h2><p><br></p><ol><li><strong>आर्थिक सुरक्षा</strong>: बाजारात किंमती घसरल्या तरी शेतकऱ्यांना MSP मुळे निश्चित उत्पन्न मिळते.</li><li><strong>उत्पादन नियंत्रण</strong>: MSP मुळे अतिरिक्त उत्पादन टाळले जाते, ज्यामुळे शेती अर्थव्यवस्थेचे नुकसान होत नाही.</li><li><strong>महागाई नियंत्रण</strong>: जीवनावश्यक वस्तूंच्या किंमती स्थिर ठेवण्यास मदत होते, जरी आंतरराष्ट्रीय बाजारात चढ-उतार असले तरी.</li><li><strong>प्रोत्साहन</strong>: शेतकऱ्यांना शेतीत गुंतवणूक करण्यासाठी आणि पिकांचे उत्पादन वाढवण्यासाठी प्रेरणा मिळते.</li></ol><p><br></p><h2>शेती अनुदानाचे फायदे</h2><p><br></p><ul><li><strong>खर्चात बचत</strong>: अनुदानामुळे शेतकरी कमी खर्चात चांगले उत्पादन घेऊ शकतात.</li><li><strong>उत्पादन वाढ</strong>: खत आणि बियाण्यांवरील अनुदान शेतीचा विस्तार करण्यास मदत करते.</li><li><strong>आर्थिक आधार</strong>: विशेषतः लहान शेतकऱ्यांना हे अनुदान संकटकाळात पाठबळ देते.</li></ul><p><br></p><h2>शेती अनुदान आणि MSP चे तोटे</h2><p><br></p><ul><li><strong>किमतींची अस्थिरता</strong>: काही वेळा MSP खूप जास्त ठरवली जाते, ज्यामुळे बाजारात किंमती निश्चित करणे अवघड होते.</li><li><strong>संसाधनांचा अपव्यय</strong>: चुकीच्या धोरणांमुळे संसाधनांचा गैरफायदा होतो, जसे की 2017-18 मध्ये 7,714 कोटींची वित्तीय तूट दिसून आली.</li><li><strong>कमी निधी</strong>: 2017-18 मध्ये कृषी क्षेत्राला फक्त 2.4% बजेट मिळाले, जे मागील वर्षांपेक्षा कमी आहे.</li><li><strong>मर्यादित लाभ</strong>: सर्व पिकांना MSP मिळत नाही, ज्यामुळे काही शेतकरी वंचित राहतात.</li></ul><p><br></p><h2>शेळीपालनासाठी अनुदान</h2><p><br></p><p>शेळीपालन करणाऱ्या शेतकऱ्यांना सरकार व्याजमुक्त कर्ज आणि थेट आर्थिक मदत देते. ही रक्कम बँक किंवा पोस्ट ऑफिस खात्यात जमा केली जाते. 2017-18 मध्ये शेळीपालनासाठी विशेष अनुदान योजना सुरू झाल्या, ज्यामुळे ग्रामीण शेतकऱ्यांचे उत्पन्न वाढले.</p><p><br></p><h3><a href=\"https://www.jiokheti.com/bajarbhav\" rel=\"noopener noreferrer\" target=\"_blank\"><strong>आजचे ताजे बाजारभाव बघण्यासाठी इथे क्लिक करा.</strong></a></h3><p><br></p><p><br></p><h2>सरकारचे प्रयत्न</h2><p><br></p><p>शेतकऱ्यांना MSP मिळावी यासाठी सरकारने गोदामे आणि खरेदी केंद्रे उभारली आहेत, जिथे शेतकरी त्यांचे पीक साठवू शकतात. तसेच, खत आणि पीक विमा योजनांद्वारे अतिरिक्त अनुदान दिले जाते. पण, कृषी क्षेत्रातून मिळणारे उत्पन्न सरकारच्या खर्चाच्या तुलनेत खूपच कमी आहे (फक्त 0.5% सार्वजनिक कल्याण खर्च).</p><p><br></p><h2>निष्कर्ष</h2><p>शेती अनुदान आणि किमान आधारभूत किंमत शेतकऱ्यांना आर्थिक स्थैर्य आणि शेतीत प्रगती करण्यासाठी प्रेरणा देतात. पण, या योजनांचा पूर्ण फायदा मिळवण्यासाठी सरकारला अधिक प्रभावी धोरणे आणि निधी वाढवण्याची गरज आहे. Jio Kheti तुम्हाला या योजनांबद्दल नवीनतम माहिती आणि शेती टिप्स देत राहील. तुमच्या शेतीला यशस्वी करण्यासाठी आमच्यासोबत जोडलेले रहा!</p><p><br></p><p><strong>अधिक माहितीसाठी:</strong> Jio Kheti च्या कृषी योजना विभागाला भेट द्या आणि नवीन अपडेट्स जाणून घ्या!</p>','sheti-anudan-ani-kiman-adharbhut-kimat-28-march-2025','शेती अनुदान आणि किमान आधारभूत किंमत: शेतकऱ्यांसाठी सरकारचे पाठबळ','शेती हा भारताच्या अर्थव्यवस्थेचा पाया आहे, आणि शेतकऱ्यांचे जीवनमान उंचावण्यासाठी भारत सरकार विविध योजना आणि अनुदानांद्वारे प्रयत्न करत आहे. ','शेती अनुदान, किमान आधारभूत किंमत, MSP, Jio Kheti, शेतकरी.','/images/blog-thumbnail/featured_blog_img_05-04-25-08-17-13_fa2cehln.jpeg.jpeg','Jio Kheti Team','2025-03-28','2025-04-05 08:17:19','https://www.jiokheti.com/blog/sheti-anudan-ani-kiman-adharbhut-kimat-28-march-2025','शेती अनुदान आणि किमान आधारभूत किंमत: शेतकऱ्यांसाठी सरकारचे पाठबळ','शेती हा भारताच्या अर्थव्यवस्थेचा पाया आहे, आणि शेतकऱ्यांचे जीवनमान उंचावण्यासाठी भारत सरकार विविध योजना आणि अनुदानांद्वारे प्रयत्न करत आहे. ','https://www.jiokheti.com/blog/sheti-anudan-ani-kiman-adharbhut-kimat-28-march-2025','शेती अनुदान आणि किमान आधारभूत किंमत: शेतकऱ्यांसाठी सरकारचे पाठबळ','शेती हा भारताच्या अर्थव्यवस्थेचा पाया आहे, आणि शेतकऱ्यांचे जीवनमान उंचावण्यासाठी भारत सरकार विविध योजना आणि अनुदानांद्वारे प्रयत्न करत आहे. ','[{\"tag_name\":\"अनुदान\",\"slug\":\"anudaan\",\"tag_color\":\"#233223\"},{\"tag_name\":\"शेती अनुदान\",\"slug\":\"shetii-anudaan\",\"tag_color\":\"#233223\"},{\"tag_name\":\"शेती\",\"slug\":\"shetii\",\"tag_color\":\"#233223\"}]',1);
/*!40000 ALTER TABLE `blog_posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `categories` (
  `category_id` int(11) NOT NULL AUTO_INCREMENT,
  `category_name` varchar(255) NOT NULL,
  `category_color_class` varchar(255) NOT NULL,
  `slug` varchar(45) DEFAULT NULL,
  `seo_title` varchar(255) DEFAULT NULL,
  `seo_description` text,
  `keywords` varchar(255) DEFAULT NULL,
  `og_url` varchar(255) DEFAULT NULL,
  `canonical_url` varchar(255) DEFAULT NULL,
  `featured_image` varchar(255) DEFAULT NULL,
  `author` varchar(100) DEFAULT NULL,
  `published_date` date DEFAULT NULL,
  `updated_date` date DEFAULT NULL,
  `description` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (4,'पिकांची माहिती','#417505','crop-information','पिकांची माहिती | Jio Kheti','पिकांबद्दल संपूर्ण माहिती येथे मिळवा! Jio Kheti वर पिकांचे प्रकार, बाजारभाव आणि शेतीविषयक टिप्स पहा।','पिकांची माहिती, pikanchi mahiti, बाजारभाव, शेती माहिती, Jio Kheti','https://www.jiokheti.com/blogs/crop-information','https://www.jiokheti.com/blogs/crop-information','/images/blog-thumbnail/crop.jpg','Jio Kheti','2025-02-28','2025-02-28','पिकांबद्दल संपूर्ण माहिती येथे मिळवा'),(5,'कृषी योजना','#417505','agricultural-schemes','कृषी योजना | Jio Kheti','कृषी योजनांबद्दल संपूर्ण माहिती येथे मिळवा! Jio Kheti वर नवीनतम शासकीय योजना, अनुदान आणि लाभ जाणून घ्या।','कृषी योजना, शासकीय योजना, krushi yojana, Jio Kheti, शेती योजना','https://www.jiokheti.com/blogs/agricultural-schemes','https://www.jiokheti.com/blogs/agricultural-schemes','/images/blog-thumbnail/scheme.jpg','Jio Kheti','2025-02-28','2025-02-28','कृषी योजनांबद्दल संपूर्ण माहिती येथे मिळवा'),(6,'पशु संवर्धन','#417505','animal-husbandry','पशु संवर्धन | Jio Kheti','पशु संवर्धनाबद्दल ताजी माहिती येथे पहा! Jio Kheti वर पशुपालन, आरोग्य आणि योजना याबद्दल जाणून घ्या।','पशु संवर्धन, पशुपालन, pashu sanvardhan, Jio Kheti, पशुधन','https://www.jiokheti.com/blogs/animal-husbandry','https://www.jiokheti.com/blogs/animal-husbandry','/images/blog-thumbnail/animal.jpg','Jio Kheti','2025-02-27','2025-02-27','पशु संवर्धनाबद्दल ताजी माहिती येथे पहा'),(7,' हवामान अंदाज','#417505','weather-forecast','हवामान अंदाज | Jio Kheti','हवामान अंदाजाची नवीनतम माहिती येथे मिळवा! Jio Kheti वर शेतीसाठी अचूक हवामान अपडेट्स पहा।','हवामान अंदाज, हवामान अपडेट, havaman andaz, Jio Kheti, शेती हवामान','https://www.jiokheti.com/blogs/weather-forecast','https://www.jiokheti.com/blogs/weather-forecast','/images/blog-thumbnail/weather.jpg','Jio Kheti','2025-03-02','2025-03-02','हवामान अंदाजाची नवीनतम माहिती येथे मिळवा'),(8,'इतर माहिती','#417505','other-information','इतर माहिती | Jio Kheti','शेतीशी संबंधित इतर माहिती येथे पहा! Jio Kheti वर विविध विषयांवरील उपयुक्त माहिती जाणून घ्या।','इतर माहिती, शेती माहिती, itar mahiti, Jio Kheti, शेती टिप्स','https://www.jiokheti.com/blogs/other-information','https://www.jiokheti.com/blogs/other-information','/images/blog-thumbnail/other.jpg','Jio Kheti','2025-02-28','2025-02-28','शेतीशी संबंधित इतर माहिती येथे पहा'),(9,'नवीन माहिती','#417505','new-information','नवीन माहिती | Jio Kheti','शेतीविषयी नवीन माहिती येथे मिळवा! Jio Kheti वर ताजी बातम्या आणि अपडेट्स जाणून घ्या।','नवीन माहिती, शेती बातम्या, navin mahiti, Jio Kheti, शेती अपडेट्स','https://www.jiokheti.com/blogs/new-information','https://www.jiokheti.com/blogs/new-information','/images/blog-thumbnail/newinfo.jpg','Jio Kheti','2025-03-02','2025-03-02','शेतीविषयी नवीन माहिती येथे मिळवा'),(10,'बाजारभाव','#417505','bajarbhav','बाजारभाव | Jio Kheti','पिकांचे ताजे बाजारभाव येथे पहा! Jio Kheti वर नवीनतम बाजार दर आणि माहिती मिळवा।','बाजारभाव, पिकांचे दर, Jio Kheti, शेती बाजार, बाजारभाव, bajarbhav, Market prices for agriculture','https://www.jiokheti.com/blogs/bajarbhav','https://www.jiokheti.com/blogs/bajarbhav','/images/blog-thumbnail/Bajarbhav.jpg','Jio Kheti','2025-03-02','2025-03-02','पिकांचे ताजे बाजारभाव येथे पहा');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `crop_commodity_data`
--

DROP TABLE IF EXISTS `crop_commodity_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `crop_commodity_data` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT 'Unique identifier for each record',
  `commodity_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Name of the commodity (e.g., अंजीर)',
  `market_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Name of the APMC market (e.g., पुणे)',
  `data_date` date NOT NULL COMMENT 'Date of the data (YYYY-MM-DD)',
  `variety` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Variety of the commodity (e.g., लोकल, NULL if not specified)',
  `unit` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Unit of measurement (e.g., क्विंटल)',
  `arrival_quantity` decimal(10,2) NOT NULL COMMENT 'Quantity arrived at the market',
  `min_price` decimal(10,2) NOT NULL COMMENT 'Minimum price per unit (in INR)',
  `max_price` decimal(10,2) NOT NULL COMMENT 'Maximum price per unit (in INR)',
  `avg_price` decimal(10,2) NOT NULL COMMENT 'Average price per unit (in INR)',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Record creation timestamp',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_commodity_market_date_variety` (`commodity_name`,`market_name`,`data_date`,`variety`) COMMENT 'Ensure no duplicate records for the same commodity, market, date, and variety',
  KEY `idx_commodity_date` (`commodity_name`,`data_date`) COMMENT 'Index for querying by commodity and date',
  KEY `idx_market` (`market_name`) COMMENT 'Index for querying by market'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Stores crop-specific commodity price and arrival data across markets';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `crop_commodity_data`
--

LOCK TABLES `crop_commodity_data` WRITE;
/*!40000 ALTER TABLE `crop_commodity_data` DISABLE KEYS */;
/*!40000 ALTER TABLE `crop_commodity_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `district_commodity_data`
--

DROP TABLE IF EXISTS `district_commodity_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `district_commodity_data` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT 'Unique identifier for each record',
  `district_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Name of the district (e.g., अमरावती)',
  `data_date` date NOT NULL COMMENT 'Date of the data (YYYY-MM-DD)',
  `commodity_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Name of the commodity (e.g., आंबा)',
  `variety` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Variety of the commodity (e.g., लोकल, NULL if not specified)',
  `unit` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Unit of measurement (e.g., क्विंटल, नग)',
  `arrival_quantity` decimal(10,2) NOT NULL COMMENT 'Quantity arrived for the commodity',
  `min_price` decimal(10,2) NOT NULL COMMENT 'Minimum price per unit (in INR)',
  `max_price` decimal(10,2) NOT NULL COMMENT 'Maximum price per unit (in INR)',
  `avg_price` decimal(10,2) NOT NULL COMMENT 'Average price per unit (in INR)',
  `total_arrival_quantity` decimal(10,2) DEFAULT NULL COMMENT 'Total arrival quantity for the district on the date',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Record creation timestamp',
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_district_date_commodity_variety` (`district_name`,`data_date`,`commodity_name`,`variety`) COMMENT 'Ensure no duplicate records for the same district, date, commodity, and variety',
  KEY `idx_district_date` (`district_name`,`data_date`) COMMENT 'Index for querying by district and date',
  KEY `idx_commodity` (`commodity_name`) COMMENT 'Index for querying by commodity'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Stores district-level commodity price and arrival data';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `district_commodity_data`
--

LOCK TABLES `district_commodity_data` WRITE;
/*!40000 ALTER TABLE `district_commodity_data` DISABLE KEYS */;
/*!40000 ALTER TABLE `district_commodity_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `notifications` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `badge` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'https://jiokheti.com/favicon.ico',
  `vibrate` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `requireInteraction` tinyint(1) DEFAULT '1',
  `tag` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'general',
  `renotify` tinyint(1) DEFAULT '0',
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT '',
  `url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'https://jiokheti.com',
  `icon` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'https://jiokheti.com/favicon.ico',
  `TotalSubscriptions` int(11) DEFAULT '0',
  `TotalSent` int(11) DEFAULT '0',
  `TotalFailed` int(11) DEFAULT '0',
  `TotalPending` int(11) DEFAULT '0',
  `TotalSuccess` int(11) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=103 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
INSERT INTO `notifications` VALUES (55,'आजचे बाजारभाव | Jio Kheti Market Prices','आजचे बाजारभाव | Jio Kheti Market Prices','/badge.png','[200,100,200]',1,'general',0,'https://jiokheti.com/images/notification-image/Bajarbhav.jpeg','https://www.jiokheti.com/bajarbhav','/JK.png',10,5,5,0,5,'2025-04-07 02:54:34'),(56,'आजचे बाजारभाव | Jio Kheti Market Prices','आजचे बाजारभाव | Jio Kheti Market Prices','/badge.png','[200,100,200]',1,'general',0,'https://jiokheti.com/images/notification-image/crop.jpeg','https://jiokheti.com','/JK.png',10,4,6,0,4,'2025-04-07 03:33:53'),(57,'आजचे बाजारभाव | Jio Kheti Market Prices','आजचे बाजारभाव | Jio Kheti Market Prices','/badge.png','[200,100,200]',1,'general',0,'https://jiokheti.com/images/notification-image/Bajarbhav.jpeg','https://www.jiokheti.com/bajarbhav','/JK.png',3,3,0,0,3,'2025-04-07 03:47:53'),(58,'test','test','/badge.png','[200,100,200]',1,'general',0,'https://jiokheti.com/images/notification-image/crop-info.jpeg','https://jiokheti.com','/JK.png',4,4,0,0,4,'2025-04-07 03:58:11'),(59,'bajarbhav','bajarbhav','/badge.png','[200,100,200]',1,'general',0,'https://jiokheti.com/images/notification-image/Bajarbhav.jpeg','https://jiokheti.com/bajarbhav','/JK.png',6,3,3,0,3,'2025-04-07 04:01:26'),(60,'test','test','/badge.png','[200,100,200]',1,'general',0,'','https://www.jiokheti.com/bajarbhav/crop/kothimbir-bajarbhav','/JK.png',6,3,3,0,3,'2025-04-07 04:04:17'),(61,'test','test','/badge.png','[200,100,200]',1,'general',0,'https://jiokheti.com/images/notification-image/crop-info.jpeg','https://www.jiokheti.com/bajarbhav/crop/kothimbir-bajarbhav','/JK.png',6,2,4,0,2,'2025-04-07 04:05:14'),(62,'new test','new test','/badge.png','[200,100,200]',1,'general',0,'https://jiokheti.com/images/notification-image/Bajarbhav.jpeg','https://www.jiokheti.com/blogs','/JK.png',2,2,0,0,2,'2025-04-07 04:09:14'),(63,'test','test','/badge.png','[200,100,200]',1,'general',0,'https://jiokheti.com/images/notification-image/Bajarbhav.jpeg','https://jiokheti.com','/JK.png',2,2,0,0,2,'2025-04-07 04:09:45'),(64,'update','update noti','/badge.png','[200,100,200]',1,'update',0,'','https://jiokheti.com','/JK.png',2,2,0,0,2,'2025-04-07 04:10:23'),(65,'general ','gen','/badge.png','[200,100,200]',1,'general',0,'','https://jiokheti.com','/JK.png',2,2,0,0,2,'2025-04-07 04:11:12'),(66,'update2','update2','/badge.png','[200,100,200]',1,'update',0,'','https://jiokheti.com','/JK.png',2,2,0,0,2,'2025-04-07 04:11:34'),(67,'alert ','alert','/badge.png','[200,100,200]',1,'alert',0,'','https://jiokheti.com','/JK.png',2,2,0,0,2,'2025-04-07 04:12:11'),(68,'aler 2','aler2','/badge.png','[200,100,200]',1,'general',0,'','https://jiokheti.com','/JK.png',2,2,0,0,2,'2025-04-07 04:12:26'),(69,'general','general','/badge.png','[200,100,200]',1,'general',0,'','https://jiokheti.com','/JK.png',2,2,0,0,2,'2025-04-07 04:15:25'),(70,'alert2 ','alert2','/badge.png','[200,100,200]',1,'alert',0,'','https://jiokheti.com','/JK.png',2,2,0,0,2,'2025-04-07 04:17:13'),(71,'general ','general','/badge.png','[200,100,200]',1,'general',0,'','https://jiokheti.com','/JK.png',2,2,0,0,2,'2025-04-07 04:17:33'),(72,'msg','msg','/badge.png','[200,100,200]',1,'message',0,'','https://jiokheti.com','/JK.png',2,2,0,0,2,'2025-04-07 04:17:51'),(73,'alert general','alert general','/badge.png','[200,100,200]',1,'alert',0,'','https://jiokheti.com','/JK.png',2,2,0,0,2,'2025-04-07 04:18:16'),(74,'alert','alert','/badge.png','[200,100,200]',1,'alert',0,'','https://jiokheti.com','/JK.png',2,2,0,0,2,'2025-04-07 04:19:09'),(75,'alert 2','alert 2','/badge.png','[200,100,200]',1,'general',0,'','https://jiokheti.com','/JK.png',2,2,0,0,2,'2025-04-07 04:19:28'),(76,'general','general','/badge.png','[200,100,200]',1,'general',0,'','https://jiokheti.com','/JK.png',2,2,0,0,2,'2025-04-07 04:24:37'),(77,'genral 2','genral2','/badge.png','[200,100,200]',1,'general',1,'','https://jiokheti.com','/JK.png',2,2,0,0,2,'2025-04-07 04:25:05'),(78,'alert','alert','/badge.png','[200,100,200]',1,'general',0,'','https://jiokheti.com','/JK.png',2,2,0,0,2,'2025-04-07 04:26:01'),(79,'genral','genarl','/badge.png','[200,100,200]',1,'general',1,'','https://jiokheti.com','/JK.png',3,3,0,0,3,'2025-04-07 04:27:00'),(80,'genral2','genral2','/badge.png','[200,100,200]',1,'alert',1,'','https://jiokheti.com','/JK.png',3,3,0,0,3,'2025-04-07 04:27:35'),(81,'new noti','new noti','/badge.png','[200,100,200]',1,'general',1,'','https://jiokheti.com','/JK.png',3,3,0,0,3,'2025-04-07 04:28:19'),(82,'alert','alert','/badge.png','[200,100,200]',1,'general',0,'','https://jiokheti.com','/alert.png',3,3,0,0,3,'2025-04-07 05:39:31'),(83,'test notification','test noti','/badge.png','[200,100,200]',1,'general',0,'','https://jiokheti.com','/JK.png',3,2,1,0,2,'2025-04-07 13:44:26'),(84,'test','test','/badge.png','[200,100,200]',1,'general',0,'','https://jiokheti.com','/JK.png',3,0,3,0,0,'2025-04-07 13:45:26'),(85,'test','test','/badge.png','[200,100,200]',1,'general',0,'','https://jiokheti.com','/JK.png',3,2,1,0,2,'2025-04-07 13:52:17'),(86,'test','test','/badge.png','[200,100,200]',1,'general',0,'','https://jiokheti.com','/JK.png',3,0,3,0,0,'2025-04-07 13:52:49'),(87,'test','test','/badge.png','[200,100,200]',1,'general',0,'','https://jiokheti.com','/JK.png',5,2,3,0,2,'2025-04-07 13:55:22'),(88,'test','test','/badge.png','[200,100,200]',1,'general',0,'','https://jiokheti.com','/JK.png',6,2,4,0,2,'2025-04-07 13:59:11'),(89,'bocha pranav','pranav pavan chavan','/badge.png','[200,100,200]',1,'general',0,'','https://jiokheti.com','/JK.png',8,4,4,0,4,'2025-04-07 15:31:26'),(90,'test','tges','/badge.png','[200,100,200]',1,'general',0,'','https://jiokheti.com','/JK.png',9,5,4,0,5,'2025-04-07 15:35:32'),(91,'test','test','/badge.png','[200,100,200]',1,'general',0,'','https://jiokheti.com','/JK.png',9,5,4,0,5,'2025-04-07 16:14:20'),(92,'test','test','/badge.png','[200,100,200]',1,'general',0,'','https://jiokheti.com','/JK.png',11,4,7,0,4,'2025-04-07 16:20:57'),(93,'main test','main test','/badge.png','[200,100,200]',1,'general',0,'https://jiokheti.com/images/notification-image/crop-info.jpeg','https://jiokheti.com','/JK.png',13,4,9,0,4,'2025-04-07 16:23:07'),(94,'test','test','/badge.png','[200,100,200]',1,'general',0,'','https://jiokheti.com','/JK.png',14,5,9,0,5,'2025-04-07 16:23:56'),(95,'Bajarbhav','Bajarbhav','/badge.png','[200,100,200]',1,'general',0,'https://jiokheti.com/images/notification-image/crop-info.jpeg','https://jiokheti.com/bajarbhav','/JK.png',14,4,10,0,4,'2025-04-07 16:24:59'),(96,'test','test','/badge.png','[200,100,200]',1,'general',0,'','https://jiokheti.com','/JK.png',15,5,10,0,5,'2025-04-07 16:31:18'),(97,'test','test','/badge.png','[200,100,200]',1,'general',0,'https://jiokheti.com/images/notification-image/Bajarbhav.jpeg','https://jiokheti.com/bajarbhav','/JK.png',15,5,10,0,5,'2025-04-07 16:35:24'),(98,'test','test','/badge.png','[200,100,200]',1,'general',0,'','https://jiokheti.com','/JK.png',18,6,12,0,6,'2025-04-08 12:18:12'),(99,'test','test','/badge.png','[200,100,200]',1,'general',0,'','https://jiokheti.com','/JK.png',18,6,12,0,6,'2025-04-08 13:29:12'),(100,'Proper Notification ','This is proper notification for bajarbhav','/badge.png','[200,100,200]',1,'general',0,'https://jiokheti.com/images/notification-image/Bajarbhav.jpeg','https://jiokheti.com/bajarbhav','/JK.png',6,5,1,0,5,'2025-04-08 13:41:21'),(101,'Test Subhash','Hello Subhash','/badge.png','[200,100,200]',1,'general',0,'https://jiokheti.com/images/notification-image/Bajarbhav.jpeg','https://jiokheti.com','/JK.png',5,5,0,0,5,'2025-04-13 14:12:25'),(102,'test subhash','subhash hello ','/badge.png','[200,100,200]',1,'general',0,'https://jiokheti.com/images/notification-image/Bajarbhav.jpeg','https://jiokheti.com','/JK.png',5,5,0,0,5,'2025-04-13 14:13:24');
/*!40000 ALTER TABLE `notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sub_categories`
--

DROP TABLE IF EXISTS `sub_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `sub_categories` (
  `sub_category_id` int(11) NOT NULL AUTO_INCREMENT,
  `sub_category_name` varchar(255) NOT NULL,
  `parent_category_name` varchar(255) DEFAULT NULL,
  `category_color` varchar(50) DEFAULT NULL,
  `category_img` varchar(255) DEFAULT NULL,
  `slug` varchar(45) DEFAULT NULL,
  `seo_title` varchar(255) DEFAULT NULL,
  `seo_description` text,
  `keywords` varchar(255) DEFAULT NULL,
  `og_url` varchar(255) DEFAULT NULL,
  `canonical_url` varchar(255) DEFAULT NULL,
  `featured_image` varchar(255) DEFAULT NULL,
  `author` varchar(100) DEFAULT NULL,
  `published_date` date DEFAULT NULL,
  `updated_date` date DEFAULT NULL,
  PRIMARY KEY (`sub_category_id`),
  UNIQUE KEY `sub_category_id_UNIQUE` (`sub_category_id`),
  UNIQUE KEY `slug_UNIQUE` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sub_categories`
--

LOCK TABLES `sub_categories` WRITE;
/*!40000 ALTER TABLE `sub_categories` DISABLE KEYS */;
INSERT INTO `sub_categories` VALUES (12,'भाजीपाला','पिकांची माहिती','#7ed321',NULL,'vegetables','भाजीपाला','vegetables inforamtion','भाजीपाला, vegetables','https://www.jiokheti.com/crop-information/vegetables','https://www.jiokheti.com/crop-information/vegetables','https://www.jiokheti.com/images/logo.png','Jio Kheti','2025-03-03','2025-03-03'),(13,'फळे','पिकांची माहिती','#7ed321',NULL,'fruits','फळे','fruits information','फळे, fruits, fruits information','https://www.jiokheti.com/crop-information/fruits','https://www.jiokheti.com/crop-information/fruits','https://www.jiokheti.com/images/logo.png','Jio Kheti','2025-03-04','2025-03-04'),(14,'फुले','पिकांची माहिती','#7ed321',NULL,'flowers','फुले','flowers information','फुले, flowers information, flowers','https://www.jiokheti.com/crop-information/flowers','https://www.jiokheti.com/crop-information/flowers','https://www.jiokheti.com/images/logo.png','Jio Kheti','2025-03-04','2025-03-04'),(15,'धान्य','पिकांची माहिती','#7ed321',NULL,'grains','धान्य','grains information','धान्य, grains, grains information','https://www.jiokheti.com/crop-information/grains','https://www.jiokheti.com/crop-information/grains','https://www.jiokheti.com/images/logo.png','Jio Kheti','2025-03-03','2025-03-03'),(16,'कडधान्य','पिकांची माहिती','#7ed321',NULL,'kad-dhanya','कडधान्य','kad-dhanya information','kad-dhanya, कडधान्य','https://www.jiokheti.com/crop-information/kad-dhanya','https://www.jiokheti.com/crop-information/kad-dhanya','https://www.jiokheti.com/images/logo.png','Jio Kheti','2025-03-04','2025-03-04'),(17,'नगदी पिके','पिकांची माहिती','#7ed321',NULL,'nagadi-pike','नगदी पिके','nagadi-pike information','nagadi-pike, नगदी पिके','https://www.jiokheti.com/crop-information/nagadi-pike','https://www.jiokheti.com/crop-information/nagadi-pike','https://www.jiokheti.com/images/logo.png','Jio Kheti','2025-03-04','2025-03-04'),(18,' डेअरी','पशु संवर्धन','#7ed321',NULL,'dairy','डेअरी','Dairy information','डेअरी, Dairy information','https://www.jiokheti.com/animal-husbandry/dairy','https://www.jiokheti.com/animal-husbandry/dairy','https://www.jiokheti.com/images/logo.png','Jio Kheti','2025-03-04','2025-03-04'),(19,' पशु खाद्य','पशु संवर्धन','#7ed321',NULL,'animal-feed',' पशु खाद्य','Animal feed information',' पशु खाद्य, animal-feed','https://www.jiokheti.com/animal-husbandry/animal-feed','https://www.jiokheti.com/animal-husbandry/animal-feed','https://www.jiokheti.com/images/logo.png','Jio Kheti','2025-03-03','2025-03-03'),(20,' शेळी व मेंढी पालन','पशु संवर्धन','#7ed321',NULL,'goat-sheep-husbandry',' शेळी व मेंढी पालन ','goat sheep husbandry information',' शेळी व मेंढी पालन, goat-sheep-husbandry','https://www.jiokheti.com/animal-husbandry/goat-sheep-husbandry','https://www.jiokheti.com/animal-husbandry/goat-sheep-husbandry','https://www.jiokheti.com/images/logo.png','Jio Kheti','2025-03-04','2025-03-04'),(21,' कुकूट पालन','पशु संवर्धन','#7ed321',NULL,'poultry',' कुकूट पालन','Poultry information',' कुकूट पालन, Poultry information, poultry','https://www.jiokheti.com/animal-husbandry/poultry','https://www.jiokheti.com/animal-husbandry/poultry','https://www.jiokheti.com/images/logo.png','Jio Kheti','2025-03-04','2025-03-04');
/*!40000 ALTER TABLE `sub_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subscriptions`
--

DROP TABLE IF EXISTS `subscriptions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `subscriptions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `endpoint` varchar(512) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `endpoint_key` text NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_endpoint` (`endpoint`),
  UNIQUE KEY `endpoint` (`endpoint`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subscriptions`
--

LOCK TABLES `subscriptions` WRITE;
/*!40000 ALTER TABLE `subscriptions` DISABLE KEYS */;
INSERT INTO `subscriptions` VALUES (30,'https://fcm.googleapis.com/fcm/send/fr_4iw6SOXw:APA91bE8zpRkUqimRY5wIwmPht1CS20PUrnIsJcDBR6BhN0B-_PmI78WozH7PfljRY9CdQ9J7vVkkgyQWinbNU47mKgeMH_dT3g1hr-V_FH8t6CXu9nDDA2QEC409SSRv7X05TlIBnn6',NULL,'2025-04-07 13:58:55','{\"p256dh\":\"BCCuhia8EJMgCIHmOnYj1ZYcTsNoqgdXajZVSYjRg6YWALTki9Agvo0p9vngnaeGunTj93XB8q589QCbQbkDkGQ\",\"auth\":\"Ppc-O6SUg7A-r7phvM-ayQ\"}'),(37,'https://fcm.googleapis.com/fcm/send/eIxM-UxK-tE:APA91bGpsRosCZ-MQsdPuR7YkcZCP0473urJ9Tvwmb_LANivrKl9ULh21c1CIMReeMeLDkpRcjOtaYDk646SVfQw-gsSKfZRntS-EooNmEl-MoxmYPhj9rVWx42fN1RTHfxXImicwdvN',NULL,'2025-04-07 16:21:26','{\"p256dh\":\"BCpxdfKlkPMNEvAPvDRF68djMaXuC5Z7VbogOX9wUCSLMKbWStqXK2GhygThUSL_WVu8puby0X6EFIJ-C1CgJlY\",\"auth\":\"5a-jxd11vXqBhH44rOyfog\"}'),(41,'https://fcm.googleapis.com/fcm/send/eH7shlM4p70:APA91bGt0GqzruvolPI3KV9-Gt32xnOsmnq0eYwA-qa5MBuaJHQGCh1BrGVlC3PWpaBf9FovxJ_VPnElE4WgdzXef4j8XtcHKimv773jijzciTP3zO5J69OQlKPUBV2u0ZtWtfmgBZKt',NULL,'2025-04-07 16:36:00','{\"p256dh\":\"BIimLKYVICcbyyzAwnlT1sl20jgb1MEQMvne3Ln1zm5WzF5ye3Y8bUAPitEBA5ChavqpzQgdfReIYbMWGiMiLVI\",\"auth\":\"xYDUKFxhYRw7Jqo04Bgweg\"}'),(42,'https://fcm.googleapis.com/fcm/send/c7RDNsDb_lc:APA91bE2W0AqtDmKi8HjrCM0HSofS8NN3QnyAGr2xFW5ENKQBZ00CtLF1rMC9OrrB6GaGDDcqJN-M3g7E5zw4csGYrfFZG0J-8Ws2n5qN3pZejzdYCUrgusbZPWpUqQYqE91ix6mzhG0',NULL,'2025-04-07 16:38:37','{\"p256dh\":\"BFqAXz4VQ08zM8h7nOQjXRal4wHYMBLr_DG6oIaZ2iKDTZ3wngPh6cRA7rOajFEvdy77aTuf32HdFJrI2YMu9J0\",\"auth\":\"t1UNUKBvkL7iZc8EbwUkIg\"}'),(43,'https://fcm.googleapis.com/fcm/send/czLiqjT75ts:APA91bFHyW8ewVhXvG-y3lS6CkFFnmxZ6Gwuanu3Sa0dXzFUeQI7WHezXkWqHN1G2W8wmOfb6kB5wLqy1PTDKb0lrWxu2Rzasr-ht3u-1E7oqRywK12HCcShe7KmPoaXjETp6HI2KYs6',NULL,'2025-04-07 16:59:52','{\"p256dh\":\"BHKazkCyqzxmb5t7lVP-GNHgiNY4Bn97q4aH3eKW2VorCkt5-_jDT18XCmU-j_q5UdmU_BhRsUzYxEOb1GdosUU\",\"auth\":\"tr7McJF4H8yn6mEASwj6qA\"}');
/*!40000 ALTER TABLE `subscriptions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tags`
--

DROP TABLE IF EXISTS `tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tags` (
  `tag_id` int(11) NOT NULL AUTO_INCREMENT,
  `tag_name` varchar(255) NOT NULL,
  `tag_color` varchar(50) DEFAULT '#FFFFFF',
  `tag_img` varchar(255) DEFAULT NULL,
  `slug` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`tag_id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tags`
--

LOCK TABLES `tags` WRITE;
/*!40000 ALTER TABLE `tags` DISABLE KEYS */;
INSERT INTO `tags` VALUES (19,'crop information','#233223',NULL,'crop-information'),(25,'पिके','#233223',NULL,'pike'),(26,'दुष्काळ प्रतिरोधक पिके','#233223',NULL,'dusskaal-prtirodhk-pike'),(27,'दुष्काळ','#233223',NULL,'dusskaal'),(28,'पिके','#233223',NULL,'pike'),(29,'पशु संवर्धन','#233223',NULL,'pshu-snvrdhn'),(30,'पशुपालन','#233223',NULL,'pshupaaln'),(31,'Jio Kheti','#233223',NULL,'jio-kheti'),(32,'Jio Kheti','#233223',NULL,'jio-kheti'),(33,'Jio Kheti','#233223',NULL,'jio-kheti'),(34,'शेती अनुदान','#233223',NULL,'shetii-anudaan'),(35,'अनुदान','#233223',NULL,'anudaan'),(36,'शेती','#233223',NULL,'shetii');
/*!40000 ALTER TABLE `tags` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-23 14:58:08
