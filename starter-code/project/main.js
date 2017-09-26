const MongoDB = require('mongodb');
const mongoClient = MongoDB.MongoClient;
const clear = require('clear');
const readline = require('readline');

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

const url = `mongodb://localhost:27017/crunchbase`

// ====================================
//      Connecting to the Database
// ====================================
mongoClient.connect(url, (error, db) => {
  if (error) {
    console.log('Error trying to connect to the Database');
    console.log(error);
  } else {
    console.log('Connection established correctly!! 😬');
  }

  // ======================
  //      Console Menu
  // ======================
  function mainMenu(){
    clear();
    printMenu();
    rl.question('Type an option: ', (option) => {
      switch(option){

        // 1.- List by name all companies.
        case "1":
          db.collection('companies').find({}, {name: 1, _id: 0}).toArray((error, result) => {
            if (error) {
              console.log(error);
              rl.question(`\nType enter to continue: `, (answer) => { mainMenu() })
            } else {
              console.log(result);
              rl.question(`\nType enter to continue: `, (answer) => { mainMenu() })
            }
          })
          break

        // 2.- How many companies are there?
        case "2":
          db.collection('companies').count( (error, result) => {
            if (error) throw error
            else {
              console.log(result)
              rl.question(`\nType enter to continue: `, (answer) => { mainMenu() })
            }
          })
          break;

        // 3.- How many companies were founded in 2004?
        case "3":
          db.collection('companies').find( {"founded_year": 2004}).count( (error, result) => {
            if (error) throw error
            else {
              console.log(result)
              rl.question(`\nType enter to continue: `, (answer) => { mainMenu() })
            }
          })
          break
        
        // 4.- List by name all companies founded in february of 2004.
        case "4":
          db.collection('companies').find( {"founded_year": 2004, "founded_month": 2}, {name: 1, _id: 0}).toArray( (error, result) => {
            if (error) throw error
            else {
              console.log(result)
              rl.question(`\nType enter to continue: `, (answer) => { mainMenu() })
            }
          })
          break

        // 5.- List by name all companies founded in the summer of 2004 (april to june) sorted by date.
        case "5":
          db.collection('companies').find(
            {
              $and: [ {"founded_month": { $gt: 3}}, {"founded_month": { $lt: 7}}, {"founded_year": 2004}]
            }
            // , {name: 1, _id: 0, founded_month: 1, founded_year: 1}  ***** TESTING PURPOSES *****
            , {name: 1, _id: 0, founded_month: 1, founded_year: 1}
          ).sort({ founded_month: 1, founded_day: 1}).toArray( (error, result) => {
            if (error) throw error
            else {
              console.log(result)
              rl.question(`\nType enter to continue: `, (answer) => { mainMenu() })
            }
          })
          break

        // 6.- What companies have offices in "Barcelona".  
        case "6":
          db.collection('companies').find( {"offices.city": "Barcelona"}, {name: 1, _id: 0}).toArray( (error, result) => {
            if (error) throw error
            else {
              console.log(result)
              rl.question(`\nType enter to continue: `, (answer) => { mainMenu() })              
            }
          })
          break

        // 7.- List the 10 companies with more employees sorted ascending (show name and employees).
        case "7":
        db.collection('companies').find( {"number_of_employees": {$gt: 100}}, {name: 1, _id: 0, number_of_employees: 1}).sort({"number_of_employees": -1}).toArray( (error, result) => {
          if (error) throw error
          else {
            console.log(result.splice(0, 10))
            rl.question(`\nType enter to continue: `, (answer) => { mainMenu() })                          
          }
        })
        break

        // 8.- Find the company with the name "Facebook"
        case "8":
        db.collection('companies').find( {"name": "Facebook"}).toArray( (error, result) => {
          if (error) throw error
          else {
            console.log(result[0])
            rl.question(`\nType enter to continue: `, (answer) => { mainMenu() })                             
          }
        })
        break
        
        // 9.- How many employees has Facebook?
        case "9":
        db.collection('companies').find( {"name": "Facebook"}, {name: 1, _id: 0, number_of_employees: 1}).toArray( (error, result) => {
          if (error) throw error
          else {
            console.log(result)
            rl.question(`\nType enter to continue: `, (answer) => { mainMenu() })                             
          }
        })
        break

        // 10.- List the name of all the products of Facebook
        case "10":
          db.collection('companies').find( {"name": "Facebook"}, {name: 1, _id: 0, "products.name": 1}).toArray( (error, result) => {
            if (error) throw error
            else {
              let products = result[0].products
              console.log(products)
              rl.question(`\nType enter to continue: `, (answer) => { mainMenu() })                             
            }
          })
          break

          // db.collection('companies').find( {"name": "Facebook", $or: [{"relationships.is_past": false},{"relationships.is_past": null} ]}, {name: 1, _id: 0, "relationships.$.person": 1}).toArray( (error, result) => {
        // 11.- List the people that are working at Facebook right now (check relationships field)
        case "11":
          db.collection('companies').find( {"name": "Facebook", "relationships.is_past": false}, {name: 1, _id: 0, "relationships.$.person": 1}).toArray( (error, result) => {
            if (error) throw error
            else {
              console.log(result[0].relationships)
              rl.question(`\nType enter to continue: `, (answer) => { mainMenu() })                             
            }
          })
          break

        // 12.- How many people are not working anymore at Facebook
        case "12":
          db.collection('companies').find( {"name": "Facebook", "relationships.is_past": true}, {name: 1, _id: 0, "relationships.$.person": 1}).toArray( (error, result) => {
            if (error) throw error
            else {
              console.log(result[0].relationships)
              rl.question(`\nType enter to continue: `, (answer) => { mainMenu() })                             
            }
          })
          break

        // 13.- List all the companies where "david-ebersman" has worked.
        case "13":
          db.collection('companies').find({"relationships.person.permalink": "david-ebersman"}, {name: 1, _id: 0, "relationship.person.permalink": 1}).toArray( (error, result) => {
            console.log(result)
            rl.question(`\nType enter to continue: `, (answer) => { mainMenu() })
          })
        break

        // 14.- List by name the competitors of Facebook
        case "14":
          db.collection('companies').find({"name": "Facebook"}, { _id: 0, "competitions": 1}).toArray( (error, result) => {
            result[0].competitions.forEach( (comp) => {
              console.log(comp.competitor.name)
            })
            rl.question(`\nType enter to continue: `, (answer) => { mainMenu() })            
          })
        break

        // 17.- Names and locations of companies that have offices in London
        case "17":
          db.collection('companies').find( {"offices.city": "London"}, {name: 1, _id: 0, "offices.city":1}).toArray( (error, result) => {
            if (error) throw error
            else {
              console.log(result)
              rl.question(`\nType enter to continue: `, (answer) => { mainMenu() })              
            }
          })
        break

        case "0":
          // console.log(`👋👋👋👋 😞 \n`);
          // db.close((error) => { process.exit(0) });
          // break;
        default:
          mainMenu();
          break;
      }
    });
}

  mainMenu();

});

// ======================
//      Console Menu
// ======================
function printMenu(){
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
