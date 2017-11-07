const MongoDB = require('mongodb');
const mongoClient = MongoDB.MongoClient;
const clear = require('clear');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const url = `mongodb://localhost:27017/crunchbase`

mongoClient.connect(url, (error, db) => {
  if (error) {
    console.log('Error trying to connect to the Database');
    console.log(error);
  } else {
    console.log('😬 Connection established correctly!! 😬');

    function mainMenu() {
      clear();
      printMenu();
      rl.question('Type an option: ', (option) => {
        switch (option) {
          case "1":
            console.log('Loading all companies, please wait...');
            db.collection("companies").find({}, { _id: false, name: true }).toArray(function(err, res) {
              if (err) {
                console.error(err);
              } else {
                console.log(res);
              }
              rl.question(`\nType enter to continue: `, (answer) => {
                mainMenu()
              });
            });
            break;

          case "2":
            db.collection('companies').count((err, res) => {
              if (err) {
                console.error(err);
              } else {
                console.log(`There are ${res} in total.`);
              }
              rl.question(`\nType enter to continue: `, (answer) => {
                mainMenu()
              });
            });
            break;

          case "3":
            db.collection('companies').find({ founded_year: 2004 }).count((err, res) => {
              if (err) {
                console.error(err);
              } else {
                console.log(`In 2004, a total of ${res} companies were founded.`);
              }
              rl.question(`\nType enter to continue: `, (answer) => {
                mainMenu()
              });
            });
            break;

          case "4":
            db.collection('companies').find({ founded_year: 2004, founded_month: 2 }, { _id: false, name: true }).toArray((err, res) => {
              if (err) {
                console.error(err)
              } else {
                console.log(res)
              }
              rl.question(`\nType enter to continue: `, (answer) => {
                mainMenu()
              });
            });
            break;

          case "5":
            // inclusive for April (month 4), June (month 6)
            db.collection('companies').find({ founded_year: 2004, founded_month: { $gte: 4, $lte: 6 }}, { _id: false, name: true }).toArray((err, res) => {
              if (err) {
                console.error(err)
              } else {
                console.log(res)
              }
              rl.question(`\nType enter to continue: `, (answer) => {
                mainMenu()
              });
            });
            break;

          case "6":
            // inclusive April month 4, June month 6
            db.collection('companies').find({ "offices.city": "Barcelona" }, { _id: false, name: true }).toArray((err, res) => {
              if (err) {
                console.error(err)
              } else {
                console.log(res)
              }
              rl.question(`\nType enter to continue: `, (answer) => {
                mainMenu()
              });
            });
            break;

          case "7":
            db.collection('companies').find({}, { _id: false, name: true, number_of_employes: true }).sort({ number_of_employes: -1 }).limit(10).toArray((err, res) => {
              if (err) {
                console.error(err);
              } else {
                console.log(res.reverse()); // -1 is descending so we reverse it for asc) }
              }
              rl.question(`\nType enter to continue: `, (answer) => {
                mainMenu()
              });
            });
            break;

          case "8":
            // Hiding overview for visual purposes only because it generates a HUGE block of text.
            db.collection("companies").find({ name: "Facebook" }, { overview: false }).toArray(function(err, res) {
              if (err) {
                console.error(err);
              } else {
                console.log(res);
              }
              rl.question(`\nType enter to continue: `, (answer) => {
                mainMenu()
              });
            });
            break;

          case "9":
            db.collection("companies").findOne({ name: "Facebook" }, { _id: false, 'number_of_employees': true }, (err, res) => {
              if (err) {
                console.error(err);
              } else {
                console.log(res);
              }
              rl.question(`\nType enter to continue: `, (answer) => {
                mainMenu()
              });
            });
            break;

          case "10":
            db.collection("companies").findOne({ name: "Facebook" }, { _id: false, 'products.name': true }, (err, res) => {
              if (err) {
                console.error(err);
              } else {
                console.log(res);
              }
              rl.question(`\nType enter to continue: `, (answer) => {
                mainMenu()
              });
            });
            break;

          case "11":
            db.collection("companies").find({ name: "Facebook" }, { _id: false, 'relationships': true }).toArray(function(err, res) {
              if (err) {
                console.error(err);
              } else {
                console.log(res[0]['relationships'].filter((employee) => employee.is_past == false));
              }
              rl.question(`\nType enter to continue: `, (answer) => {
                mainMenu()
              });
            });
            break;

          case "12":
            db.collection("companies").find({ name: "Facebook" }, { _id: false, 'relationships': true }).toArray(function(err, res) {
              if (err) {
                console.error(err);
              } else {
                var fired = res[0]['relationships'].filter((employee) => employee.is_past == true).length;
                console.log(fired + " poor souls have been fired so far at Facebook.");
              }
              rl.question(`\nType enter to continue: `, (answer) => {
                mainMenu()
              });
            });
            break;

          case "13":
            db.collection("companies").find({ "relationships.person.permalink": "david-ebersman" }, { _id: false, name: true }).toArray(function(err, res) {
              if (err) {
                console.error(err);
              } else {
                console.log('Companies that David Ebersman has worked at: ')
                console.log(res);
              }
              rl.question(`\nType enter to continue: `, (answer) => {
                mainMenu()
              });
            });
            break;

          case "14":
            db.collection("companies").find({ name: "Facebook" }, { name: true, competitions: true }).toArray(function(err, res) {
              if (err) {
                console.error(err);
              } else {
                console.log(res[0]['competitions'].map((e) => e.competitor.name)); // We don't want the element competitor permalink so we aim for name
              }
              rl.question(`\nType enter to continue: `, (answer) => {
                mainMenu()
              });
            });
            break;

          case "0":
            console.log(`👋👋👋👋 😞 \n`);
            db.close((error) => {
              process.exit(0)
            });
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
