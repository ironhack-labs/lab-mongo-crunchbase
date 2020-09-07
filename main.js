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
                        db.collection('companies').find({}, {
                            name: 1,
                            _id: 0
                        }).toArray((error, result) => {
                            if (error) {
                                console.log(error);
                                rl.question(`\nType enter to continue: `, (answer) => {
                                    mainMenu()
                                });
                            } else {
                                console.log(result);
                                rl.question(`\nType enter to continue: `, (answer) => {
                                    mainMenu()
                                });
                            }
                        })
                        break;
                    case "2":
                        db.collection('companies').find({}, {
                            
                        }).count((error, result) => {
                            if (error) {
                                console.log(error);
                                rl.question(`\nType enter to continue: `, (answer) => {
                                    mainMenu()
                                });
                            } else {
                                console.log(result);
                                rl.question(`\nType enter to continue: `, (answer) => {
                                    mainMenu()
                                });
                            }
                        })
                         
                        break;
                    case "0":
                        console.log(`👋👋👋👋 😞 \n`);
                        db.close((error) => {
                            process.exit(0)
                        });
                        break;
                    case "3":
                        db.collection('companies').find({founded_year: {$eq: 2004}}, {
                            
                            
                        }).count((error, result) => {
                            if (error) {
                                console.log(error);
                                rl.question(`\nType enter to continue: `, (answer) => {
                                    mainMenu()
                                });
                            } else {
                                console.log(result);
                                rl.question(`\nType enter to continue: `, (answer) => {
                                    mainMenu()
                                });
                            }
                        })
                        break;
                    case "4":
                    db.collection('companies').find({
                                $and: [{
                                    founded_year: {
                                        $eq: 2004
                                    }
                                }, {
                                    founded_month: {
                                        $eq: 2
                                    }
                                }]
                            }, {
                        name: 1

                    }).toArray((error, result) => {
                        if (error) {
                            console.log(error);
                            rl.question(`\nType enter to continue: `, (answer) => {
                                mainMenu()
                            });
                        } else {
                            console.log(result);
                            rl.question(`\nType enter to continue: `, (answer) => {
                                mainMenu()
                            });
                        }
                    })
                        break;
                    case "5":
                    db.collection('companies').find(
                                {
                                    $and: [{
                                        founded_year: {
                                            $eq: 2004
                                        }
                                    }, {
                                        $or: [{
                                            founded_month: 4
                                        }, {
                                            founded_month: 6
                                        }]
                                    }]
                                
                    }, {
                        name: 1

                    }).toArray((error, result) => {
                        if (error) {
                            console.log(error);
                            rl.question(`\nType enter to continue: `, (answer) => {
                                mainMenu()
                            });
                        } else {
                            console.log(result);
                            rl.question(`\nType enter to continue: `, (answer) => {
                                mainMenu()
                            });
                        }
                    })
                        break;
                    
                    case "6":
                    db.collection('companies').find({
                                "offices.city": "Barcelona"
                            }, {
                        name: 1

                    }).toArray((error, result) => {
                        if (error) {
                            console.log(error);
                            rl.question(`\nType enter to continue: `, (answer) => {
                                mainMenu()
                            });
                        } else {
                            console.log(result);
                            rl.question(`\nType enter to continue: `, (answer) => {
                                mainMenu()
                            });
                        }
                    })
                        break;
                    
                    case "7":
                    db.collection('companies').find({
                        'number_of_employees': {
                            '$ne': null
                        }
                    }, {
                            name: 1,
                            number_of_employees: 1,
                            _id: 0

                    }).sort({
                            number_of_employees: -1
                        }).limit(10).toArray((error, result) => {
                        if (error) {
                            console.log(error);
                            rl.question(`\nType enter to continue: `, (answer) => {
                                mainMenu()
                            });
                        } else {
                            console.log(result);
                            rl.question(`\nType enter to continue: `, (answer) => {
                                mainMenu()
                            });
                        }
                    })
                        break;
                    case "8":
                        db.collection('companies').find({
                            name: "Facebook"
                    }, {
                        name: 1,                        
                        _id: 1

                    }).toArray((error, result) => {
                        if (error) {
                            console.log(error);
                            rl.question(`\nType enter to continue: `, (answer) => {
                                mainMenu()
                            });
                        } else {
                            console.log(result);
                            rl.question(`\nType enter to continue: `, (answer) => {
                                mainMenu()
                            });
                        }
                    })
                        break;
                    
                    case "9":
                    db.collection('companies').find({
                        name: "Facebook"
                    }, {
                        number_of_employees: 1,
                        _id: 0

                    }).toArray((error, result) => {
                        if (error) {
                            console.log(error);
                            rl.question(`\nType enter to continue: `, (answer) => {
                                mainMenu()
                            });
                        } else {
                            console.log(result);
                            rl.question(`\nType enter to continue: `, (answer) => {
                                mainMenu()
                            });
                        }
                    })
                        break;
                    
                    case "10":
                    db.collection('companies').find({
                        $and: [{
                            name: "Facebook"
                        }, {
                            products: {
                                $exists: true
                            }
                        }]
                    }, {
                        ["products.name"]: 1,
                        _id: 0

                    }).toArray((error, result) => {
                        if (error) {
                            console.log(error);
                            rl.question(`\nType enter to continue: `, (answer) => {
                                mainMenu()
                            });
                        } else {
                            console.log(result);
                            rl.question(`\nType enter to continue: `, (answer) => {
                                mainMenu()
                            });
                        }
                    })
                        
                    
                    
                    
                    
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

}