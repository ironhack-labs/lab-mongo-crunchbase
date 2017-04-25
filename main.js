const MongoDB = require('mongodb');
const clear = require('clear');
const readline = require('readline');
const _ = require('lodash');

const mongoClient = MongoDB.MongoClient;
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

const url = 'mongodb://localhost:27017/crunchbase';

mongoClient.connect(url, (error, db) => {
  if (error) {
    console.log('Error trying to connect to the Database');
    console.log(error);
  } else {
    console.log('Connection established correctly!! 😬');

    function printMenu() {
      console.log(`
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
      12.- How many people are not working anymore at Facebook
      13.- List all the companies where "david-ebersman" has worked.
      14.- List by name the competitors of Facebook
      15.- Names of the companies that has "social-networking" in tag-list (be aware that the value of field is a string check regex operators)
      16.- How many companies that has "social-network" in tag-list and founded between 2002 and 2016 inclusive
      17.- Names and locations of companies that have offices in London
      18.- How many companies that has "social-network" in tag-list and founded between 2002 and 2016 inclusive and has offices in New York
      `);
    }

    function mainMenu() {
      clear();
      printMenu();
      rl.question('Type an option: ', (option) => {
        switch (option) {
          case '1': // 1.- List by db.restaurants.count({ grades: { $elemMatch: { date: { $gte: ISODate('2015-01-01T00:00:00.000Z') } } } });name all companies.
            db.collection('companies').find({}, { name: 1, _id: 0 }).toArray((error, result) => {
              if (error) {
                console.log(error);
                rl.question('\nType enter to continue: ', (answer) => { mainMenu(); });
              } else {
                console.log(result);
                rl.question('\nType enter to continue: ', (answer) => { mainMenu(); });
              }
            });
            break;
          case '2': // 2.- How many companies are there?
            db.collection('companies').count((error, result) => {
              if (error) {
                console.log(error);
                rl.question('\nType enter to continue: ', (answer) => { mainMenu(); });
              } else {
                console.log(result);
                rl.question('\nType enter to continue: ', (answer) => { mainMenu(); });
              }
            });
            break;
          case '3': // 3.- How many companies were founded in 2004?
            db.collection('companies').find({ founded_year: 2004 }).count((error, result) => {
              if (error) {
                console.log(error);
                rl.question('\nType enter to continue: ', (answer) => { mainMenu(); });
              } else {
                console.log(result);
                rl.question('\nType enter to continue: ', (answer) => { mainMenu(); });
              }
            });
            break;
          case '4': // 4.- List by name all companies founded in february of 2004.
            db.collection('companies').find({ founded_year: 2004, founded_month: 2 }, { name: 1, _id: 0 }).toArray((error, result) => {
              if (error) {
                console.log(error);
                rl.question('\nType enter to continue: ', (answer) => { mainMenu(); });
              } else {
                console.log(result);
                rl.question('\nType enter to continue: ', (answer) => { mainMenu(); });
              }
            });
            break;
          case '5': // 5.- List by name all companies founded in the summer of 2004 (april to june) sorted by date.
            db.collection('companies')
            .find({ founded_year: 2004,
              $and: [{ founded_month: { $gte: 4 } }, { founded_month: { $lte: 6 } }] },
              { name: 1, _id: 0 }).sort({ created_at: 1 }).toArray((error, result) => {
                if (error) {
                  console.log(error);
                  rl.question('\nType enter to continue: ', (answer) => { mainMenu(); });
                } else {
                  console.log(result);
                  rl.question('\nType enter to continue: ', (answer) => { mainMenu(); });
                }
              });
            break;
          case '6': // 6.- What companies have offices in "Barcelona".
            db.collection('companies').find({ offices: { $elemMatch: { city: 'Barcelona' } } }).count((error, result) => {
              if (error) {
                console.log(error);
                rl.question('\nType enter to continue: ', (answer) => { mainMenu(); });
              } else {
                console.log(result);
                rl.question('\nType enter to continue: ', (answer) => { mainMenu(); });
              }
            });
            break;
          case '7': // 7.- List the 10 companies with more employees sorted ascending (show name and employees).
            db.collection('companies').find({}, { name: 1, number_of_employees: 1, _id: 0 }).limit(10).sort({ number_of_employees: -1 }).toArray((error, result) => {
              if (error) {
                console.log(error);
                rl.question('\nType enter to continue: ', (answer) => { mainMenu(); });
              } else {
                console.log(result);
                rl.question('\nType enter to continue: ', (answer) => { mainMenu(); });
              }
            });
            break;
          case '8': // 8.- Find the company with the name "Facebook"
            db.collection('companies').find({ name: 'Facebook' }, { name: 1, _id: 0 }).toArray((error, result) => {
              if (error) {
                console.log(error);
                rl.question('\nType enter to continue: ', (answer) => { mainMenu(); });
              } else {
                console.log(result);
                rl.question('\nType enter to continue: ', (answer) => { mainMenu(); });
              }
            });
            break;
          case '9': // 9.- How many employees has Facebook?
            db.collection('companies').find({ name: 'Facebook' }, { name: 1, number_of_employees: 1, _id: 0 }).toArray((error, result) => {
              if (error) {
                console.log(error);
                rl.question('\nType enter to continue: ', (answer) => { mainMenu(); });
              } else {
                console.log(result);
                rl.question('\nType enter to continue: ', (answer) => { mainMenu(); });
              }
            });
            break;
          case '10': // 10.- List the name of all the products of Facebook
            db.collection('companies').find({ name: 'Facebook' }, { 'products.name': 1, _id: 0 }).toArray((error, result) => {
              if (error) {
                console.log(error);
                rl.question('\nType enter to continue: ', (answer) => { mainMenu(); });
              } else {
                //console.log(result[0]);
                const nameOfProducts = result[0].products.map(el => el.name);
                console.log(nameOfProducts);
                rl.question('\nType enter to continue: ', (answer) => { mainMenu(); });
              }
            });
            break;
          case '11': // 11.- List the people that are working at Facebook right now (check relationships field)
            db.collection('companies').find({ name: 'Facebook' }, { 'relationships.person': 1, _id: 0 }).toArray((error, result) => {
              if (error) {
                console.log(error);
                rl.question('\nType enter to continue: ', (answer) => { mainMenu(); });
              } else {
                const names = result[0].relationships.map(el => el.person.first_name + ' ' + el.person.last_name);
                // console.log(result[0].relationships);
                console.log(names);
                // console.log(JSON.stringify(result));

                rl.question('\nType enter to continue: ', (answer) => { mainMenu(); });
              }
            });
            break;
          case '12': // 12.- How many people are not working anymore at Facebook
            db.collection('companies').find({ name: 'Facebook' }, { 'relationships.is_past': 1, _id: 0 }).toArray((error, result) => {
              if (error) {
                console.log(error);
                rl.question('\nType enter to continue: ', (answer) => { mainMenu(); });
              } else {
                // console.log(JSON.stringify(result));
                const isPastFalse = result[0].relationships.filter(el => el.is_past === true);
                console.log(isPastFalse.length);
                rl.question('\nType enter to continue: ', (answer) => { mainMenu(); });
              }
            });
            break;
          case '13': // 13.- List all the companies where "david-ebersman" has worked.
            db.collection('companies').find({ relationships: { $elemMatch: { 'person.permalink': 'david-ebersman' } } }, { name: 1, _id: 0 }).toArray((error, result) => {
              if (error) {
                console.log(error);
                rl.question('\nType enter to continue: ', (answer) => { mainMenu(); });
              } else {
                // console.log(JSON.stringify(result));
                console.log(result.length);
                rl.question('\nType enter to continue: ', (answer) => { mainMenu(); });
              }
            });
            break;
          case '14': // 14.- List by name the competitors of Facebook
            db.collection('companies').find({ name: 'Facebook' }, { 'competitions.competitor.name': 1, _id: 0 }).toArray((error, result) => {
              if (error) {
                console.log(error);
                rl.question('\nType enter to continue: ', (answer) => { mainMenu(); });
              } else {
                // console.log(JSON.stringify(result[0].competitions));
                const competitors = result[0].competitions.map(el => el.competitor.name);
                console.log(competitors);
                rl.question('\nType enter to continue: ', (answer) => { mainMenu(); });
              }
            });
            break;
          case '15': // 15.- Names of the companies that has "social-networking" in tag-list (be aware that the value of field is a string check regex operators)
            db.collection('companies').find({ tag_list: /social-networking/ }, { name: 1, _id: 0 }).toArray((error, result) => {
              if (error) {
                console.log(error);
                rl.question('\nType enter to continue: ', (answer) => { mainMenu(); });
              } else {
                console.log(result);
                const socialNetworkingCompanies = result.map(el => el.name);
                console.log(socialNetworkingCompanies);
                rl.question('\nType enter to continue: ', (answer) => { mainMenu(); });
              }
            });
            break;
          case '16': // 16.- How many companies that has "social-network" in tag-list and founded between 2002 and 2016 inclusive
            db.collection('companies').find({ $and: [{ tag_list: /social-networking/ }, { founded_year: { $gte: 2002 } }, { founded_year: { $lte: 2016 } }] }, { name: 1, _id: 0 }).toArray((error, result) => {
              if (error) {
                console.log(error);
                rl.question('\nType enter to continue: ', (answer) => { mainMenu(); });
              } else {
                console.log(result.length);
                rl.question('\nType enter to continue: ', (answer) => { mainMenu(); });
              }
            });
            break;
          case '17': // 17.- Names and locations of companies that have offices in London
            db.collection('companies').find({ offices: { $elemMatch: { city: 'London' } } }, { name: 1, 'offices.city': 1, _id: 0 }).toArray((error, result) => {
              if (error) {
                console.log(error);
                rl.question('\nType enter to continue: ', (answer) => { mainMenu(); });
              } else {
                const companiesAndLocations = result.map(el => 'Company: ' + el.name + ' Address: ' + el.offices.map(office => office.address1 + ', ' + office.address2 + ', ' + office.zip_code + ', ' + office.city + ', ' + office.country_code));
                console.log(companiesAndLocations);

                rl.question('\nType enter to continue: ', (answer) => { mainMenu(); });
              }
            });
            break;
          case '18': // 18.- How many companies that has "social-network" in tag-list and founded between 2002 and 2016 inclusive and has offices in New York
            db.collection('companies').find({ $and: [{ tag_list: /social-networking/ }, { founded_year: { $gte: 2002 } }, { founded_year: { $lte: 2016 } }, { offices: { $elemMatch: { city: 'New York' } } }] }, { name: 1, _id: 0 }).toArray((error, result) => {
              if (error) {
                console.log(error);
                rl.question('\nType enter to continue: ', (answer) => { mainMenu(); });
              } else {
                console.log(result.length);
                rl.question('\nType enter to continue: ', (answer) => { mainMenu(); });
              }
            });
            break;
          case '0':
            console.log('👋👋👋👋 😞 \n');
            db.close((error) => { process.exit(0); });
            break;
          default:
            mainMenu();
            break;
        }
      });
    }
    mainMenu();
  }
});
