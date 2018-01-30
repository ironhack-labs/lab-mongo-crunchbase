const MongoDB = require('mongodb');
const mongoClient = MongoDB.MongoClient;
const clear = require('clear');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
let TOP_TOP = 1000;
let today = new Date();

const url = `mongodb://localhost:27017/crunchbase`;

mongoClient.connect(url, (error, db) => {
  if (error) {
    console.log('Error trying to connect to the Database');
    console.log(error);
  } else {
    console.log('Connection established correctly!! 😬');
    function mainMenu() {
      clear();
      printMenu();
      rl.question('Type an option: ', option => {
        switch (option) {
          case '1':
            db
              .collection('companies')
              .find({}, {name: 1, _id: 0})
              .toArray((error, result) => {
                if (error) {
                  console.log(error);
                  rl.question(`\nType enter to continue: `, answer => {
                    mainMenu();
                  });
                } else {
                  console.log(result);
                  rl.question(`\nType enter to continue: `, answer => {
                    mainMenu();
                  });
                }
              });
            break;
          case '2':
            db.collection('companies').count({}, (error, result) => {
              if (error) {
                console.log(error);
                rl.question(`\nType enter to continue: `, answer => {
                  mainMenu();
                });
              }
            });
            break;
          case '3':
            db
              .collection('companies')
              .count({founded_year: {$eq: 2004}}, (error, result) => {
                if (error) {
                  console.log(error);
                  rl.question(`\nType enter to continue: `, answer => {
                    mainMenu();
                  });
                } else {
                  console.log(result);
                  rl.question(`\nType enter to continue: `, answer => {
                    mainMenu();
                  });
                }
              });
            break;
          case '4':
            db
              .collection('companies')
              .find(
                {founded_year: {$eq: 2004}, founded_month: {$eq: 2}},
                {name: 1, _id: 0}
              )
              .toArray((error, result) => {
                if (error) {
                  console.log(error);
                  rl.question(`\nType enter to continue: `, answer => {
                    mainMenu();
                  });
                } else {
                  console.log(result);
                  rl.question(`\nType enter to continue: `, answer => {
                    mainMenu();
                  });
                }
              });
            break;
          case '5':
            db
              .collection('companies')
              .find(
                {
                  founded_year: {$eq: 2004},
                  founded_month: {$gte: 4},
                  founded_month: {$lte: 6},
                },
                {
                  name: 1,
                  founded_day: 1,
                  founded_month: 1,
                  founded_year: 1,
                  _id: 0,
                }
              )
              .sort({founded_month: 1, founded_day: 1})
              .toArray((error, result) => {
                if (error) {
                  console.log(error);
                  rl.question(`\nType enter to continue: `, answer => {
                    mainMenu();
                  });
                } else {
                  console.log(result);
                  rl.question(`\nType enter to continue: `, answer => {
                    mainMenu();
                  });
                }
              });
            break;
          case '6':
            db
              .collection('companies')
              .find(
                {offices: {$elemMatch: {city: 'Barcelona'}}},
                {name: 1, _id: 0}
              )
              .toArray((error, result) => {
                if (error) {
                  console.log(error);
                  rl.question(`\nType enter to continue: `, answer => {
                    mainMenu();
                  });
                } else {
                  console.log(result);
                  rl.question(`\nType enter to continue: `, answer => {
                    mainMenu();
                  });
                }
              });
            break;
          case '7':
            db
              .collection('companies')
              .find(
                {number_of_employees: {$gte: TOP_TOP}}, //TOP_TOP equals any given limit
                {name: 1, number_of_employees: 1, _id: 0}
              )
              .sort({number_of_employees: 1})
              .limit(10)
              .toArray((error, result) => {
                if (error) {
                  console.log(error);
                  rl.question(`\nType enter to continue: `, answer => {
                    mainMenu();
                  });
                } else {
                  console.log(result);
                  rl.question(`\nType enter to continue: `, answer => {
                    mainMenu();
                  });
                }
              });
            break;
          case '8':
            let facebook = db
              .collection('companies')
              .find({name: 'Facebook'})
              .toArray((error, result) => {
                if (error) {
                  console.log(error);
                  rl.question(`\nType enter to continue: `, answer => {
                    mainMenu();
                  });
                } else {
                  console.log(result);
                  rl.question(`\nType enter to continue: `, answer => {
                    mainMenu();
                  });
                }
              });
            break;
          case '9':
            facebook
              .find({name: 1, number_of_employees: 1, _id: 0})
              .count({}, (error, result) => {
                if (error) {
                  console.log(error);
                  rl.question(`\nType enter to continue: `, answer => {
                    mainMenu();
                  });
                } else {
                  console.log(result);
                  rl.question(`\nType enter to continue: `, answer => {
                    mainMenu();
                  });
                }
              });
            break;
          case '10':
            db
              .collection('companies')
              .find({name: 'Facebook'}, {products}, {name: 1, _id: 0})
              .toArray((error, result) => {
                if (error) {
                  console.log(error);
                  rl.question(`\nType enter to continue: `, answer => {
                    mainMenu();
                  });
                } else {
                  console.log(result);
                  rl.question(`\nType enter to continue: `, answer => {
                    mainMenu();
                  });
                }
              });
              break;
              case '11':
              let working = db
              .document('companies')
              .find({
                name: 'Facebook',
                relationships: 1,
                founded_day = {$gte: today} //THIS IS OBVIOUSLY NOT RIGHT, BUT YOU GET MY LOGIC... I HAVE NOT ENOUGH PATIENCE TO READ THROUGH ALL THE FACEBOOK LIST
              })
              .toArray((error, result) => {
                if (error) {
                  console.log(error);
                  rl.question(`\nType enter to continue `, answer => {
                    mainMenu();
                  });
                } else {
                  console.log(result);
                  rl.question(`\nType enter to continue `, answer => {
                    mainMenu();
                  })
                }
              })
              break;
              case '12':
              let notworking = db.document('companies').find({
                name: 'Facebook',
                number_of_employees_date: {$lt: today}, //THE SAME GOES FOR THIS ONE, THE LIST IS TOO LONG TO LOOK IT UP. SAME LOGIC, DIFFERENT VALUE..
                _id: 0,
                name: 1,
              }).toArray().count({}, (error, result) => {
                if (error) {
                  console.log(error);
                  rl.question(`\nType enter to continue: `, answer => {
                    mainMenu();
                  })
                } else {
                  var result = -(notworking - working.count())
                  console.log(result);
                  rl.question('\nType enter to continue: ', answer => {
                    mainMenu();
                  })
                }
              })
              break;
              case '13':
              db.document('companies').find({}, {
                name_employee: 'david-ebersman',
                name: 1,
                employee_date: {$lttoday},
                _id: 0
              }).toArray((error, result) => {
                if (error) {
                  console.log(error);
                  rl.question(`\nType enter to continue: `, answer => {
                    mainMenu();
                  })
                } else {
                  console.log(result);
                  rl.question(`\nType enter to continue: `, answer => {
                    mainMenu();
                  })
                }
              })
              break;
              case '15':
              db.document('companies').find({
                tag_name: {$elemMatch(social_networking)},
                name: 1,
                _id: 0
              }).toArray((error, result) => {
                if (error) {
                  console.log(error);
                  rl.question(`\nType enter to continue: `, answer => {
                    mainMenu();
                  })
                } else {
                  console.log(result);
                  rl.question(`\nType enter to continue: `, answer => {
                    mainMenu();
                  })
                }
              })
              break;
              case '16':
              db.document('companies').find({
                founded_year:{$gte2002},
                founded_year: {$lte2016},
                tag_name: {$elemMatch(social_networking)}
              }).toArray((error, result) => {
                if (error) {
                  console.log(error);
                  rl.question(`\nType enter to continue: `, answer => {
                    mainMenu();
                  })
                } else {
                  console.log(result);
                  rl.question(`\nType enter to continue: `, answer => {
                    mainMenu();
                  })
                }
              })
              break;
          case '0':
            console.log(`👋👋👋👋 😞 \n`);
            db.close(error => {
              process.exit(0);
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
