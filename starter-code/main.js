const MongoDB = require('mongodb')
const mongoClient = MongoDB.MongoClient
const clear = require('clear')
const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const url = `mongodb://localhost:27017/crunchbase`

mongoClient.connect(url, (error, db) => {
  if (error) {
    console.log('Error trying to connect to the Database')
    console.log(error)
  } else {
    console.log('Connection established correctly!! 😬')
    mainMenu(db)
  }
})

function mainMenu(db) {
  clear()
  printMenu()
  rl.question('Type an option: ', (option) => {
    switch (option) {
      case "1": listAllCompaniesName(db); break;
      case "2": numberOfCompanies(db); break;
      case "3": numberOfCompaniesFoundedIn2004(db); break;
      case "4": listByNameCompaniesFoundedInFebruary2004(db); break;
      case "5": listByNameCompaniesFoundedInSummer2004SortByDate(db); break;
      case "6": companiesWithOfficesInBcn(db); break;
      case "7": the10CompaniesWithMoreEmployeesAscSort(db); break;
      case "8": getFacebookCompany(db); break;
      case "9": numFacebookEmployees(db); break;
      case "10": allFacebookProducts(db); break;
      case "11": employeesNamesNowAtFacebook(db); break;
      case "12": numFacebookExEmployees(db); break;
      case "13": allCompaniesWhereDavidEbersmanHasWorked(db); break;



      case "14": facebookCompetitorsSortByName(db); break;
      case "15": companiesNameWithSocialNetworkingAsTagList(db); break;
      case "16": numCompaniesWithSocialNetworkingAsTagListFounded2002And2016(db); break;
      case "17": companiesNamesAndLocationWithLondonOffices(db); break;
      case "18": numCompaniesWithSocialNetworkingAsTagListFounded2002And2016inNY(db); break;
      case "0":
        console.log(`👋👋👋👋 😞 \n`)
        db.close((error) => {
          process.exit(0)
        })
        break
      default:
        mainMenu(db)
        break
    }
  })
}

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
`)
}

function listAllCompaniesName(db) {
  db.collection('companies').find({}, {name: 1, _id: 0}).toArray((error, result) => {
    errorOrResult(error, result, db)
  })
}

function numberOfCompanies(db) {
  db.collection('companies').count((error, result) => {
    errorOrResult(error, result, db)
  })
}

function numberOfCompaniesFoundedIn2004(db) {
  db.collection('companies').find({"founded_year": 2004}, {name: 1, founded_year: 1, _id: 0}).count((error, result) => {
    errorOrResult(error, result, db)
  })
}

function listByNameCompaniesFoundedInFebruary2004(db) {
  db.collection('companies').find({"founded_year": 2004, "founded_month": 2}, {name: 1, _id: 0}).toArray((error, result) => {
    errorOrResult(error, result, db)
  })
}

function listByNameCompaniesFoundedInSummer2004SortByDate(db) {
  db.collection('companies').find(
    {$and: [ {"founded_year": 2004}, {"founded_month": {$gt: 3}}, {"founded_month": {$lt: 7}}]},
    {name: 1, _id: 0}).sort({"founded_year": 1, "founded_month": 1, "founded_day": 1}).toArray((error, result) => {
    errorOrResult(error, result, db)
  })
}

function companiesWithOfficesInBcn(db) {
  db.collection('companies').find({"offices.city": "Barcelona"}, {name: 1, _id: 0}).toArray((error, result) => {
    errorOrResult(error, result, db)
  })
}

function the10CompaniesWithMoreEmployeesAscSort(db) {
  db.collection('companies').find({}, {name: 1, number_of_employees: 1, _id: 0}).sort({"number_of_employees": -1}).limit(10).toArray((error, result) => {
    errorOrResult(error, result, db)
  })
}

function getFacebookCompany(db) {
  db.collection('companies').find({name: "Facebook"}, {name: 1, _id: 0}).toArray((error, result) => {
    errorOrResult(error, result, db)
  })
}

function numFacebookEmployees(db) {
  db.collection('companies').find({name: "Facebook"}, {name: 1, number_of_employees:1, _id: 0}).toArray((error, result) => {
    errorOrResult(error, result, db)
  })
}

function allFacebookProducts(db) {
  db.collection('companies').find({name: "Facebook"}, {name: 1, "products.name": 1, _id: 0}).toArray((error, result) => {
    errorOrResult(error, result, db)
  })
}

function employeesNamesNowAtFacebook(db) {
  db.collection('companies').find({name: "Facebook"}, {"relationships.person": 1, _id: 0}).toArray((error, result) => {
    result = result[0].relationships.filter(e => !e.is_past)
    errorOrResult(error, result, db)
  })
}

function numFacebookExEmployees(db) {
  db.collection('companies').find({name: "Facebook"}, {"relationships": 1, _id: 0}).toArray((error, result) => {
    result = result[0].relationships.filter(e => e.is_past).length
    errorOrResult(error, result, db)
  })
}

function allCompaniesWhereDavidEbersmanHasWorked(db) {
  db.collection('companies').find({"relationships.person.permalink": "david-ebersman"}, {name: 1, _id: 0}).toArray((error, result) => {
    errorOrResult(error, result, db)
  })
}




//TODO







function facebookCompetitorsSortByName(db) {
  // db.collection('companies').find({name: "Facebook"}, {name: 1, "products.name": 1, _id: 0}).toArray((error, result) => {
  //   errorOrResult(error, result, db)
  // })
}

function companiesNameWithSocialNetworkingAsTagList(db) {
  // db.collection('companies').find({name: "Facebook"}, {name: 1, "products.name": 1, _id: 0}).toArray((error, result) => {
  //   errorOrResult(error, result, db)
  // })
}

function numCompaniesWithSocialNetworkingAsTagListFounded2002And2016(db) {
  // db.collection('companies').find({name: "Facebook"}, {name: 1, "products.name": 1, _id: 0}).toArray((error, result) => {
  //   errorOrResult(error, result, db)
  // })
}

function companiesNamesAndLocationWithLondonOffices(db) {
  // db.collection('companies').find({name: "Facebook"}, {name: 1, "products.name": 1, _id: 0}).toArray((error, result) => {
  //   errorOrResult(error, result, db)
  // })
}

function numCompaniesWithSocialNetworkingAsTagListFounded2002And2016inNY(db) {
  // db.collection('companies').find({name: "Facebook"}, {name: 1, "products.name": 1, _id: 0}).toArray((error, result) => {
  //   errorOrResult(error, result, db)
  // })
}


function errorOrResult(error, result, db) {
  if (error) {
    console.log(error)
    rl.question(`\nType enter to continue: `, (answer) => {
      mainMenu(db)
    })
  } else {
    console.log(result)
    rl.question(`\nType enter to continue: `, (answer) => {
      mainMenu(db)
    })
  }
}
