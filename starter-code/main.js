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
            db.collection('companies').find().count((error, result) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log("Companies number is: " + result);
                    rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                }
            })
            break;
            case "3":
            db.collection("companies").find({founded_year: 2004}).count((error, result) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log("Compañias fundadas en 2004: " + result);
                    rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                }
            })
            break;
            case "4":
                db.collection('companies').find({founded_year: 2004, founded_month: 2}, {name: 1, _id: 0}).toArray((error, result) => {
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
                db.collection('companies').find({founded_year: 2004, founded_month: {$gte:4}, founded_month: {$lte:4}}, {name: 1, _id: 0}).sort({founded_month:1}).toArray((error, result) => {
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
                db.collection('companies').find({},{name: 1, number_of_employees:1, _id: 0}).sort({number_of_employees:-1}).limit(10).toArray((error, result) => {
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
                db.collection('companies').find({ name: "Facebook"},{name:1 , _id:0}).toArray((error, result) => {
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
                db.collection('companies').find({ name: "Facebook"},{number_of_employees: 1, _id: 0 }).toArray((error, result) => {
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
                db.collection('companies').find({name: "Facebook"},{"products.name": 1, _id: 0 }).toArray((error, result) => {
                    if (error) {
                        console.log(error);
                        rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                    } else {
                        console.log(result[0].products);
                        rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                    }
                })
                break;
            case "0":
              console.log(`👋 👋 👋 👋  😞 \n`);
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

function printMenu() {
    console.log(`
0.- Exit 
1.- Listar por nombre todas las empresas. 
2.- ¿Cuántas empresas hay? 
3.- ¿Cuántas empresas se fundaron en 2004? 
4.- Listar por nombre todas las empresas fundadas en febrero de 2004. 
5.- Listar por nombre todas las empresas fundadas en el verano de 2004 (abril a junio) ordenadas por fecha 
6.- Qué empresas tienen oficinas en "Barcelona" 
7.- Enumerar las 10 empresas con más empleados ordenadas ascendentemente (mostrar nombre y empleados). 
8.- Encuentra la empresa con el nombre "Facebook" 
9.- ¿Cuántos empleados tiene Facebook? 
10.- Enumera el nombre de todos los productos de Facebook
11.- Haz una lista de las personas que están trabajando en Facebook ahora mismo (verifica el campo de las relaciones) 
12.- Cuántas personas ya no trabajan en Facebook 
13.- Enumera todas las empresas donde ha trabajado "david-ebersman". 
14.- Listar por nombre a los competidores de Facebook 
15.- Nombres de las empresas que tiene "redes sociales" en la lista de etiquetas (tenga en cuenta que el valor del campo es un operador de verificación regex de cadenas) 
16.- ¿Cuántas empresas tiene una "red social" en la lista de etiquetas y se fundó entre 2002 y 2016 inclusive 
17.- Nombres y ubicaciones de las empresas que tienen oficinas en Londres 
18.- ¿Cuántas empresas tienen una "red social" en la lista de etiquetas y están fundadas entre 2002 y 2016 inclusive y tiene oficinas en Nueva York 
`);
}