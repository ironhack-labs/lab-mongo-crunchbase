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

        function mainMenu() {
            clear();
            printMenu();
            rl.question('Type an option: ', (option) => {
                switch (option) {
                    case "1":
                        db.collection('companies').find({}, { name: 1, _id: 0 }).toArray((error, result) => {
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

                        db.collection('companies').count({}, (error, result) => {

                            if (error) {
                                console.log(error);
                                rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                            } else {
                                console.log(result);
                                rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                            }
                        });

                        break;

                    case "3":

                        db.collection('companies').count({ 'founded_year': 2004 }, (error, result) => {

                            if (error) {
                                console.log(error);
                                rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                            } else {
                                console.log(result);
                                rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                            }
                        });

                        break;

                    case "4": // list companies by name founded Feb 2004

                        db.collection('companies').find({ 'founded_year': 2004, 'founded_month': 2 })
                            .project({ '_id': 0, 'name': 1 }).toArray(
                            (error, result) => {

                                if (error) {
                                    console.log(error);
                                    rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                                } else {
                                    console.log(result.map(elem => elem.name).join('\n'));
                                    rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                                }
                            });

                        break;

                    case "5":

                        db.collection('companies').find({ 'founded_year': 2004, 'founded_month': { $gte: 3, $lte: 6 } })
                            .project({ '_id': 0, 'name': 1 }).toArray(
                            (error, result) => {

                                if (error) {
                                    console.log(error);
                                    rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                                } else {
                                    console.log(result.map(elem => elem.name).join('\n'));
                                    rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                                }
                            });

                        break;

                    case "6": // companies with offices in Barcelona

                        db.collection('companies').find({ "offices.city": "Barcelona" })
                            .project({ '_id': 0, 'name': 1 }).toArray(
                            (error, result) => {

                                if (error) {
                                    console.log(error);
                                    rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                                } else {
                                    console.log(result.map(elem => elem.name).join('\n'));
                                    rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                                }
                            });

                        break;

                    case "7": // 10 companies with most employees sorted ascending - show name and employee count

                        db.collection('companies')
                            .find()
                            .sort({ number_of_employees: -1 })
                            .limit(10)
                            .project({ _id: 0, name: 1, number_of_employees: 1 })
                            .toArray((error, result) => {
                                if (error) {
                                    console.log(error);
                                    rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                                } else {
                                    console.log(result.map(elem => `${elem.name} ${elem.number_of_employees}`).join('\n'));
                                    rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                                }
                            });

                        break;

                    case "8": // Find Facebook

                        db.collection('companies').find({ name: 'Facebook' }).toArray((error, result) => {
                            if (error) {
                                console.log(error);
                                rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                            } else {
                                console.log(result);
                                rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                            }
                        });

                        break;

                    case "9": // Facebook employee count

                        db.collection('companies')
                            .find({ name: 'Facebook' })
                            .project({ _id: 0, number_of_employees: 1 })
                            .toArray((error, result) => {
                                if (error) {
                                    console.log(error);
                                    rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                                } else {
                                    console.log(result[0].number_of_employees);
                                    rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                                }
                            });

                        break;

                    case "10": // Facebook product names

                        db.collection('companies')
                            .find({ name: 'Facebook' })
                            .project({ _id: 0, 'products': 1 })
                            .toArray((error, result) => {
                                if (error) {
                                    console.log(error);
                                    rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                                } else {
                                    console.log(result[0].products.map(product => product.name).join('\n'));
                                    rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                                }
                            });

                        break;

                    case "11": // Working at Facebook right now

                        db.collection('companies')
                            .aggregate([{ $unwind: "$relationships" }, { $match: { "name": "Facebook", "relationships.is_past": false } }])
                            .project({ 'relationships.person': 1 })
                            .toArray((error, result) => {
                                if (error) {
                                    console.log(error);
                                    rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                                } else {
                                    const names = result.map(p => p.relationships.person.first_name + ' ' + p.relationships.person.last_name);
                                    console.log('names', names);
                                    rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                                }
                            })



                        break;

                    case "12": // not Working at Facebook right now

                        db.collection('companies')
                            .aggregate([{ $unwind: "$relationships" }, { $match: { "name": "Facebook", "relationships.is_past": true } }])
                            .project({ 'relationships.person': 1 })
                            .toArray((error, result) => {
                                if (error) {
                                    console.log(error);
                                    rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                                } else {
                                    const names = result.map(p => p.relationships.person.first_name + ' ' + p.relationships.person.last_name);
                                    console.log('names', names);
                                    rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                                }
                            })


                        break;

                    case "13": // david-ebersman companies

                        db.collection('companies')
                            .find({ 'relationships.person.permalink': 'david-ebersman' })
                            .project({ _id: 0, name: 1 })
                            .toArray((error, result) => {
                                if (error) {
                                    console.log(error);
                                    rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                                } else {
                                    console.log(result.map(elem => elem.name).join('\n'));
                                    rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                                }
                            })


                        break;

                    case "14": // Facebook competitors
                        db.collection('companies')
                            .find({ name: 'Facebook' })
                            .project({ _id: 0, 'competitions.competitor.name': 1 })
                            .toArray((error, result) => {
                                if (error) {
                                    console.log(error);
                                    rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                                } else {
                                    console.log(result[0].competitions.map(elem => elem.competitor.name).join('\n'));
                                    rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                                }
                            })


                        break;

                    case "15": // social-networking companies
                        db.collection('companies')
                            .find({
                                tag_list: { $regex: 'social-networking' }
                            })
                            .project({ _id: 0, 'name': 1 })
                            .toArray((error, result) => {
                                if (error) {
                                    console.log(error);
                                    rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                                } else {
                                    console.log(result.map(elem => elem.name).join('\n'));
                                    rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                                }
                            })


                        break;

                    case "16": // social-networking companies founded 2002=2016
                        db.collection('companies')
                            .find({
                                tag_list: { $regex: 'social-networking' },
                                founded_year: { $gte: 2002, $lte: 2016 }
                            })
                            .project({ _id: 0, 'name': 1 })
                            .toArray((error, result) => {
                                if (error) {
                                    console.log(error);
                                    rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                                } else {
                                    console.log(result.map(elem => elem.name).join('\n'));
                                    rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                                }
                            })


                        break;

                    case "17": // have offices in London, show name and location

                        db.collection('companies')
                            .aggregate([{ $unwind: "$offices" }, { $match: { "offices.city": "London" } }])
                            .project({ '_id': 0, 'name': 1, 'offices.city': 1, 'offices.latitude': 1, 'offices.longitude': 1 }).toArray(
                            (error, result) => {

                                if (error) {
                                    console.log(error);
                                    rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                                } else {
                                    // console.log(result);
                                    console.log(result.map(elem => `${elem.name} : ${elem.offices.city} (${elem.offices.latitude},${elem.offices.longitude})`).join('\n'));
                                    rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                                }
                            });




                        break;

                    case "18": // social-networking companies founded 2002=2016 and NY office
                        db.collection('companies')
                            .find({
                                tag_list: { $regex: 'social-networking' },
                                founded_year: { $gte: 2002, $lte: 2016 },
                                'offices.city': 'New York'
                            })
                            .project({ _id: 0, 'name': 1 })
                            .toArray((error, result) => {
                                if (error) {
                                    console.log(error);
                                    rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                                } else {
                                    console.log(result.map(elem => elem.name).join('\n'));
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