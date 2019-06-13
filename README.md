# DATA VIZ - OLYMPICS

## Follow these steps to install the project 

#### Install required packages
```shell
$ git clone https://github.com/marion-ott/olympics-dataviz.git
$ cd <pathToFolder>/client
$ npm install || yarn install
$ cd <pathToFolder>/server
$ npm install || yarn install
```

## Follow these steps to create the database
```shell
$ mysql -u userName -p
$ enter your mysql password
$ CREATE DATABASE olympics;
$ exit;
$ mysql -u <user> -p olympics < pathToFile/data.sql
```

#### Update the MySql connection information in server/server.js
In server.js (line 11), enter your own mysql password


## Start the project locally
```shell
$ cd <pathToFolder>/client
$ npm start || yarn start
$ cd <pathToFolder>/server
$ node server.js
```

