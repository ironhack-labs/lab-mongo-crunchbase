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
    let collection = db.collection('companies');
    console.log('Connection established correctly!! 😬');

    function mainMenu(){
      clear();
      printMenu();
      rl.question('Type an option: ', (option) => {
        switch(option){
          case "1":
          collection.find({}, {name: 1, _id: 0}).toArray((error, result) => {
            if (error) {
              console.log(error);
              rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
            } else {

              console.log("List of companies by name: ")
              result.forEach(companies=> console.log(companies.name))
              rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
            }
          })
            break;
          case "2":
          collection.count((error, result) => {
            if (error) {
              console.log(error);
              rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
            } else {
              console.log(`There are ${result} companies`);
              rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
            }
          })
            break;
          case "3":
          collection.find({founded_year:2004}).count((error, result) => {
            if (error) {
              console.log(error);
              rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
            } else {
              console.log('There are',result,'companies founded in 2004');
              rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
            }
          })
            break;
          case "4":  
          collection.find({founded_year:2004,founded_month:2}, {name: 1, _id: 0}).toArray((error, result) => {
              if (error) {
                console.log(error);
                rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
              } else {

                console.log("Companies founded in february of 2004:")
                result.forEach(companies => {
                  console.log(`Name: ${companies.name}`)
                });
                rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
              }
            })
              break;  
          case "5":  
          collection.find({founded_year: 2004,founded_month: {$gte: 4,$lte: 6},founded_day:{$gte:1}}, {name:1,_id:0,date:1,founded_day:1}).sort({founded_day:1}).toArray((error, result) => {
             if (error) {
                console.log(error);
                rl.question(`\nType enter to continue: `, (answer) => {mainMenu() });
              } else {

                console.log("Companies founded in the summer of 2004 (april to june) sorted by date.")
                 result.forEach(companies => {
                   console.log(`Name of the company: ${companies.name}, Founded day of the month: ${companies.founded_day}`)
                 });
                 rl.question(`\nType enter to continue: `, (answer) => {mainMenu() });
             }
            })
             break;   
          case "6":  
          collection.find({'offices.city':"Barcelona"}, {name: 1, _id: 0}).toArray((error, result) => {
             if (error) {
                 console.log(error);
                 rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
              } else {
                 console.log("Companies with offices in Barcelona:");
                 result.forEach(companies => {
                   console.log(`Name of company: ${companies.name}`);
                 });
                 rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
             }
           })
             break; 
          case "7":  
          collection.find({}, {number_of_employees:1,name:1,_id:0}).sort({number_of_employees:-1}).limit(10).toArray((error, result) => {
             if (error) {
                 console.log(error);
                 rl.question(`\nType enter to continue: `, (answer) => {mainMenu() });
              } else {
                console.log("List of companies with most amount of employees, sorted ascendingly: ")
                result.reverse().forEach(companies => {
                  console.log(`Name: ${companies.name}, Number of employees: ${companies.number_of_employees}`);
                });
                rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
             }
           })
            break;
            case "8":  
            collection.find({name:'Facebook'}, {name:1,_id:0}).toArray((error, result) => {
               if (error) {
                   console.log(error);
                   rl.question(`\nType enter to continue: `, (answer) => {mainMenu() });
                } else {
                  console.log(result[0].name);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
               }
             })
              break;
            case "9":  
            collection.find({name:'Facebook'}, {number_of_employees:1,_id:0}).toArray((error, result) => {
               if (error) {
                   console.log(error);
                   rl.question(`\nType enter to continue: `, (answer) =>{mainMenu() });
               } else {
                   console.log(`Amount of facebook employees: ${result}`);
                rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
             }
           })
            break;
            case "10":  
            collection.find({name:'Facebook'}, {'products.name':1,_id:0}).toArray((error, result) => {
               if (error) {
                   console.log(error);
                   rl.question(`\nType enter to continue: `, (answer) =>{mainMenu() });
             } else {
                   result[0].products.forEach(element => {
                     console.log(`Facebook products ${element.name}`);
                });
                rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
             }
           })
            break;
            case "11":  
            collection.find({name:'Facebook'}, {'relationships':1,_id:0}).toArray((error, result) => {
               if (error) {
                   console.log(error);
                   rl.question(`\nType enter to continue: `, (answer) =>{mainMenu() });
             } else {

              console.log("Current Facebook employees:")
              result[0].relationships.forEach((item) => {
                if (!item.is_past)
                  console.log(`${item.person.first_name} ${item.person.last_name}`);
              })
                rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
             }
           })
          break; 

          case "12":  
            collection.find({name:'Facebook'}, {'relationships':1,_id:0}).toArray((error, result) => {
               if (error) {
                   console.log(error);
                   rl.question(`\nType enter to continue: `, (answer) =>{mainMenu() });
             } else {

              let counter = 0;
              result[0].relationships.forEach((item) => {
                if (item.is_past)
                  counter ++;
              })
              console.log(`Amount of employees not working at Facebook anymore: ${counter}`);
                rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
             }
           })
          break; 
        
          case "13":  
          collection.find({'relationships.person.permalink':"david-ebersman"}, {name:1,'relationships.person.permalink':1,_id:0}).toArray((error, result) => {
             if (error) {
                 console.log(error);
                 rl.question(`\nType enter to continue: `, (answer) =>{mainMenu() });
           } else {

            result.forEach((company) => {
              
              console.log(`Name of the company: ${company.name}`);

              company.relationships.forEach( employee=> {
                if (employee.person.permalink === "david-ebersman")
                console.log(`Searched employee: ${employee.person.permalink}`);
              });

            })
              rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
           }
         })
        break; 

        case "14":
        collection.find({name:'Facebook'}, {name:1,_id:0,date:1,competitions:1}).toArray((error, result) => {
            if (error) {
              console.log(error);
              rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
            } else {
              console.log("Competitors of Facebook:");
           result[0].competitions.forEach(companies=> 
              console.log(`Name: ${companies.competitor.name}`)
          )
              rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
            }
          })
            break;
          
            case "15":
            collection.find({tag_list: { $regex: "social-networking"}}, {name:1,_id:0,tag_list:1}).toArray((error, result) => {
              if (error) {
                console.log(error);
                rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
              } else {
                console.log("Names of companies that have \"social-networking\" in their tag-list:");
                result.forEach(companies=> {
    
                  console.log(`Name: ${companies.name}`)
                })
                rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
              }
            })
              break; 
          
              case "16":
              collection.find({$and : [{tag_list: { $regex: "social-networking"},founded_year:{$gte: 2002,$lte: 2016}}]}).count((error, result) => {
                if (error) {
                  console.log(error);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                } else {
                  console.log(`There are ${result} companies that has "social-network" in tag-list and were founded between 2002 and 2016`);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                }
              })
                break;
              
           case "17":
            collection.find({'offices.city':'London'}, {name:1,_id:0,offices:1}).sort({number_of_employees:-1}).toArray((error, result) => {
               if (error) {
                  console.log(error);
                  rl.question(`\nType enter to continue: `, (answer) => {mainMenu() });
               } else {
                 console.log("Names and locations of companies that have offices in London:");

                 result.forEach(companies=> {

                  console.log(`Name: ${companies.name}`);

                   companies.offices.forEach(office=>{

                  if (office.city === "London") { 

                      (office.address1 === "" || office.address1 === null) 
                      ? console.log("None location given for first address")
                      : console.log(`Address #1: ${office.address1}`);  

                      (office.address2 === "" || office.address2 === null)  
                      ?  console.log("None location given for second  address")                        
                      : console.log(`Address #2: ${office.address2}`)

                    }  
                 })     
              })
                   rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                }
              })
              break;

                case "18":
                collection.find({$and : [{tag_list: { $regex: "social-networking"},founded_year:{$gte: 2002,$lte: 2016},'offices.city':"New York"}]}).count((error, result) => {
                  if (error) {
                    console.log(error);
                    rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                   } else {
                     console.log(`There are ${result} companies that have "social-network" in tag-list and were founded between 2002 - 2016 and have offices in New York`);
                    rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                  }
                })
                break;

                case "19":
                collection.distinct("category_code").then((result) => {
                  if (error) {
                    console.log(error);
                    rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                   } else {
                      
                     console.log(`Categories in the collection:`);
                    result.forEach(categories=> console.log(`-${categories}`))

                    rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                  }
                })
                break;
                  
          case "0":  console.log(`👋👋👋👋 😞 \n`);
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
19.- Extra query #1: Find all the distinct categories, so list all unique categories use distinct method
`);
}