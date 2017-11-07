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
    console.log('Connection established correctly!! 😬');
function mainMenu(){
      clear();
      printMenu();
      rl.question('Type an option: ', (option) => {
        switch(option){
          case "1":
            console.log('you typed 1');
						db.collection('companies').find({}, {
	              name: 1,
	              _id: 0
	            }).toArray((error, result) => {
	              if (error) {
	                console.log(error);
	                continueEnter();
	              } else {
	                console.log(result);
	                continueEnter();s
	              }
	            })
            break;

          case "2":
            console.log('you typed 2');
						db.collection('companies').count((error, result) => {
							if (error) {
							 console.log(error);
							 continueEnter();
						 } else {
							 console.log(`There are ${result} companies`);
							 continueEnter();
						 }
						});
            break;
					case "3":
						console.log('you typed 3');
						db.collection('companies').find({ "founded_year" : 2004 }).count((error, result) => {
							if (error) {
							 console.log(error);
							 continueEnter();
						 } else {
							 console.log(`There are ${result} companies founded in 2004`);
							 continueEnter();
						 }
						});
					break;
					case "4":
						console.log('you typed 4');
						db.collection('companies').find({ "founded_year" : 2004 , "founded_month": 2}, {"name":1, "_id":0}).toArray((error, result) => {
							if (error) {
							 console.log(error);
							 continueEnter();
						 } else {
							 console.log("Companies founded in February of 2004 by Name")
							 console.log(result);
							 continueEnter();
						 }
						});
					break;
					case "5":
						console.log('you typed 5');
						db.collection('companies')
							.find({ $and:
								[{"founded_month" : {$gte: 04}},{"founded_month" : {$lte: 06}}],
							    "founded_year": 2004}, {"name":1, "founded_month":1,"_id":0})
									.sort({ "founded_month" : 1 })
									.toArray((error, result) => {
							if (error) {
							 console.log(error);
							 continueEnter();
						 } else {
							 console.log("Companies founded between April and June of 2004 by Name sorted by date (less to high)")
							 console.log(result);
							 continueEnter();
						 }
						});
					break;
					case "6":
						console.log('you typed 6');
						db.collection('companies')
							.find({"offices.city":"Barcelona"}, {"name":1, "_id":0})
							.toArray((error, result) => {
								if (error) {
								 console.log(error);
								 continueEnter();
							 } else {
								 console.log("Companies in Barcelona");
								 console.log(result);
								 continueEnter();
						 }
						});
					break;
					case "7":
						console.log('you typed 7');
						db.collection('companies')
							.find({},{"_id":0,"name":1, "number_of_employees":1})
							.sort({"number_of_employees":-1})
							.limit(10)
							.toArray((error, result) => {
								if (error) {
								 console.log(error);
								 continueEnter();
							 } else {
								 console.log("Top number of employees");
								 console.log(result);
								 continueEnter();
						 }
						});
					break;
					case "8":
						console.log('you typed 8');
						db.collection('companies')
							.find({"name":"Facebook"},{"name":1})
							.toArray((error, result) => {
								if (error) {
								 console.log(error);
								 continueEnter();
							 } else {
								 console.log("Facebook company:");
								 console.log(result);
								 continueEnter();
						 }
						});
					break;
					case "9":
						console.log('you typed 9');
						db.collection('companies')
							.find({"name":"Facebook"},{"name":1, "number_of_employees":1})
							.toArray((error, result) => {
								if (error) {
								 console.log(error);
								 continueEnter();
							 } else {
								 console.log("Facebook company employeers:");
								 console.log(result);
								 continueEnter();
						 }
						});
					break;
					case "10":
						console.log('you typed 10');
						db.collection('companies')
							.find({"name":"Facebook"},{"products":1}).toArray((error, result) => {
								if (error) {
								 console.log("ERROR")
								 console.log(error);
								 continueEnter();
							 } else {
								 console.log("Facebook products:");
								 result.forEach((e) => {
									 console.log(e.products);
								 });
								 continueEnter();
						 }
						});
					break;
					case "11":
						console.log('you typed 11');
						db.collection('companies')
							.find({"name":"Facebook"},{"relationships":1})
							.toArray((error, result) => {
								if (error) {
								 console.log(error);
								 continueEnter();
							 } else {
								 console.log("Facebook relationships:");
								 result.forEach((e) => {
									 e.relationships.forEach((e2) =>{
										  if (e2.is_past === false)
										 		console.log(e2.person);
									 });
								 });
								 continueEnter();
						 }
						});
					break;
					case "12":
						console.log('you typed 12');
						db.collection('companies')
							.find({"name":"Facebook"},{"relationships":1})
							.toArray((error, result) => {
								if (error) {
								 console.log(error);
								 continueEnter();
							 } else {
								 let count = 0;
								 console.log("Facebook relationships:");
								 result.forEach((e) => {
									 e.relationships.forEach((e2) =>{
										  if (e2.is_past === true)
												count++;
									 });
									 console.log(`${count} persons not work here anymore`);
								 });
								 continueEnter();
						 }
						});
					break;
					case "13":
						console.log('you typed 13');
						db.collection('companies')
							.find({},{"name":1,"relationships":1})
							.toArray((error, result) => {
								if (error) {
								 console.log(error);
								 continueEnter();
							 } else {
								 let worksPast = [];
								 console.log("david-ebersman relationships:");
								 result.forEach((relations) => {
									 relations.relationships.forEach((persons) =>{
										  if (persons.is_past === true && persons.person.permalink == "david-ebersman")
												// worksPast.push(result.name);
												worksPast.push(relations.name);
									 });
								 });
								 console.log(`David Ebersman worked in ${worksPast}`);
								 continueEnter();
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
	function continueEnter(){
		rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
	}

    mainMenu();
  }
});
//
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
