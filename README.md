# DATA VIZ - OLYMPICS

# Follow these steps to install the project 

#### Install required dependencies
```shell
$ git clone https://github.com/marion-ott/olympics-dataviz.git
$ cd <pathToProjectFolder>/client
$ npm install || yarn install
$ cd <pathToProjectFolder>/server
$ npm install || yarn install
```

#### Create the database and add the data
```shell
$ mysql -u userName -p
$ enter your mysql password
$ CREATE DATABASE olympics;
$ exit;
$ mysql -u <user> -p olympics < pathToFile/database.sql
```

#### Update the MySql connection information in server/server.js
In server.js (line 11), enter your own mysql password


--------

## Launch the project
```shell
$ cd <pathToProjectFolder>/client
$ npm start || yarn start
$ cd <pathToProjectFolder>/server
$ node server.js
```

