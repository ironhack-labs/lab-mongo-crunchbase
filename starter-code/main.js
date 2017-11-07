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
          //Listar todas las compañías por nombre
            db.collection('companies').find({}, {name: 1, _id: 0}).toArray((error, result) => {
              if (error) {
                console.log(error);
                rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
              } else {
                console.log(result);
                rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
              }
            })
            break;
          case "2":
          //Contar todas las compañías
            db.collection('companies').find({}, {name: 1, _id: 0}).count((error, result) => {
              if (error) {
                console.log(error);
                rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
              } else {
                console.log(result);
                rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
              }
            })
            break;
          case "3":
          //Contar todas las compañías por nombre fundadas en el 2004
            db.collection('companies').find({"funding_rounds.funded_year": 2004}, {name: 1, _id: 0}).count((error, result) => {
              if (error) {
                console.log(error);
                rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
              } else {
                console.log(result);
                rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
              }
            })
          break;
          case "4":
          //Listar todas las compañías por nombre fundadas en febrero del 2004
            db.collection('companies').find({
              $and: [
                {"founded_month": 2},
                {"founded_year": 2004}
              ]}, {name: 1, _id: 0}).toArray((error, result) => {
              if (error) {
                console.log(error);
                rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
              } else {
                console.log(result);
                rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
              }
            })
          break;
          case "5":
          //Listar todas las compañías por nombre fundadas en verano de 2004 y ordenados por fecha
            db.collection('companies').find({
              $and: [
                {"founded_month": {$gte: 4}},
                {"founded_month": {$lte: 6}},
                {"founded_year": 2004}
              ]}, {name: 1, _id: 0}).sort({"funding_rounds.funded_month": 1}).toArray((error, result) => {
                if (error) {
                  console.log(error);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                } else {
                  console.log(result);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                }
              })
          break;
          case "6":
          //Listar compañías por nombre que tengan oficinas en Barcelona
            db.collection('companies').find({"offices.city": "Barcelona"}, {name: 1, _id: 0}).toArray((error, result) => {
              if (error) {
                console.log(error);
                rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
              } else {
                console.log(result);
                rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
              }
            })
          break;
          case "7":
          //Lista las 10 compañías con más empleados ordenador ascendentemente (nombres de empresa y empleados)
            db.collection('companies').find({}, {name: 1, number_of_employees: 1, _id: 0}).limit(10).sort({"number_of_employees":  -1}).toArray((error, result) => {
              if (error) {
                console.log(error);
                rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
              } else {
                console.log(result);
                rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
              }
            })
          break;
          case "8":
          //Encontrar la compañía con el nombre Facebook
            db.collection('companies').find({"name": "Facebook"}).toArray((error, result) => {
              if (error) {
                console.log(error);
                rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
              } else {
                console.log(result);
                rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
              }
            })
          break;
          case "9":
          //Cuántos empleados tiene Facebook?
            db.collection('companies').find({"name": "Facebook"}, {number_of_employees: 1, _id: 0}).toArray((error, result) => {
              if (error) {
                console.log(error);
                rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
              } else {
                console.log(result);
                rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
              }
            })
          break;
          case "10":
          //Lista los nombres de los productos de Facebook
            db.collection('companies').find({"name": "Facebook"}, {products: 1, _id: 0}).toArray((error, result) => {
              if (error) {
                console.log(error);
                rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
              } else {
                console.log(result[0]);
                rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
              }
            })
          break;
          case "11":
          //Listar la gente que trabaja en Facebook ahora mismo
            db.collection('companies').find({"name": "Facebook"}, {relationships: 1, _id: 0}).toArray((error, result) => {
              if (error) {
                console.log(error);
                rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
              } else {
                result[0].relationships.filter(value => {
                  if(!value.is_past)console.log(`Worker: ${value.person.first_name} ${value.person.last_name}`);
                });
                rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
              }
            })
          break;
          case "12":
          //Listar la gente que ya no trabaja en Facebook
            db.collection('companies').find({"name": "Facebook"}, {relationships: 1, _id: 0}).toArray((error, result) => {
              if (error) {
                console.log(error);
                rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
              } else {
                result[0].relationships.filter(value => {
                  if(value.is_past)console.log(`ExWorker: ${value.person.first_name} ${value.person.last_name}`);
                });
                rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
              }
            })
          break;
          case "13":
          //Listar todas las compañías donde ha trabajado David Ebersman
            db.collection('companies').find({$and: [
              {"relationships.person.first_name": "David"},
              {"relationships.person.last_name": "Ebersman"}
            ]}, {name: 1, _id: 0}).toArray((error, result) => {
              if (error) {
                console.log(error);
                rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
              } else {
                console.log(result);
                rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
              }
            })
          break;
          case "14":
          //Listar todos los competidores de Facebook
          db.collection('companies').find({"name": "Facebook"}, {competitions: 1, _id: 0}).toArray((error, result) => {
            if (error) {
              console.log(error);
              rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
            } else {
              console.log(result[0].competitions);
              rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
            }
          })
          break;
          case "15":
          //Compañías que tienen "social-networking" en la tag-list
          db.collection('companies').find({}, {name: 1, tag_list: 1, _id: 0}).toArray((error, result) => {
            if (error) {
              console.log(error);
              rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
            } else {
              result.forEach(value => {
                if(value.tag_list != undefined){
                  if(value.tag_list.includes("social-networking"))console.log(`${value.name}`);
                }
              });
              rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
            }
          })
          break;
          case "16":
          //Compañías que tienen "social-network" en la tag-list entre 2002 y 2016 inclusives
          db.collection('companies').find({$and: [
            {"founded_year": {$gte: 2002}},
            {"founded_year": {$lte: 2016}}
          ]}, {name: 1, tag_list: 1, _id: 0}).toArray((error, result) => {
            if (error) {
              console.log(error);
              rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
            } else {
              result.forEach(value => {
                if(value.tag_list != undefined){
                  if(value.tag_list.search(/social-network/) != -1)console.log(`${value.name}`);
                }
              });
              rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
            }
          })
          break;
          case "17":
          //Nombres y lugares de compañías con oficinas en Londres
          db.collection('companies').find({}, {name: 1, offices: 1, _id: 0}).toArray((error, result) => {
            if (error) {
              console.log(error);
              rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
            } else {
              result.forEach(value => {
                try{
                  if(value.offices[0].city == 'London')console.log(value.name);
                }catch(e){};
              });
              rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
            }
          })
          break;
          case "18":
          //Compañías que tienen "social-network" en la tag-list y fueron fundadas entre 2002 y 2016 inclusives y su oficina está en NY
          db.collection('companies').find({$and: [
            {"founded_year": {$gte: 2002}},
            {"founded_year": {$lte: 2016}}
          ]}, {name: 1, tag_list: 1, offices: 1, _id: 0}).toArray((error, result) => {
            if (error) {
              console.log(error);
              rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
            } else {
              let cont = 0;
              result.forEach(value => {
                try{
                if(value.tag_list != undefined){
                  if(value.tag_list.search(/social-network/) != -1){
                      if(value.offices[0].city == 'London'){
                        cont++;
                      }
                    }
                  }
                }catch(e){};
              });
              console.log(cont);
              rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
            }
          })
          break;
					//BONUSES!
					case "19":
					db.collection('companies').distinct('category_code', (error, result) => {
						if (error) {
							console.log(error);
							rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
						} else {
							console.log(result);
							rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
						}
					})
					break;
					case "20":
          db.collection('companies').find({$text: {$search: 'Google'}}, {name: 1, _id: 0}).count((error, result) => {
            if (error) {
              console.log(error);
              rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
            } else {
              console.log(result);
              rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
            }
          })
          break;
					case "21":
          db.collection('companies').aggregate([
						{ $match: {"founded_year": 2004}},
						{ $project: {name: 1, funding_rounds: 1, _id: 1}},
						{ $group: {_id: "$funding_rounds"}}
						//Con esto filtro por año de fundación, selecciono el nombre,
						//las rondas de selección y el id. Luego agrupo pero no encuentro
						//cómo contar los elementos de "funding". He probado con $count, pero
						//no me sale. Y tampoco encuentro cómo evaluar condiciones en esta versión
						//de Mongo, la 2.6
					], (error, result) => {
						if (error) {
							console.log(error);
							rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
						} else {
							console.log(result);
							rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
						}
					})
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
		 --BONUSES--
		 19.- Find all the distinct categories, so list all unique categories
		 20.- How many companies Google in their overview
		 21.- Find companies founded in 2004 and having 5 or more rounds of funding, calculate the average amount raised (Doesn't work)
     `);
   }
