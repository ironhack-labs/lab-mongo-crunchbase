const MongoDB = require('mongodb');
const mongoClient = MongoDB.MongoClient;
const clear = require('clear');
const readline = require('readline');
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

const url = `mongodb://localhost:27017/crunchbase`;

mongoClient.connect(url, (err, db) => {
  const col = db.collection('companies');
  if (err) {
    console.log('Error trying to connect to the Database');
    console.log(err);
  } else {
    console.log('Connection established correctly!! 😬');

    (function mainMenu() {
      clear();
      printMenu();
      rl.question('Type an option: ', (option) => {
        switch(option) {
          case "1":
          col.find({}, {name: 1, _id: 0}).toArray((err, res) => {
            if (err) {
              console.log(err);
            } else {
              console.log(`List of companies:`);
              res.forEach(company => console.log(company.name));
            }
            rl.question(`\nType enter to continue: `, () => { mainMenu() });
          });
            break;
          case "2":
          col.count((err, res) => {
            if (err) {
              console.log(err);
            } else {
              console.log(`There are ${res} companies.`);
            }
            rl.question(`\nType enter to continue: `, () => { mainMenu() });
          });
            break;
          case "3":
          col.find({founded_year: 2004}).count((err, res) => {
            if (err) {
              console.log(err);
            } else {
              console.log(`${res} companies were founded in 2004.`);
            }
            rl.question(`\nType enter to continue: `, () => { mainMenu() });
          });
            break;
          case "4":
          col.find({founded_year: 2004, founded_month: 2}, {name: 1, _id: 0}).toArray((err, res) => {
            if (err) {
              console.log(err);
            } else {
              console.log(`Companies founded in February, 2004:`);
              res.forEach(company => console.log(company.name));
            }
            rl.question(`\nType enter to continue: `, () => { mainMenu() });
          });
            break;
          case "5":
          col.find({founded_year: 2004, founded_month: { $gte: 4, $lte: 6 } }, {name: 1, founded_year: 1, founded_month: 1, _id: 0}).sort({founded_month: 1}).toArray((err, res) => {
            if (err) {
              console.log(err);
            } else {
              console.log(`Companies founded in the summer of 2004:`);
              res.forEach(company => console.log(`${company.name} founded on ${company.founded_month} of ${company.founded_year}`));
            }
            rl.question(`\nType enter to continue: `, () => { mainMenu() });
          });
            break;
          case "6":
          col.find({'offices.city': 'Barcelona'}, {name: 1, 'offices.city': 1, _id: 0}).toArray((err, res) => {
            if (err) {
              console.log(err);
            } else {
              console.log(`Companies with office in Barcelona:`);
              res.forEach(company => console.log(`${company.name}`));
            }
            rl.question(`\nType enter to continue: `, () => { mainMenu() });
          });
            break;
          case "7":
          col.find({}, {name: 1, number_of_employees: 1, _id: 0}).sort({number_of_employees: -1}).limit(10).toArray((err, res) => {
            if (err) {
              console.log(err);
            } else {
              res.reverse();
              console.log(`Companies with more employees:`);
              res.forEach(company => console.log(`${company.name} ${company.number_of_employees}`));
            }
            rl.question(`\nType enter to continue: `, () => { mainMenu() });
          });
            break;
          case "8":
          col.find({name: 'Facebook'}, {name: 1, _id: 0}).toArray((err, res) => {
            if (err) {
              console.log(err);
            } else {
              console.log(`Companies named Facebook:`);
              console.log(`${res[0].name}`);
            }
            rl.question(`\nType enter to continue: `, () => { mainMenu() });
          });
            break;
          case "9":
          col.find({name: 'Facebook'}, {number_of_employees: 1, _id: 0}).toArray((err, res) => {
            if (err) {
              console.log(err);
            } else {
              console.log(`Facebook has ${res[0].number_of_employees} employees`);
            }
            rl.question(`\nType enter to continue: `, () => { mainMenu() });
          });
            break;
          case "10":
          col.find({name: 'Facebook'}, {'products.name': 1, _id: 0}).toArray((err, res) => {
            if (err) {
              console.log(err);
            } else {
              console.log(`List of Facebook products:`);
              res[0].products.forEach(product => console.log(product.name));
            }
            rl.question(`\nType enter to continue: `, () => { mainMenu() });
          });
            break;
          case "11":
          col.find({name: 'Facebook'}, {relationships: 1, _id: 0}).toArray((err, res) => {
            if (err) {
              console.log(err);
            } else {
              console.log(`List of Facebook current employees:`);
              const currentEmployees = res[0].relationships.filter(emp => !emp.is_past);
              currentEmployees.forEach(employee => console.log(employee.person.first_name, employee.person.last_name));
            }
            rl.question(`\nType enter to continue: `, () => { mainMenu() });
          });
            break;
          case "12":
          col.find({name: 'Facebook'}, {relationships: 1, _id: 0}).toArray((err, res) => {
            if (err) {
              console.log(err);
            } else {
              const exEmployees = res[0].relationships.filter(emp => emp.is_past);
              console.log(`${exEmployees.length} people are not working anymore at Facebook`);
            }
            rl.question(`\nType enter to continue: `, () => { mainMenu() });
          });
            break;
          case "13":
          col.find({'relationships.person.first_name': 'David', 'relationships.person.last_name': 'Ebersman'}, {name: 1, _id: 0}).toArray((err, res) => {
            if (err) {
              console.log(err);
            } else {
              console.log(`David Ebersman has worked at:`);
              res.forEach(company => console.log(company.name));
            }
            rl.question(`\nType enter to continue: `, () => { mainMenu() });
          });
            break;
          case "14":
          col.find({name: 'Facebook'}, {competitions: 1, _id: 0}).toArray((err, res) => {
            if (err) {
              console.log(err);
            } else {
              console.log(`List of Facebook competition:`);
              res[0].competitions.forEach(company => console.log(company.competitor.name));
            }
            rl.question(`\nType enter to continue: `, () => { mainMenu() });
          });
            break;
          case "15":
          col.find({tag_list: {$regex: 'social-networking'}}, {name: 1, _id: 0}).toArray((err, res) => {
            if (err) {
              console.log(err);
            } else {
              console.log(`Names of the companies that has "social-networking" in tag-list:`);
              res.forEach(company => console.log(company.name));
            }
            rl.question(`\nType enter to continue: `, () => { mainMenu() });
          });
            break;
          case "16":
          col.find({tag_list: {$regex: 'social-networking'}, founded_year: {$gte: 2002, $lte: 2016}}, {name: 1, founded_year: 1, _id: 0}).toArray((err, res) => {
            if (err) {
              console.log(err);
            } else {
              console.log(`${res.length} companies has "social-network" in tag-list and were founded between 2002 and 2016 inclusive`);
            }
            rl.question(`\nType enter to continue: `, () => { mainMenu() });
          });
            break;
          case "17":
          col.find({'offices.city': 'London'}, {name: 1, offices: 1, _id: 0}).toArray((err, res) => {
            if (err) {
              console.log(err);
            } else {
              console.log(`Names and locations of companies that have offices in London:`);
              res.forEach(company => console.log(`${company.name} altitude: ${company.offices[0].latitude} longitude: ${company.offices[0].longitude}`)); // not London's office location, but first office in the array offices :(
            }
            rl.question(`\nType enter to continue: `, () => { mainMenu() });
          });
            break;
          case "18":
          col.find({tag_list: {$regex: 'social-networking'}, founded_year: {$gte: 2002, $lte: 2016}, 'offices.city': 'New York'}, {name: 1, founded_year: 1, _id: 0}).toArray((err, res) => {
            if (err) {
              console.log(err);
            } else {
              console.log(`${res.length} companies has "social-network" in tag-list and were founded between 2002 and 2016 inclusive`);
            }
            rl.question(`\nType enter to continue: `, () => { mainMenu() });
          });
            break;
          case "0":
            console.log(`👋👋👋👋 😞 \n`);
            db.close((err) => { process.exit(0) });
            break;
          default:
            mainMenu();
            break;
        }
      });
    })(); // Closure
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
