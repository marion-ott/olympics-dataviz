# DATA VIZ - OLYMPICS

# Follow these steps to install the project 

#### Install required dependencies
```shell
$ git clone https://github.com/marion-ott/olympics-dataviz.git
$ cd <pathToFolder>/client
$ npm install || yarn install
$ cd <pathToFolder>/server
$ npm install || yarn install
```

#### Create the database and populate your database
```shell
$ mysql -u userName -p
$ enter your mysql password
$ CREATE DATABASE olympics;
$ exit;
$ mysql -u <user> -p olympics < pathToFile/database.sql
```

#### Update the MySql connection information in server/server.js
In server.js (line 11), enter your own mysql password


## Launch the project
```shell
$ cd <pathToFolder>/client
$ npm start || yarn start
$ cd <pathToFolder>/server
$ node server.js
```

