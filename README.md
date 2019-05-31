# DATA VIZ - OLYMPICS

## Follow these steps to install the project 

```shell
$ git clone https://github.com/marion-ott/olympics-dataviz.git
$ cd pathToFolder/client
$ npm install
$ cd ../server
$ npm install
```
#### Update the MySql connection information in server/server.js

## Follow these steps to create the database
```shell
$ mysql -u userName -p
$ enter your mysql password
$ CREATE DATABASE olympics;
$ exit;
$ mysql -u userName -p olympics < pathToFile/data.sql
```

## Start the project locally
```shell
$ cd pathToFolder/client
$ npm start || yarn start
$ cd pathToFolder/server
$ node server.js
```


### To add the data about Olympics facts

## Execute the script in your MySql console or terminal

```shell
$ mysql -u <user> -p
$ use olympics
$ DROP TABLE IF EXISTS `fact`;
  SET character_set_client = utf8mb4 ;
  CREATE TABLE `fact` (
    `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
    `title` text,
    `text` text,
    `src` varchar(100) DEFAULT NULL,
    `game_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fact_game_id_fk` (`game_id`),
  CONSTRAINT `fact_game_id_fk` FOREIGN KEY (`game_id`) REFERENCES `game` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
$ exit;
$ cd <project-folder>
$ cd server
$ node facts.js
```
