const MongoDB = require('mongodb');
const mongoClient = MongoDB.MongoClient;
const clear = require('clear');
const readline = require('readline');
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

const url = `mongodb://localhost:27017/crunchbase`;

mongoClient.connect(url, (error, db) => {
  if (error) {
    console.log('Error trying to connect to the Database');
    console.log(error);
  } else {
    console.log('Connection established correctly!! 😬');
    const collection = db.collection('companies');
    function mainMenu(){
      // clear();
      printMenu();
      rl.question('Type an option: ', (option) => {
        switch(option){
          case "1":
            console.log('you typed 1');
              collection.find({},{name:1,_id:0},{}).toArray((error, result) => {
                if (error) {
                  console.log(error);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                } else {
                  result.forEach(company =>{
                    console.log(company.name);
                  });
                  // console.log(result);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                }
              });
            break;
          case "2":
            console.log('you typed 2');
              collection.count((error, result) => {
                if (error) {
                  console.log(error);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                } else {
                  console.log(`< ${result} >`);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                }
              });
            break;
          case "3":
            console.log('you typed 3');
              collection.find({founded_year:2004},{}).count((error, result) => {
                if (error) {
                  console.log(error);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                } else {
                  console.log(`< ${result} >`);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                }
              });
            break;
          case "4":
            console.log('you typed 4');
              collection.find({founded_year:2004,founded_month:2},{name:1,_id:0}).toArray((error, result) => {
                if (error) {
                  console.log(error);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                } else {
                  result.forEach(company =>{
                    console.log(company.name);
                  });
                  // console.log(result);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                }
              });
            break;
          case "5":
            console.log('you typed 5');
              collection.find({founded_year: 2004,founded_month: {$gte: 4,$lte: 6}},{name:1,_id:0}).sort({date:1}).toArray((error, result) => {
                if (error) {
                  console.log(error);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                } else {
                  result.forEach(company =>{
                    console.log(company.name);
                  });
                  // console.log(result);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                }
              });
            break;
          case "6":
            console.log('you typed 6');
              collection.find({'offices.city':'Barcelona'},{name:1,_id:0}).toArray((error, result) => {
                if (error) {
                  console.log(error);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                } else {
                  result.forEach(company =>{
                    console.log(company.name);
                  });
                  // console.log(result);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                }
              });
            break;
          case "7":
            console.log('you typed 7');
              collection.find({},{number_of_employees:1,name:1,_id:0}).sort({number_of_employees:-1}).limit(10).toArray((error, result) => {
                if (error) {
                  console.log(error);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                } else {
                  console.log(result.reverse());
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                }
              });
            break;
          case "8":
            console.log('you typed 8');
              collection.find({name:'Facebook'},{name:1,_id:0},{}).toArray((error, result) => {
                if (error) {
                  console.log(error);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                } else {
                  console.log(`< ${result[0].name} >`);
                  // console.log(result[0].name);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                }
              });
            break;
          case "9":
            console.log('you typed 9');
              collection.find({name:'Facebook'},{number_of_employees:1,_id:0}).toArray((error, result) => {
                if (error) {
                  console.log(error);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                } else {
                  console.log(`Number of Facebook employees: ${result[0].number_of_employees} `);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                }
              });
            break;
          case "10":
            console.log('you typed 10');
              collection.find({name:'Facebook'},{'products.name':1,_id:0}).toArray((error, result) => {
                if (error) {
                  console.log(error);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                } else {
                  result[0].products.forEach((product)=>{
                    console.log(product.name);
                  });
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                }
              });
            break;
          case "11":
            console.log('you typed 11');
              collection.find({name:'Facebook'},{relationships:1,_id:0}).toArray((error, result) => {
                if (error) {
                  console.log(error);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                } else {
                  result[0].relationships.forEach(employee => {
                    if(employee.is_past === false)
                      console.log(`${employee.person.first_name} ${employee.person.last_name}`);
                  });
                  // console.log(result[0].relationships[0].is_past);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                }
              });
            break;
          case "12":
            console.log('you typed 12');
              collection.find({name:'Facebook'},{relationships:1,_id:0}).toArray((error, result) => {
                if (error) {
                  console.log(error);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                } else {
                  let aux = 0;
                  result[0].relationships.forEach(employee => {
                    if(employee.is_past === true)
                      aux++;
                  });
                  console.log(`The amount of employees not working at Facebook is: ${aux}`);
                  // console.log(result[0].relationships[0].is_past);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                }
              });
            break;
          case "13":
            console.log('you typed 13');
              collection.find({'relationships.person.permalink':'david-ebersman'},{name:1,_id:0}).toArray((error, result) => {
                if (error) {
                  console.log(error);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                } else {
                  result.forEach(company =>{
                    console.log(company.name);
                  });
                  // console.log(result);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                }
              });
            break;
          case "14":
            console.log('you typed 14');
              collection.find({name:'Facebook'},{'competitions.competitor.name':1,_id:0}).toArray((error, result) => {
                if (error) {
                  console.log(error);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                } else {
                  console.log("\nFacebook's competitors:\n");
                  result[0].competitions.forEach(companies=> {
                    console.log(`${companies.competitor.name}`);
                  });
                  // console.log(result);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                }
              });
            break;
          case "15":
            console.log('you typed 15\n');
              collection.find({tag_list:{$regex:'social-networking'}},{name:1,_id:0}).toArray((error, result) => {
                if (error) {
                  console.log(error);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                } else {
                  console.log("Companies with \'social-network\' in the tag-list:");
                  result.forEach(company => {
                    console.log(`${company.name}`);
                  });
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                }
              });
            break;
          case "16":
            console.log('you typed 16');
            // THE QUERY ALSO WORK WITHOUT THE $and OPERATOR, mongodb USES BY DEFALT. 
            //  (MongoDB provides an implicit AND operation when specifying a comma separated list of expressions.)
              collection.find({$and : [{tag_list: { $regex: "social-networking"},founded_year:{$gte: 2002,$lte: 2016}}]}).count((error, result) => {
                if (error) {
                  console.log(error);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                } else {
                  console.log(`\nCompanies that has "social-network" in tag-list and founded between 2002 and 2016 inclusive:\n ${result}`);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                }
              });
            break;
          case "17":
            console.log('you typed 17');
              collection.find({'offices.city':'London'},{name:1,_id:0,offices:1}).toArray((error, result) => {
                if (error) {
                  console.log(error);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                } else {
                  result.forEach(location => {
                    console.log(`\n<${location.name}>`);
                    location.offices.forEach(city => {
                      console.log(`   ${city.city}`);
                    });

                  });
                  // console.log(result);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                }
              });
            break;
          case "18":
            console.log('you typed 18');
              collection.find({$and: [{ tag_list: { $regex: 'social-networking' }, founded_year: { $gte: 2002, $lte: 2016 }}],'offices.city': 'New York'}).count((error, result) => {
                if (error) {
                  console.log(error);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                } else {
                  console.log(`< ${result} >`);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                }
              });
            break;
          case "19":
            console.log('you typed 19');
              collection.find({},{}).toArray((error, result) => {
                if (error) {
                  console.log(error);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                } else {
                  console.log(result);
                  rl.question(`\nType enter to continue: no hace nada`, (answer) => { mainMenu() });
                }
              });
            break;
          case "20":
            console.log('you typed 20');
              collection.find({},{}).toArray((error, result) => {
                if (error) {
                  console.log(error);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                } else {
                  console.log(result);
                  rl.question(`\nType enter to continue: no hace nada`, (answer) => { mainMenu() });
                }
              });
            break;
          case "0":
            console.log(`👋👋👋👋 😞 \n`);
            db.close((error) => { process.exit(0) });
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