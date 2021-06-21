![Ironhack Logo](https://i.imgur.com/1QgrNNw.png)

# DE | Crunchbase Database

![](https://i.imgur.com/FqGd9jz.jpg)

## Introduction

You will build an small application to perform queries to crunchbase database.

Crunchbase is the premier destination for discovering industry trends, investments, and news about hundreds of thousands of companies globally. From startups to Fortune 500s, Crunchbase is recognized as the primary source of company intelligence by millions of users globally.

## Import data into a database

Inside the starter-code folder you will find the crunchdatabase file.

Use `mongoimport` command to create a database named `crunchbase`, and import all the data contained on the file into a collection named `companies`.

💡 Check mongoimport documentation if you don't remember how to do it. 💡



## Let's start

Create a new folder for you project.

```javascript
$ npm init
```

Now that we have created the project, add the following packages`clear` and `mongodb`

```javascript
$ npm install --save mongodb@2     // don´t forget the @2 after mongodb, this will force npm to install that specific version
$ npm install --save clear
```

Run the `main.js` file to using the `node main.js` command in order to connect to the `chrunchbase` database and `companies` collection. Then, check how the console asks you to create 17 queries in order to archieve some kind of data filtering:


```raw
0.- Exit
1.- List by name all companies.
2.- How many companies are there?
3.- How many companies were founded in 2004?
4.- List by name all companies founded in february of 2004.
5.- List by name all companies founded in the summer of 2004 (april to june) sorted by date.
6.- What companies have offices in "Barcelona".
7.- List the 10 companies with more employees sorted ascending (show name and employees).
8.- Find the company with the name "Facebook"
9.- How many employees has Facebook?
10.- List the name of all the products of Facebook
11.- List the people that are working at Facebook right now (check relationships field)
12.- List all the companies where "david-ebersman" has worked.
13.- List by name the competitors of Facebook
14.- Names of the companies that has "social-networking" in tag-list (be aware that the value of field is a string check regex operators)
15.- How many companies that has "social-network" in tag-list and founded between 2002 and 2016 inclusive
16.- Names and locations of companies that have offices in London
17.- How many companies that has "social-network" in tag-list and founded between 2002 and 2016 inclusive and has offices in New York
```

As the file already contains the first 3 queries solved for you, you can check how pressing keys 1 to 3 shows requested results. 

This is the structure you will find for every case, where you will need to modify the `.find()` method arguments in every additional case:

```javascript
case "2":
db.collection('companies').find({}, { name: 1, _id: 0 }).count((error, result) => {
  if (error) {
    console.log(error);
    rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
  } else {
    console.log(result);
    rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
  }
})
break;
```

## Now it's your turn

Check the `main.js` file and replicate the structure above so you can perfom the 17 queries, following the instructions how we did before.


## Summary

In this exercise you practice with MongoDB Driver to perform different queries.

## Extra Resources

[MongoDB NodeJS Driver Documentatio](http://mongodb.github.io/node-mongodb-native/2.2/quick-start/)

[MongoShell Documentation](https://docs.mongodb.com/manual/)
